import { commands } from "@/shared/api/bindings";
import { commandWrapper } from "@/shared/lib/command";

export const projectCommands = {
  create: commandWrapper(commands.createProject),
  open: commandWrapper(commands.openProject),
  save: commandWrapper(commands.saveProject),
};
