use super::{events::TranslationPogress, types::TranslatedSegment};
use crate::{
    commands::translation::TranslationError,
    translators::{Translator, TranslatorService},
    types::{Segment, TranslationRuntimeState},
};
use tauri::{AppHandle, Manager};
use tauri_specta::Event;

pub async fn close_handle(app: &AppHandle) {
    let runtime_state = app.state::<TranslationRuntimeState>();
    let mut runtime_guard = runtime_state.lock().await;

    if let Some(handle) = runtime_guard.handle.take() {
        handle.abort();
    };
}

pub async fn translate_sequential(
    app: &AppHandle,
    translator: &Translator,
    segments: Vec<&mut Segment>,
) {
    for segment in segments {
        let Ok(translation) = translator.translate(&segment.original).await else {
            TranslationError.emit(app).ok();
            close_handle(app).await;
            return;
        };

        segment.translated = translation.clone();

        TranslationPogress(vec![TranslatedSegment {
            id: segment.id.clone(),
            translation,
        }])
        .emit(app)
        .ok();
    }
}

pub async fn translate_batch(
    app: &AppHandle,
    translator: &Translator,
    mut segments: Vec<&mut Segment>,
    batch_size: usize,
) {
    for batch in segments.chunks_mut(batch_size) {
        let texts: Vec<&str> = batch.iter().map(|s| s.original.as_str()).collect();

        let Ok(translations) = translator.translate_batch(texts).await else {
            TranslationError.emit(app).ok();
            close_handle(app).await;
            return;
        };

        let translated: Vec<TranslatedSegment> = batch
            .iter()
            .enumerate()
            .map(|(i, s)| TranslatedSegment {
                id: s.id.clone(),
                translation: translations[i].clone(),
            })
            .collect();

        batch.iter_mut().enumerate().for_each(|(i, s)| {
            s.translated = translations[i].clone();
        });

        TranslationPogress(translated).emit(app).ok();
    }
}
