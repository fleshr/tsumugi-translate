import { Tabs } from "@mantine/core";
import { PlayIcon, SlidersHorizontalIcon, TranslateIcon } from "@phosphor-icons/react";
import { useIntlayer } from "react-intlayer";

import { AppSettingsForm } from "@/features/edit-app-settings";
import { TranslationSettingsForm } from "@/features/edit-translation-settings";
import { TranslatorConfigEditor } from "@/features/edit-translator-config";

import classes from "./settings-tabs.module.css";

export const SettingsTabs = () => {
  const content = useIntlayer("settings-tabs");

  return (
    <Tabs variant="pills" orientation="vertical" defaultValue="app" classNames={classes}>
      <Tabs.List>
        <Tabs.Tab value="app" leftSection={<SlidersHorizontalIcon />}>
          {content.app.label}
        </Tabs.Tab>
        <Tabs.Tab value="translation" leftSection={<PlayIcon />}>
          {content.translation.label}
        </Tabs.Tab>
        <Tabs.Tab value="translators" leftSection={<TranslateIcon />}>
          {content.translators.label}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="app">
        <AppSettingsForm />
      </Tabs.Panel>
      <Tabs.Panel value="translation">
        <TranslationSettingsForm />
      </Tabs.Panel>
      <Tabs.Panel value="translators">
        <TranslatorConfigEditor />
      </Tabs.Panel>
    </Tabs>
  );
};
