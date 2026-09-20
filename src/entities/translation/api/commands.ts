import { commands } from "@/shared/api/bindings";
import { commandWrapper } from "@/shared/lib/command";

export const translationCommands = {
  startTranslation: commandWrapper(commands.startTranslation),
  stopTranslation: commandWrapper(commands.stopTranslation),
  setTranslations: commandWrapper(commands.setTranslations),
  getSettings: commandWrapper(commands.getTranslationSettings),
  setSettings: commandWrapper(commands.setTranslationSettings),
  updateSettings: commandWrapper(commands.updateTranslationSettings),
};
