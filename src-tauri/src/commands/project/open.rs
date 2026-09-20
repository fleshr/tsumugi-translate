use crate::types::{Project, ProjectState};
use serde::Serialize;
use specta::Type;
use std::fs;
use tauri::{AppHandle, State};
use tauri_plugin_dialog::DialogExt;

#[derive(Serialize, Type)]
#[serde(tag = "name")]
pub enum OpenProjectError {
    InvalidPath,
    FileRead,
    ParseError,
}

#[tauri::command]
#[specta::specta]
pub async fn open_project(
    app: AppHandle,
    project_state: State<'_, ProjectState>,
) -> Result<Option<Project>, OpenProjectError> {
    let Some(project_target) = app
        .dialog()
        .file()
        .add_filter("Project file", &["json"])
        .blocking_pick_file()
    else {
        return Ok(None);
    };

    let project_path = project_target
        .into_path()
        .map_err(|_| OpenProjectError::InvalidPath)?;

    let file_content = fs::read_to_string(project_path).map_err(|_| OpenProjectError::FileRead)?;

    let project: Project =
        serde_json::from_str(&file_content).map_err(|_| OpenProjectError::ParseError)?;

    let mut project_guard = project_state.lock().await;
    *project_guard = Some(project.clone());

    Ok(Some(project))
}
