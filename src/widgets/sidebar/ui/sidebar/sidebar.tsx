import { Box, ScrollArea, Stack } from "@mantine/core";

import { getFiles, useTranslationStore } from "@/entities/translation";
import { getSelectedFile, setSelectedFile, useSessionStore } from "@/shared/model/sessionStore";

import { FileButton } from "../file-button/file-button";

import classes from "./sidebar.module.css";

export const Sidebar = () => {
  const files = useTranslationStore(getFiles());
  const selectedFile = useSessionStore(getSelectedFile());

  return (
    <Stack className={classes.container}>
      <Box className={classes.header}>Files</Box>
      <ScrollArea className={classes.scroll}>
        <Stack className={classes.list}>
          {files.map((file) => (
            <FileButton
              key={file}
              label={file}
              onClick={() => setSelectedFile(file)}
              active={file === selectedFile}
            />
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};
