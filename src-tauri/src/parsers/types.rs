use crate::{parsers::entis::EntisParser, types::Position};
use async_trait::async_trait;
use enum_dispatch::enum_dispatch;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Debug, Clone, Hash, PartialEq, Eq, Type)]
#[serde(rename_all = "camelCase")]
pub enum ParserKind {
    Entis,
}

#[derive(Clone, Debug)]
pub struct ExtractedSegment {
    pub text: String,
    pub file_path: String,
    pub position: Position,
}

#[async_trait]
#[enum_dispatch]
pub trait ParserService {
    async fn extract(&self, path: &str) -> Vec<ExtractedSegment>;
}

#[enum_dispatch(ParserService)]
pub enum Parser {
    Entis(EntisParser),
}

impl From<ParserKind> for Parser {
    fn from(kind: ParserKind) -> Self {
        match kind {
            ParserKind::Entis => Self::Entis(EntisParser::new()),
        }
    }
}

impl From<&ParserKind> for Parser {
    fn from(kind: &ParserKind) -> Self {
        match kind {
            ParserKind::Entis => Self::Entis(EntisParser::new()),
        }
    }
}
