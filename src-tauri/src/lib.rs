use crate::common::fs::{load_translation_settings, load_translator_configs};
use crate::types::{
    ProjectState, TranslationRuntimeState, TranslationSettingsState, TranslatorConfigsState,
};
use tauri::Manager;
use tauri_plugin_log::{Builder, TimezoneStrategy};

mod bindings;
mod commands;
mod common;
mod parsers;
mod translators;
mod types;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = bindings::generate_bindings();

    #[cfg(debug_assertions)]
    bindings::export_bindings(&builder);

    tauri::Builder::default()
        .manage(ProjectState::default())
        .manage(TranslationRuntimeState::default())
        .plugin(
            Builder::new()
                .max_file_size(4 * 1024 * 1024 * 1024)
                .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
                .timezone_strategy(TimezoneStrategy::UseLocal)
                .build(),
        )
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .invoke_handler(builder.invoke_handler())
        .setup(move |app| {
            builder.mount_events(app);

            let translator_configs = load_translator_configs(app.handle());
            let translation_settings = load_translation_settings(app.handle());

            app.manage(TranslatorConfigsState::new(translator_configs));
            app.manage(TranslationSettingsState::new(translation_settings));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
