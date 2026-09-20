import { ActionIcon } from "@mantine/core";
import { ArrowsInSimpleIcon, ArrowsOutSimpleIcon } from "@phosphor-icons/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

export const MaximizeButton = () => {
  const [maximized, setMaximized] = useState(false);

  const handleMaximize = () => {
    setMaximized((maximized) => !maximized);
    getCurrentWindow().toggleMaximize();
  };

  const initState = async () => {
    const maximized = await getCurrentWindow().isMaximized();
    setMaximized(maximized);
  };

  useEffect(() => {
    initState();
  }, []);

  return (
    <ActionIcon variant="subtle" onClick={handleMaximize}>
      {maximized ? <ArrowsInSimpleIcon /> : <ArrowsOutSimpleIcon />}
    </ActionIcon>
  );
};
