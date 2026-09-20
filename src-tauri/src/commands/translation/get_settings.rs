use crate::types::{TranslationSettings, TranslationSettingsState};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub async fn get_translation_settings(
    settings_state: State<'_, TranslationSettingsState>,
) -> Result<TranslationSettings, ()> {
    Ok(settings_state.lock().await.clone())
}
