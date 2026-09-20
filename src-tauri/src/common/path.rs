use std::path::Path;

pub fn to_rel_path(full: &str, base: &Path) -> String {
    let full_path = Path::new(full);

    full_path
        .strip_prefix(base)
        .unwrap_or(full_path)
        .to_string_lossy()
        .into_owned()
}
