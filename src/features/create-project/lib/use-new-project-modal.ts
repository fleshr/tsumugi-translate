import { openContextModal } from "@mantine/modals";
import { useIntlayer } from "react-intlayer";

import { createProjectModalKey } from "../model/modal";

export const useNewProjectModal = () => {
  const content = useIntlayer("use-new-project-modal");

  const openModal = () => {
    openContextModal({
      modal: createProjectModalKey,
      title: content.modal.title,
      innerProps: {},
    });
  };

  return openModal;
};
