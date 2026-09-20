import type { TranslatorKind } from "@/shared/api/bindings";

export const translators: Record<TranslatorKind, { value: TranslatorKind; label: string }> = {
  fake: {
    value: "fake",
    label: "Fake Translator",
  },
  openai: {
    value: "openai",
    label: "OpenAI Compatible API",
  },
};
