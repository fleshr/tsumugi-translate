import { Stack, Group, Progress, Text, Button } from "@mantine/core";
import type { ComponentProps } from "react";

import { getProgress, useTranslationStore } from "@/entities/translation";

import classes from "./file-button.module.css";

interface FileButtonProps extends ComponentProps<"button"> {
  active?: boolean;
  label: string;
}

export const FileButton = (props: FileButtonProps) => {
  const { active = false, label, ...restProps } = props;
  const progress = useTranslationStore(getProgress(label));

  return (
    <Button
      classNames={classes}
      variant={active ? "filled" : "subtle"}
      data-active={active}
      {...restProps}
    >
      <Stack gap="xs" w="100%">
        <Group justify="space-between" align="center" wrap="nowrap">
          <Text size="xs" c={active ? "white" : undefined}>
            {label}
          </Text>
          <Text size="xs" c="dimmed">
            {progress.done}/{progress.total}
          </Text>
        </Group>
        <Progress
          size="xs"
          value={(progress.done / progress.total) * 100}
          color={active ? "gray" : undefined}
        />
      </Stack>
    </Button>
  );
};
