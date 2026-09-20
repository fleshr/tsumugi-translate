import { Button, Group, Select, Stack } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useIntlayer } from "react-intlayer";

import { parsers } from "@/entities/parser";
import { type CreateProjectParams } from "@/shared/api/bindings";
import { PathInput } from "@/shared/ui/path-input";

import { useCreateProjectMutation } from "../../api/use-create-project-mutation";

interface CreateProjectFormProps {
  onCancel?: () => void;
  onCreate?: () => void;
}

export const CreateProjectForm = (props: CreateProjectFormProps) => {
  const { onCancel, onCreate } = props;
  const content = useIntlayer("create-project-form");
  const { mutate, isPending } = useCreateProjectMutation({ onSuccess: onCreate });

  const { key, onSubmit, getInputProps, setFieldValue } = useForm<CreateProjectParams>({
    initialValues: {
      gamePath: "",
      parser: "entis",
      sourceLang: "ja",
      targetLang: "en",
    },
    validate: {
      gamePath: isNotEmpty(content.errors.gamePath),
      parser: isNotEmpty(content.errors.parser),
    },
    enhanceGetInputProps: () => ({ disabled: isPending }),
  });

  const langs = [
    { value: "en", label: content.languages.en },
    { value: "ja", label: content.languages.ja },
  ];

  return (
    <form onSubmit={onSubmit((values) => mutate(values))}>
      <Stack>
        <PathInput
          label={content.pathInput.label}
          placeholder={content.pathInput.placeholder}
          onPathChange={(path) => setFieldValue("gamePath", path)}
          directory
          key={key("gamePath")}
          {...getInputProps("gamePath")}
        />
        <Select
          label={content.parserSelect.label}
          placeholder={content.parserSelect.placeholder}
          data={Object.values(parsers)}
          allowDeselect={false}
          key={key("parser")}
          {...getInputProps("parser")}
        />
        <Group grow>
          <Select
            label={content.sourceLangSelect.label}
            data={langs}
            key={key("sourceLang")}
            {...getInputProps("sourceLang")}
          />
          <Select
            label={content.targetLangSelect.label}
            data={langs}
            key={key("targetLang")}
            {...getInputProps("targetLang")}
          />
        </Group>
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel} disabled={isPending}>
            {content.cancelButton.label}
          </Button>
          <Button type="submit" loading={isPending} loaderProps={{ type: "dots" }}>
            {content.createButton.label}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
