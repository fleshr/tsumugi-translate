use super::{
    events::TranslationFinished,
    helpers::{close_handle, translate_batch, translate_sequential},
};
use crate::{
    commands::translation::TranslationError,
    translators::Translator,
    types::{
        ProjectState, Segment, TranslationMode, TranslationRuntimeState, TranslationSettingsState,
        TranslatorConfigsState,
    },
};
use serde::Serialize;
use specta::Type;
use tauri::{AppHandle, Manager, State};
use tauri_specta::Event;

#[derive(Serialize, Type)]
#[serde(tag = "name")]
pub enum StartTranslationError {
    EmptyProject,
    AlreadyRunning,
}

#[tauri::command]
#[specta::specta]
pub async fn start_translation(
    app: AppHandle,
    project_state: State<'_, ProjectState>,
    runtime_state: State<'_, TranslationRuntimeState>,
) -> Result<(), StartTranslationError> {
    if project_state.lock().await.is_none() {
        return Err(StartTranslationError::EmptyProject);
    }

    if runtime_state.lock().await.handle.is_some() {
        return Err(StartTranslationError::AlreadyRunning);
    }

    let handle = tauri::async_runtime::spawn(async move {
        let settings_state = app.state::<TranslationSettingsState>();
        let settings_guard = settings_state.lock().await;

        let configs_state = app.state::<TranslatorConfigsState>();
        let configs_guard = configs_state.lock().await;

        let translator_config = configs_guard.get(&settings_guard.translator);
        let translator = Translator::from(translator_config);

        let project_state = app.state::<ProjectState>();
        let mut project_guard = project_state.lock().await;

        let Some(project) = project_guard.as_mut() else {
            TranslationError.emit(&app).ok();
            close_handle(&app).await;
            return;
        };

        let segments: Vec<&mut Segment> = project
            .segments
            .iter_mut()
            .filter(|s| s.translated.is_empty())
            .collect();

        match &settings_guard.mode {
            TranslationMode::Sequential => {
                translate_sequential(&app, &translator, segments).await;
            }
            TranslationMode::Batch => {
                let batch_size = settings_guard.batch_size as usize;
                translate_batch(&app, &translator, segments, batch_size).await;
            }
        };

        TranslationFinished.emit(&app).ok();
        close_handle(&app).await;
    });

    let mut runtime_guard = runtime_state.lock().await;
    runtime_guard.handle = Some(handle);

    Ok(())
}
