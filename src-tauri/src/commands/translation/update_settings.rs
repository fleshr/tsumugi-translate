use crate::{
    common::fs::save_translation_settings,
    types::{TranslationSettings, TranslationSettingsState},
};
use crate::{translators::TranslatorKind, types::TranslationMode};
use serde::Deserialize;
use specta::Type;
use tauri::{AppHandle, State};

#[derive(Deserialize, Type)]
#[serde(tag = "field", content = "value", rename_all = "camelCase")]
pub enum TranslationSettingsPatch {
    Mode(TranslationMode),
    Translator(TranslatorKind),
    BatchSize(u32),
}

#[tauri::command]
#[specta::specta]
pub async fn update_translation_settings(
    app: AppHandle,
    patch: TranslationSettingsPatch,
    settings_state: State<'_, TranslationSettingsState>,
) -> Result<TranslationSettings, ()> {
    let mut settings_guard = settings_state.lock().await;

    match patch {
        TranslationSettingsPatch::Mode(mode) => {
            settings_guard.mode = mode;
        }
        TranslationSettingsPatch::Translator(translator) => {
            settings_guard.translator = translator;
        }
        TranslationSettingsPatch::BatchSize(batch_size) => {
            settings_guard.batch_size = batch_size;
        }
    }

    save_translation_settings(&app, &settings_guard);

    Ok(settings_guard.clone())
}
