use crate::{commands::translation::types::TranslatedSegment, types::ProjectState};
use serde::Serialize;
use specta::Type;
use tauri::State;

#[derive(Serialize, Type)]
#[serde(tag = "name")]
pub enum SetTranslationsError {
    EmptyProject,
    SegmentNotFound,
}

#[tauri::command]
#[specta::specta]
pub async fn set_translations(
    translations: Vec<TranslatedSegment>,
    project_state: State<'_, ProjectState>,
) -> Result<(), SetTranslationsError> {
    let mut project_guard = project_state.lock().await;

    let Some(project) = project_guard.as_mut() else {
        return Err(SetTranslationsError::EmptyProject);
    };

    for translation in translations {
        let Some(segment) = project
            .segments
            .iter_mut()
            .find(|segment| segment.id == translation.id)
        else {
            return Err(SetTranslationsError::SegmentNotFound);
        };

        segment.translated = translation.translation;
    }

    Ok(())
}
