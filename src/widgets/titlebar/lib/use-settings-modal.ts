import { openContextModal } from "@mantine/modals";
import { useIntlayer } from "react-intlayer";

import { settingsModalKey } from "../model/modal";

export const useSettingsModal = () => {
  const content = useIntlayer("use-settings-modal");

  const openModal = () => {
    openContextModal({
      modal: settingsModalKey,
      title: content.title,
      size: "auto",
      style: { "--modal-content-height": "100%" },
      innerProps: {},
    });
  };

  return openModal;
};
