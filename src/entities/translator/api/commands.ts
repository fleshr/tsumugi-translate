import { commands } from "@/shared/api/bindings";
import { commandWrapper } from "@/shared/lib/command";

export const translatorCommands = {
  getConfigs: commandWrapper(commands.getTranslatorConfigs),
  setConfig: commandWrapper(commands.setTranslatorConfig),
};
