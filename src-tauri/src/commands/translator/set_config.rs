use crate::{
    common::fs::save_translator_configs,
    translators::{TranslatorConfig, TranslatorConfigs},
    types::TranslatorConfigsState,
};
use tauri::{AppHandle, State};

#[tauri::command]
#[specta::specta]
pub async fn set_translator_config(
    app: AppHandle,
    config: TranslatorConfig,
    configs_state: State<'_, TranslatorConfigsState>,
) -> Result<TranslatorConfigs, ()> {
    let mut configs_guard = configs_state.lock().await;
    configs_guard.set(config);

    save_translator_configs(&app, &configs_guard);

    Ok(configs_guard.clone())
}
