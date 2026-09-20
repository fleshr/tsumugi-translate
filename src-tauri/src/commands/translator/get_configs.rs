use crate::{translators::TranslatorConfigs, types::TranslatorConfigsState};
use tauri::State;

#[tauri::command]
#[specta::specta]
pub async fn get_translator_configs(
    configs_state: State<'_, TranslatorConfigsState>,
) -> Result<TranslatorConfigs, ()> {
    Ok(configs_state.lock().await.clone())
}
