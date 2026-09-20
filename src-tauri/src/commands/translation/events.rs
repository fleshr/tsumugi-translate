use super::types::TranslatedSegment;
use serde::Serialize;
use specta::Type;
use tauri_specta::Event;

#[derive(Serialize, Clone, Type, Event)]
pub struct TranslationPogress(pub Vec<TranslatedSegment>);

#[derive(Serialize, Clone, Type, Event)]
pub struct TranslationError;

#[derive(Serialize, Clone, Type, Event)]
pub struct TranslationFinished;
