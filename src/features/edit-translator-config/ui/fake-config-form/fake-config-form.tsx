import { Button, Group, NumberInput, Stack } from "@mantine/core";
import { useForm, isInRange } from "@mantine/form";
import { useIntlayer } from "react-intlayer";

import type { FakeTranslatorConfig } from "@/shared/api/bindings";

interface FakeConfigFormProps {
  initialValues: FakeTranslatorConfig;
  onSave: (config: FakeTranslatorConfig) => void;
}

export const FakeConfigForm = (props: FakeConfigFormProps) => {
  const { initialValues, onSave } = props;
  const content = useIntlayer("fake-config-form");

  const { key, getInputProps, onSubmit } = useForm({
    initialValues,
    validate: {
      delay: isInRange({ min: 0 }, content.delay.error),
    },
  });

  return (
    <form onSubmit={onSubmit(onSave)}>
      <Stack>
        <NumberInput
          min={0}
          label={content.delay.label}
          description={content.delay.description}
          key={key("delay")}
          {...getInputProps("delay")}
        />
        <Group justify="flex-end">
          <Button type="submit">{content.save.label}</Button>
        </Group>
      </Stack>
    </form>
  );
};
