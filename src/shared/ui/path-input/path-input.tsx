import { Button, Group, TextInput, type TextInputProps } from "@mantine/core";
import { FolderOpenIcon } from "@phosphor-icons/react";
import { open } from "@tauri-apps/plugin-dialog";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";

import classes from "./path-input.module.css";

export interface PathInputProps extends Omit<TextInputProps, "inputContainer"> {
  directory?: boolean;
  onPathChange?: (path: string) => void;
  "data-testid"?: string;
}

export const PathInput = (props: PathInputProps) => {
  const {
    disabled,
    onPathChange,
    directory = false,
    "data-testid": dataTestId = "PathInput",
    ...restProps
  } = props;
  const content = useIntlayer("path-input");

  const handleBrowseClick = async () => {
    const path = await open({ directory });

    if (path) {
      onPathChange?.(path);
    }
  };

  const renderContainer = (children: ReactNode) => (
    <Group gap="xs">
      {children}
      <Button
        variant="default"
        disabled={disabled}
        leftSection={<FolderOpenIcon />}
        onClick={handleBrowseClick}
        data-testid={`${dataTestId}.BrowseButton`}
      >
        {content.browseButtonLabel}
      </Button>
    </Group>
  );

  return (
    <TextInput
      disabled={disabled}
      classNames={classes}
      inputContainer={renderContainer}
      wrapperProps={{ "data-testid": dataTestId }}
      data-testid={`${dataTestId}.Input`}
      {...restProps}
    />
  );
};
