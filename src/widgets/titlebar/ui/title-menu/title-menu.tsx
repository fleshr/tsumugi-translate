import { Menu, Menubar, Text, type MenubarProps } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { useIntlayer } from "react-intlayer";

import { useNewProjectModal } from "@/features/create-project";
import { useOpenProjectMutation } from "@/features/open-project";
import { useSaveProjectMutation } from "@/features/save-project";

import { useSettingsModal } from "../../lib/use-settings-modal";

export const TitleMenu = (props: MenubarProps) => {
  const os = useOs();
  const content = useIntlayer("title-menu");
  const openSettingsModal = useSettingsModal();
  const openNewProjectModal = useNewProjectModal();
  const { mutate: open } = useOpenProjectMutation();
  const { mutate: save } = useSaveProjectMutation();

  const metaKey = os === "macos" ? "Cmd" : "Ctrl";

  return (
    <Menubar {...props}>
      <Menubar.Menu width={220}>
        <Menubar.Target>{content.project.label}</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item
            onClick={openNewProjectModal}
            rightSection={
              <Text size="xs" c="dimmed">
                {`${metaKey} + N`}
              </Text>
            }
          >
            {content.project.new.label}
          </Menu.Item>
          <Menu.Item
            onClick={open}
            rightSection={
              <Text size="xs" c="dimmed">
                {`${metaKey} + O`}
              </Text>
            }
          >
            {content.project.open.label}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={() => save({ selectablePath: false })}
            rightSection={
              <Text size="xs" c="dimmed">
                {`${metaKey} + S`}
              </Text>
            }
          >
            {content.project.save.label}
          </Menu.Item>
          <Menu.Item
            onClick={() => save({ selectablePath: true })}
            rightSection={
              <Text size="xs" c="dimmed">
                {`${metaKey} + Shift + S`}
              </Text>
            }
          >
            {content.project.saveAs.label}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={openSettingsModal}
            rightSection={
              <Text size="xs" c="dimmed">
                {`${metaKey} + Shift + .`}
              </Text>
            }
          >
            {content.project.settings.label}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            rightSection={
              <Text size="xs" c="dimmed">
                {`${metaKey} + Q`}
              </Text>
            }
          >
            {content.project.exit.label}
          </Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu width={160}>
        <Menubar.Target>{content.help.label}</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>{content.help.documentation.label}</Menu.Item>
          <Menu.Item>{content.help.about.label}</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
};
