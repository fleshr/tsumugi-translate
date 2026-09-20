use crate::translators::{fake::*, openai::*};
use async_trait::async_trait;
use enum_dispatch::enum_dispatch;
use serde::{Deserialize, Serialize};
use specta::Type;

pub mod fake;
pub mod openai;

#[derive(Serialize, Deserialize, Debug, Clone, Hash, PartialEq, Eq, Type)]
pub enum TranslatorKind {
    #[serde(rename = "fake")]
    Fake,
    #[serde(rename = "openai")]
    OpenAI,
}

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
#[serde(tag = "translator", rename_all = "camelCase")]
pub enum TranslatorConfig {
    #[serde(rename = "fake")]
    Fake(FakeTranslatorConfig),
    #[serde(rename = "openai")]
    OpenAI(OpenAITranslatorConfig),
}

#[derive(Serialize, Deserialize, Debug, Clone, Type, Default)]
pub struct TranslatorConfigs {
    fake: FakeTranslatorConfig,
    openai: OpenAITranslatorConfig,
}

impl TranslatorConfigs {
    pub fn get(&self, kind: &TranslatorKind) -> TranslatorConfig {
        match kind {
            TranslatorKind::Fake => TranslatorConfig::Fake(self.fake.clone()),
            TranslatorKind::OpenAI => TranslatorConfig::OpenAI(self.openai.clone()),
        }
    }

    pub fn set(&mut self, config: TranslatorConfig) {
        match config {
            TranslatorConfig::Fake(config) => self.fake = config,
            TranslatorConfig::OpenAI(config) => self.openai = config,
        }
    }
}

pub enum TranslatorError {
    Prepare,
    Request,
    Response,
}

#[async_trait]
#[enum_dispatch]
pub trait TranslatorService {
    async fn translate(&self, text: &str) -> Result<String, TranslatorError>;
    async fn translate_batch(&self, texts: Vec<&str>) -> Result<Vec<String>, TranslatorError>;
}

#[enum_dispatch(TranslatorService)]
pub enum Translator {
    Fake(FakeTranslator),
    OpenAI(OpenAITranslator),
}

impl From<TranslatorConfig> for Translator {
    fn from(config: TranslatorConfig) -> Self {
        match config {
            TranslatorConfig::Fake(config) => Self::Fake(FakeTranslator::new(config)),
            TranslatorConfig::OpenAI(config) => Self::OpenAI(OpenAITranslator::new(config)),
        }
    }
}

impl From<&TranslatorConfig> for Translator {
    fn from(config: &TranslatorConfig) -> Self {
        match config {
            TranslatorConfig::Fake(config) => Self::Fake(FakeTranslator::new(config.clone())),
            TranslatorConfig::OpenAI(config) => Self::OpenAI(OpenAITranslator::new(config.clone())),
        }
    }
}
