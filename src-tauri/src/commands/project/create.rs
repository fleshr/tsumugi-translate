use crate::{
    parsers::{
        mappers::map_extracted_segment,
        types::{Parser, ParserKind, ParserService},
    },
    types::{Project, ProjectState, Segment},
};
use nanoid::nanoid;
use serde::{Deserialize, Serialize};
use specta::Type;
use std::path::Path;
use tauri::State;

#[derive(Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct CreateProjectParams {
    pub game_path: String,
    pub parser: ParserKind,
    pub source_lang: String,
    pub target_lang: String,
}

#[derive(Serialize, Type)]
#[serde(tag = "name")]
pub enum CreateProjectError {
    PathNotFound,
}

#[tauri::command]
#[specta::specta]
pub async fn create_project(
    params: CreateProjectParams,
    project_state: State<'_, ProjectState>,
) -> Result<Project, CreateProjectError> {
    let game_path = Path::new(&params.game_path);

    if !game_path.exists() {
        return Err(CreateProjectError::PathNotFound);
    }

    let segments: Vec<Segment> = Parser::from(&params.parser)
        .extract(&params.game_path)
        .await
        .into_iter()
        .map(|segment| map_extracted_segment(segment, game_path))
        .collect();

    let new_project = Project {
        id: nanoid!(),
        parser: params.parser,
        game_path: params.game_path,
        source_lang: params.source_lang,
        target_lang: params.target_lang,
        segments,
    };

    let mut project = project_state.lock().await;
    *project = Some(new_project.clone());

    Ok(new_project)
}
