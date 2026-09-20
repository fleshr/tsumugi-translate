import { ActionIcon } from "@mantine/core";
import { XIcon } from "@phosphor-icons/react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const CloseButton = () => {
  const handleClose = () => {
    getCurrentWindow().close();
  };

  return (
    <ActionIcon variant="subtle" onClick={handleClose}>
      <XIcon />
    </ActionIcon>
  );
};
