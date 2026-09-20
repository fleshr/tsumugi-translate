use super::types::ExtractedSegment;
use crate::{common::path::to_rel_path, types::Segment};
use nanoid::nanoid;
use std::path::Path;

pub fn map_extracted_segment(segment: ExtractedSegment, game_path: &Path) -> Segment {
    Segment {
        id: nanoid!(),
        original: segment.text,
        translated: String::new(),
        file_path: to_rel_path(&segment.file_path, game_path),
        position: segment.position,
    }
}
