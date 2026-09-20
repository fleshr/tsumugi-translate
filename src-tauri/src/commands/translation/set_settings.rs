use crate::{
    common::fs::save_translation_settings,
    types::{TranslationSettings, TranslationSettingsState},
};
use tauri::{AppHandle, State};

#[tauri::command]
#[specta::specta]
pub async fn set_translation_settings(
    app: AppHandle,
    settings: TranslationSettings,
    settings_state: State<'_, TranslationSettingsState>,
) -> Result<TranslationSettings, ()> {
    let mut settings_guard = settings_state.lock().await;
    *settings_guard = settings;

    save_translation_settings(&app, &settings_guard);

    Ok(settings_guard.clone())
}
