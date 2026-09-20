import { type ContextModalProps } from "@mantine/modals";

import { CreateProjectForm } from "../create-project-form/create-project-form";

export const CreateProjectModal = (props: ContextModalProps) => {
  const { context, id } = props;

  const handleClose = () => {
    context.closeModal(id);
  };

  return <CreateProjectForm onCancel={handleClose} onCreate={handleClose} />;
};
