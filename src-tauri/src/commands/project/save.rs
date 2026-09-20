use crate::types::ProjectState;
use serde::{Deserialize, Serialize};
use specta::Type;
use std::{fs, path::Path};
use tauri::{AppHandle, State};
use tauri_plugin_dialog::DialogExt;

#[derive(Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct SaveProjectParams {
    pub selectable_path: bool,
}

#[derive(Serialize, Type)]
#[serde(tag = "name")]
pub enum SaveProjectError {
    InvalidPath,
    EmptyProject,
    SerializeError,
    WriteError,
}

#[tauri::command]
#[specta::specta]
pub async fn save_project(
    app: AppHandle,
    params: SaveProjectParams,
    project_state: State<'_, ProjectState>,
) -> Result<(), SaveProjectError> {
    let project_lock = project_state.lock().await;

    let Some(project) = project_lock.as_ref() else {
        return Err(SaveProjectError::EmptyProject);
    };

    let project_path = if params.selectable_path {
        let Some(project_target) = app
            .dialog()
            .file()
            .set_file_name("project.json")
            .blocking_save_file()
        else {
            return Ok(());
        };

        project_target
            .into_path()
            .map_err(|_| SaveProjectError::InvalidPath)?
    } else {
        Path::new(&project.game_path).join("project.json")
    };

    let project_json =
        serde_json::to_string_pretty(project).map_err(|_| SaveProjectError::SerializeError)?;

    fs::write(project_path, project_json).map_err(|_| SaveProjectError::WriteError)
}
