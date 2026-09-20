import { Group, Progress, Text } from "@mantine/core";

import { getProgress, useTranslationStore } from "@/entities/translation";
import { getIsTranslating, useSessionStore } from "@/shared/model/sessionStore";

export const TranslationProgress = () => {
  const { done, total } = useTranslationStore(getProgress());
  const isTranslating = useSessionStore(getIsTranslating());

  return (
    <Group>
      <Progress
        value={(done / total) * 100}
        size="sm"
        flex={1}
        striped={isTranslating}
        animated={isTranslating}
      />
      <Text size="xs" c="dimmed">
        {done}/{total}
      </Text>
    </Group>
  );
};
