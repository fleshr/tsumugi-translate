use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Serialize, Clone, Type)]
#[serde(rename_all = "camelCase")]
pub struct TranslatedSegment {
    pub id: String,
    pub translation: String,
}
