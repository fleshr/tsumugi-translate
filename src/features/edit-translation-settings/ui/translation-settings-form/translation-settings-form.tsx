import { Button, Group, NumberInput, Select, Stack } from "@mantine/core";
import { isInRange, useForm } from "@mantine/form";
import { useIntlayer } from "react-intlayer";

import { useTranslationSettingsQuery } from "@/entities/translation";
import { translators } from "@/entities/translator";

import { useSetTranslationSettingsMutation } from "../../api/use-set-translation-settings-mutation";

export const TranslationSettingsForm = () => {
  const content = useIntlayer("translation-settings-form");
  const { data: settings } = useTranslationSettingsQuery();
  const { mutate: setSettings } = useSetTranslationSettingsMutation();

  const { key, getInputProps, onSubmit } = useForm({
    initialValues: settings,
    validate: {
      batchSize: isInRange({ min: 1 }),
    },
  });

  const modes = [
    { value: "batch", label: "Batch" },
    { value: "sequential", label: "Sequential" },
  ];

  return (
    <form onSubmit={onSubmit((values) => setSettings(values))}>
      <Stack>
        <Select
          label={content.mode.label}
          data={modes}
          key={key("mode")}
          {...getInputProps("mode")}
        />
        <Select
          label={content.translator.label}
          data={Object.values(translators)}
          key={key("translator")}
          {...getInputProps("translator")}
        />
        <NumberInput
          min={1}
          label={content.batchSize.label}
          description={content.batchSize.description}
          key={key("batchSize")}
          {...getInputProps("batchSize")}
        />
        <Group justify="flex-end">
          <Button type="submit">{content.save.label}</Button>
        </Group>
      </Stack>
    </form>
  );
};
