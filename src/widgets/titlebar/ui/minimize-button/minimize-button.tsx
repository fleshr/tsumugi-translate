import { ActionIcon } from "@mantine/core";
import { MinusIcon } from "@phosphor-icons/react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const MinimizeButton = () => {
  const handleMinimize = () => {
    getCurrentWindow().minimize();
  };

  return (
    <ActionIcon variant="subtle" onClick={handleMinimize}>
      <MinusIcon />
    </ActionIcon>
  );
};
