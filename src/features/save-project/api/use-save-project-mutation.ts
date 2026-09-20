import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";

import { projectCommands } from "@/entities/project";
import type { SaveProjectError } from "@/shared/api/bindings";
import { isKey } from "@/shared/lib/guards";
import { notify } from "@/shared/lib/notifications";

export const useSaveProjectMutation = () => {
  const content = useIntlayer("use-save-project-mutation");

  const errorMessages: Record<SaveProjectError["name"] | "Unknown", ReactNode> = {
    InvalidPath: content.errors.invalidPath,
    EmptyProject: content.errors.emptyProject,
    SerializeError: content.errors.serializeError,
    WriteError: content.errors.writeError,
    Unknown: content.errors.unknownError,
  };

  return useMutation({
    mutationFn: projectCommands.save,
    mutationKey: ["project", "save"],
    onError: ({ name }) => {
      const error = isKey(name, errorMessages) ? name : "Unknown";
      notify.error(errorMessages[error]);
    },
  });
};
