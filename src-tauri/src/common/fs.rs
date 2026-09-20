use crate::{translators::TranslatorConfigs, types::TranslationSettings};
use serde::{Deserialize, Serialize};
use std::fs;
use tauri::{AppHandle, Manager};

fn load_config<Config: Default + for<'a> Deserialize<'a> + Serialize>(
    app: &AppHandle,
    file_name: &str,
) -> Config {
    let Ok(config_dir) = app.path().app_config_dir() else {
        return Config::default();
    };

    let config_file = config_dir.join(file_name);
    let Ok(configs_json) = fs::read_to_string(config_file) else {
        let config = Config::default();

        save_config(app, file_name, &config).ok();

        return config;
    };

    serde_json::from_str(&configs_json).unwrap_or_default()
}

fn save_config<Config: Default + Serialize>(
    app: &AppHandle,
    file_name: &str,
    config: &Config,
) -> Result<(), String> {
    let Ok(config_dir) = app.path().app_config_dir() else {
        return Err(String::new());
    };

    fs::create_dir_all(&config_dir).map_err(|_| String::new())?;

    let config_file = config_dir.join(file_name);
    let config_json = serde_json::to_string_pretty(config).map_err(|_| String::new())?;

    fs::write(config_file, config_json).map_err(|_| String::new())
}

pub fn load_translator_configs(app: &AppHandle) -> TranslatorConfigs {
    load_config(app, "configs.json")
}

pub fn load_translation_settings(app: &AppHandle) -> TranslationSettings {
    load_config(app, "settings.json")
}

pub fn save_translator_configs(app: &AppHandle, configs: &TranslatorConfigs) {
    save_config(app, "configs.json", configs).unwrap()
}

pub fn save_translation_settings(app: &AppHandle, settings: &TranslationSettings) {
    save_config(app, "settings.json", settings).unwrap()
}
