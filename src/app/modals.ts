import { CreateProjectModal, createProjectModalKey } from "@/features/create-project";
import { SettingsTabs, settingsModalKey } from "@/widgets/titlebar";

export const modals = {
  [createProjectModalKey]: CreateProjectModal,
  [settingsModalKey]: SettingsTabs,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
