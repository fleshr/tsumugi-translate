import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { isUrl, useForm } from "@mantine/form";
import { useIntlayer } from "react-intlayer";

import type { OpenAITranslatorConfig } from "@/shared/api/bindings";

interface OpenAIConfigFormProps {
  initialValues: OpenAITranslatorConfig;
  onSave: (config: OpenAITranslatorConfig) => void;
}

export const OpenAIConfigForm = (props: OpenAIConfigFormProps) => {
  const { initialValues, onSave } = props;
  const content = useIntlayer("openai-config-form");

  const { key, getInputProps, onSubmit } = useForm({
    initialValues,
    validate: {
      baseUrl: isUrl(content.baseUrl.error),
    },
  });

  return (
    <form onSubmit={onSubmit(onSave)}>
      <Stack>
        <TextInput
          label={content.baseUrl.label}
          key={key("baseUrl")}
          {...getInputProps("baseUrl")}
        />
        <TextInput label={content.apiKey.label} key={key("apiKey")} {...getInputProps("apiKey")} />
        <TextInput label={content.model.label} key={key("model")} {...getInputProps("model")} />
        <Textarea
          autosize
          minRows={1}
          resize="vertical"
          label={content.systemPrompt.label}
          key={key("systemPrompt")}
          {...getInputProps("systemPrompt")}
        />
        <Group justify="flex-end">
          <Button type="submit">{content.save.label}</Button>
        </Group>
      </Stack>
    </form>
  );
};
