import { ActionIcon, Button, Group, Select, type ComboboxData } from "@mantine/core";
import { DotsThreeVerticalIcon, PlayIcon, StopIcon } from "@phosphor-icons/react";
import { useIntlayer } from "react-intlayer";

import { useTranslationSettingsQuery } from "@/entities/translation";
import { translators } from "@/entities/translator";
import { useUpdateTranslationSettingsMutation } from "@/features/edit-translation-settings";
import { useTranslationProcess } from "@/features/translation-process";
import type { TranslationMode, TranslatorKind } from "@/shared/api/bindings";
import { getIsTranslating, useSessionStore } from "@/shared/model/sessionStore";

export const TransaltionControls = () => {
  const content = useIntlayer("translation-controls");
  const isTranslating = useSessionStore(getIsTranslating());
  const { data: settings } = useTranslationSettingsQuery();
  const { mutate: updateSettings } = useUpdateTranslationSettingsMutation();
  const { start, stop } = useTranslationProcess();

  const handleTranslatorChange = (value: TranslatorKind | null) => {
    if (value) {
      updateSettings({ field: "translator", value });
    }
  };

  const handleModeChange = (value: TranslationMode | null) => {
    if (value) {
      updateSettings({ field: "mode", value });
    }
  };

  const modes: ComboboxData<TranslationMode> = [
    { value: "sequential", label: content.modeSelect.sequential },
    { value: "batch", label: content.modeSelect.batch },
  ];

  return (
    <Group gap="xs">
      <Select
        w={220}
        disabled={isTranslating}
        value={settings.translator}
        data={Object.values(translators)}
        onChange={handleTranslatorChange}
      />
      <Select
        w={120}
        data={modes}
        value={settings.mode}
        disabled={isTranslating}
        onChange={handleModeChange}
      />
      <Button
        leftSection={isTranslating ? <StopIcon /> : <PlayIcon />}
        onClick={isTranslating ? stop : start}
        color={isTranslating ? "red" : "dark"}
      >
        {isTranslating ? content.stopButton.label : content.startButton.label}
      </Button>
      <ActionIcon variant="default" size="input-sm">
        <DotsThreeVerticalIcon size={24} />
      </ActionIcon>
    </Group>
  );
};
