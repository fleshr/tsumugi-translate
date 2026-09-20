import { Group } from "@mantine/core";

import { LogoIcon } from "@/shared/ui/icons";

import { CloseButton } from "../close-button/close-button";
import { MaximizeButton } from "../maximize-button/maximize-button";
import { MinimizeButton } from "../minimize-button/minimize-button";
import { TitleMenu } from "../title-menu/title-menu";

import classes from "./titlebar.module.css";

export const Titlebar = () => {
  return (
    <Group className={classes.container}>
      <div className={classes.dragRegion} data-tauri-drag-region />
      <LogoIcon className={classes.logo} />
      <TitleMenu className={classes.menu} />
      <Group className={classes.actions}>
        <MinimizeButton />
        <MaximizeButton />
        <CloseButton />
      </Group>
    </Group>
  );
};
