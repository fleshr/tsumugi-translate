use crate::translators::{TranslatorError, TranslatorService};
use async_trait::async_trait;
use fake::{faker::lorem::en::Sentence, Fake};
use serde::{Deserialize, Serialize};
use specta::Type;
use tokio::time::{sleep, Duration};

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
#[serde(rename_all = "camelCase")]
pub struct FakeTranslatorConfig {
    pub delay: u32,
}

impl Default for FakeTranslatorConfig {
    fn default() -> Self {
        Self { delay: 3000 }
    }
}

pub struct FakeTranslator {
    config: FakeTranslatorConfig,
}

impl FakeTranslator {
    pub fn new(config: FakeTranslatorConfig) -> Self {
        Self { config }
    }
}

#[async_trait]
impl TranslatorService for FakeTranslator {
    async fn translate(&self, _text: &str) -> Result<String, TranslatorError> {
        sleep(Duration::from_millis(self.config.delay.into())).await;
        Ok(Sentence(1..10).fake())
    }

    async fn translate_batch(&self, texts: Vec<&str>) -> Result<Vec<String>, TranslatorError> {
        sleep(Duration::from_millis(self.config.delay.into())).await;
        Ok(texts.into_iter().map(|_| Sentence(1..10).fake()).collect())
    }
}
