use crate::{
    parsers::types::ParserKind,
    translators::{TranslatorConfigs, TranslatorKind},
};
use serde::{self, Deserialize, Serialize};
use specta::Type;
use tauri::async_runtime::JoinHandle;
use tokio::sync::Mutex;

#[derive(Serialize, Deserialize, Clone, Debug, Type)]
#[serde(rename_all = "camelCase")]
pub struct Position {
    pub start: u32,
    pub end: u32,
}

#[derive(Serialize, Deserialize, Clone, Debug, Type)]
#[serde(rename_all = "camelCase")]
pub struct Segment {
    pub id: String,
    pub original: String,
    pub translated: String,
    pub file_path: String,
    pub position: Position,
}

#[derive(Serialize, Deserialize, Clone, Debug, Type)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub id: String,
    pub parser: ParserKind,
    pub game_path: String,
    pub source_lang: String,
    pub target_lang: String,
    pub segments: Vec<Segment>,
}

#[derive(Serialize, Deserialize, Clone, Debug, Type)]
#[serde(rename_all = "camelCase")]
pub enum TranslationMode {
    Sequential,
    Batch,
}

#[derive(Serialize, Deserialize, Clone, Debug, Type)]
#[serde(rename_all = "camelCase")]
pub struct TranslationSettings {
    pub mode: TranslationMode,
    pub translator: TranslatorKind,
    pub batch_size: u32,
}

impl Default for TranslationSettings {
    fn default() -> Self {
        Self {
            mode: TranslationMode::Sequential,
            translator: TranslatorKind::Fake,
            batch_size: 10,
        }
    }
}

#[derive(Debug, Default)]
pub struct TranslationRuntime {
    pub handle: Option<JoinHandle<()>>,
}

pub type ProjectState = Mutex<Option<Project>>;
pub type TranslationSettingsState = Mutex<TranslationSettings>;
pub type TranslatorConfigsState = Mutex<TranslatorConfigs>;
pub type TranslationRuntimeState = Mutex<TranslationRuntime>;
