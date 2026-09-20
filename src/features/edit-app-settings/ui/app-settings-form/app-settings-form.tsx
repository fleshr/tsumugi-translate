import { Button, Group, Select, Stack, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useIntlayer, useLocale } from "react-intlayer";

export const AppSettingsForm = () => {
  const content = useIntlayer("app-settings-form");
  const { locale, setLocale } = useLocale();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const { key, getInputProps, onSubmit } = useForm({
    initialValues: {
      language: locale,
      theme: colorScheme,
    },
  });

  const themes = [
    {
      value: "auto",
      label: "auto",
    },
    {
      value: "light",
      label: "light",
    },
    {
      value: "dark",
      label: "dark",
    },
  ];

  const langs = [
    {
      value: "en",
      label: "en",
    },
    {
      value: "ru",
      label: "ru",
    },
  ];

  return (
    <form
      onSubmit={onSubmit((values) => {
        setLocale(values.language);
        setColorScheme(values.theme);
      })}
    >
      <Stack>
        <Select
          data={themes}
          label={content.theme.label}
          key={key("theme")}
          {...getInputProps("theme")}
        />
        <Select
          data={langs}
          label={content.language.label}
          key={key("language")}
          {...getInputProps("language")}
        />
        <Group justify="flex-end">
          <Button type="submit">{content.save.label}</Button>
        </Group>
      </Stack>
    </form>
  );
};
