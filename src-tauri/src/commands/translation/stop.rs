use crate::types::TranslationRuntimeState;
use serde::Serialize;
use specta::Type;
use tauri::State;

#[derive(Serialize, Type)]
#[serde(tag = "name")]
pub enum StopTranslationError {
    NotRunning,
}

#[tauri::command]
#[specta::specta]
pub async fn stop_translation(
    runtime_state: State<'_, TranslationRuntimeState>,
) -> Result<(), StopTranslationError> {
    let mut runtime_guard = runtime_state.lock().await;

    let Some(handle) = runtime_guard.handle.take() else {
        return Err(StopTranslationError::NotRunning);
    };

    handle.abort();
    Ok(())
}
