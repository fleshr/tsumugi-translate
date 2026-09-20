import { Divider, Select, Stack } from "@mantine/core";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";

import { useTranslationSettingsQuery } from "@/entities/translation";
import { translators, useTranslatorConfigsQuery } from "@/entities/translator";
import { type TranslatorKind } from "@/shared/api/bindings";

import { useSetTranslatorConfigMutation } from "../../api/use-set-translator-config-mutation";
import { FakeConfigForm } from "../fake-config-form/fake-config-form";
import { OpenAIConfigForm } from "../openai-config-form/openai-config-form";

export const TranslatorConfigEditor = () => {
  const content = useIntlayer("translator-config-editor");
  const { data: settings } = useTranslationSettingsQuery();
  const { data: configs } = useTranslatorConfigsQuery();
  const { mutate: setConfig } = useSetTranslatorConfigMutation();
  const [selectedTranslator, setSelectedTranslator] = useState(settings.translator);

  const handleTranslatorChange = (translator: TranslatorKind | null) => {
    if (translator) {
      setSelectedTranslator(translator);
    }
  };

  const renderForm = (translator: TranslatorKind) => {
    switch (translator) {
      case "fake":
        return (
          <FakeConfigForm
            initialValues={configs[translator]}
            onSave={(config) => setConfig({ translator, ...config })}
          />
        );

      case "openai":
        return (
          <OpenAIConfigForm
            initialValues={configs[translator]}
            onSave={(config) => setConfig({ translator, ...config })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Stack>
      <Select
        label={content.select.label}
        description={content.select.description}
        value={selectedTranslator}
        data={Object.values(translators)}
        onChange={handleTranslatorChange}
      />
      <Divider />
      {renderForm(selectedTranslator)}
    </Stack>
  );
};
