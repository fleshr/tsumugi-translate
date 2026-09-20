use super::types::{ExtractedSegment, ParserService};
use crate::types::Position;
use async_trait::async_trait;
use regex::Regex;
use std::path::Path;
use std::{ffi::OsStr, fs::read_to_string};
use walkdir::WalkDir;

pub struct EntisParser;

impl EntisParser {
    pub fn new() -> Self {
        Self {}
    }

    fn check_path(&self, path: &Path) -> bool {
        path.extension().unwrap() == OsStr::new("srcxml")
    }
}

#[async_trait]
impl ParserService for EntisParser {
    async fn extract(&self, path: &str) -> Vec<ExtractedSegment> {
        let re = Regex::new(r#"(?:text|name)="([^"]+)""#).unwrap();
        let mut result = Vec::new();

        for entry in WalkDir::new(path)
            .sort_by_file_name()
            .min_depth(1)
            .into_iter()
            .filter_entry(|e| e.file_type().is_file())
            .filter_map(|e| e.ok())
        {
            if self.check_path(entry.path()) {
                let content = read_to_string(entry.path()).unwrap();

                for m in re.captures_iter(&content).filter_map(|c| c.get(1)) {
                    result.push(ExtractedSegment {
                        text: m.as_str().into(),
                        file_path: entry.path().to_str().unwrap().into(),
                        position: Position {
                            start: m.start() as u32,
                            end: m.end() as u32,
                        },
                    });
                }
            }
        }

        result
    }
}
