import { Group, Stack } from "@mantine/core";

import { ProjectInfo } from "../project-info/project-info";
import { TransaltionControls } from "../translation-controls/translation-controls";
import { TranslationProgress } from "../translation-progress/translation-progress";

export const TranslationOverview = () => {
  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <ProjectInfo />
        <TransaltionControls />
      </Group>
      <TranslationProgress />
    </Stack>
  );
};
