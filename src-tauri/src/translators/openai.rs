use std::collections::HashMap;

use crate::translators::{TranslatorError, TranslatorService};
use async_openai::{
    config::OpenAIConfig,
    types::chat::{
        ChatCompletionRequestSystemMessage, ChatCompletionRequestUserMessage,
        CreateChatCompletionRequestArgs, ResponseFormat, ResponseFormatJsonSchema,
    },
    Client,
};
use async_trait::async_trait;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};
use specta::Type;

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
#[serde(rename_all = "camelCase")]
pub struct OpenAITranslatorConfig {
    base_url: String,
    api_key: String,
    model: String,
    system_prompt: String,
}

impl Default for OpenAITranslatorConfig {
    fn default() -> Self {
        Self {
            base_url: String::from("http://127.0.0.1:8080"),
            api_key: String::from("llama-server"),
            model: String::from("sugoitoolkit/Sugoi-14B-Ultra-GGUF:Q4_K_M"),
            system_prompt: String::from("You are a professional localizer whose primary goal is to translate Japanese to English. You should use colloquial or slang or nsfw vocabulary if it makes the translation more accurate. Always respond in English."),
        }
    }
}

pub struct OpenAITranslator {
    config: OpenAITranslatorConfig,
    client: Client<OpenAIConfig>,
}

impl OpenAITranslator {
    pub fn new(config: OpenAITranslatorConfig) -> Self {
        let c = OpenAIConfig::new()
            .with_api_base(config.base_url.clone())
            .with_api_key(config.api_key.clone());

        let client = Client::with_config(c);

        Self { config, client }
    }
}

fn generate_schema(lines_count: usize) -> Value {
    let mut properties = Map::new();
    let mut required = Vec::new();

    for i in 1..=lines_count {
        let key = format!("Line{}", i);

        required.push(key.clone());
        properties.insert(key, serde_json::json!({"type": "string"}));
    }

    serde_json::json!({
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "title": "Response schema",
        "type": "object",
        "properties": properties,
        "required": required,
    })
}

#[async_trait]
impl TranslatorService for OpenAITranslator {
    async fn translate(&self, text: &str) -> Result<String, TranslatorError> {
        let request = CreateChatCompletionRequestArgs::default()
            .model(&self.config.model)
            .messages([
                ChatCompletionRequestSystemMessage::from(self.config.system_prompt.as_str()).into(),
                ChatCompletionRequestUserMessage::from(text).into(),
            ])
            .build()
            .map_err(|_| TranslatorError::Prepare)?;

        let response = self
            .client
            .chat()
            .create(request)
            .await
            .map_err(|_| TranslatorError::Request)?;

        let choice = response.choices.first().ok_or(TranslatorError::Response)?;

        choice
            .message
            .content
            .clone()
            .ok_or(TranslatorError::Response)
    }

    async fn translate_batch(&self, texts: Vec<&str>) -> Result<Vec<String>, TranslatorError> {
        let batch_size = texts.len();
        let schema = generate_schema(batch_size);

        let batch_map = texts
            .into_iter()
            .enumerate()
            .map(|(i, t)| (format!("Line{}", i + 1), t))
            .collect::<IndexMap<_, _>>();

        let batch_json =
            serde_json::to_string_pretty(&batch_map).map_err(|_| TranslatorError::Prepare)?;

        let request = CreateChatCompletionRequestArgs::default()
            .model(&self.config.model)
            .response_format(ResponseFormat::JsonSchema {
                json_schema: ResponseFormatJsonSchema {
                    name: "Response schema".into(),
                    description: None,
                    strict: Some(true),
                    schema,
                },
            })
            .messages([
                ChatCompletionRequestSystemMessage::from(self.config.system_prompt.as_str()).into(),
                ChatCompletionRequestUserMessage::from(batch_json).into(),
            ])
            .build()
            .map_err(|_| TranslatorError::Prepare)?;

        let response = self
            .client
            .chat()
            .create(request)
            .await
            .map_err(|_| TranslatorError::Request)?;

        let choice = response.choices.first().ok_or(TranslatorError::Response)?;

        let content = choice
            .message
            .content
            .clone()
            .ok_or(TranslatorError::Response)?;

        let mut content_map: HashMap<String, String> =
            serde_json::from_str(&content).map_err(|_| TranslatorError::Response)?;

        (1..=batch_size)
            .map(|i| {
                content_map
                    .remove(&format!("Line{}", i))
                    .ok_or(TranslatorError::Prepare)
            })
            .collect()
    }
}
