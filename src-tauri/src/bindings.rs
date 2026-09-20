use specta::Types;
use specta_typescript::Typescript;
use tauri_specta::{collect_commands, collect_events, Builder};

pub fn generate_bindings() -> Builder<tauri::Wry> {
    use crate::commands::{project, translation, translator};

    Builder::<tauri::Wry>::new()
        .commands(collect_commands![
            project::create_project,
            project::open_project,
            project::save_project,
            translator::set_translator_config,
            translator::get_translator_configs,
            translation::start_translation,
            translation::stop_translation,
            translation::set_translations,
            translation::get_translation_settings,
            translation::set_translation_settings,
            translation::update_translation_settings,
        ])
        .events(collect_events![
            translation::TranslationPogress,
            translation::TranslationError,
            translation::TranslationFinished
        ])
        .types(&Types::default())
}

pub fn export_bindings(builder: &Builder<tauri::Wry>) {
    builder
        .export(
            Typescript::default().header("// @ts-nocheck"),
            "../src/shared/api/bindings.ts",
        )
        .expect("Failed to export typescript bindings");
}
