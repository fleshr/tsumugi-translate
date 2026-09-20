import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";

import { projectCommands } from "@/entities/project";
import { setSegments } from "@/entities/translation";
import type { OpenProjectError } from "@/shared/api/bindings";
import { isKey } from "@/shared/lib/guards";
import { notify } from "@/shared/lib/notifications";

export const useOpenProjectMutation = () => {
  const content = useIntlayer("use-open-project-mutation");

  const errorMessages: Record<OpenProjectError["name"] | "Unknown", ReactNode> = {
    InvalidPath: content.errors.invalidPath,
    FileRead: content.errors.fileRead,
    ParseError: content.errors.parseError,
    Unknown: content.errors.unknownError,
  };

  return useMutation({
    mutationFn: projectCommands.open,
    mutationKey: ["project", "open"],
    onSuccess: (data) => {
      if (data) {
        setSegments(data.segments);
      }
    },
    onError: ({ name }) => {
      const error = isKey(name, errorMessages) ? name : "Unknown";
      notify.error(errorMessages[error]);
    },
  });
};
