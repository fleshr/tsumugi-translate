import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";

import { projectCommands } from "@/entities/project";
import { setSegments } from "@/entities/translation";
import type { CreateProjectError } from "@/shared/api/bindings";
import { isKey } from "@/shared/lib/guards";
import { notify } from "@/shared/lib/notifications";
import { setSelectedFile } from "@/shared/model/sessionStore";

interface Options {
  onSuccess?: () => void;
}

export const useCreateProjectMutation = (options: Options) => {
  const { onSuccess } = options;
  const content = useIntlayer("use-create-project-mutation");

  const errorMessages: Record<CreateProjectError["name"] | "Unknown", ReactNode> = {
    PathNotFound: content.errors.pathNotFound,
    Unknown: content.errors.unknownError,
  };

  return useMutation({
    mutationFn: projectCommands.create,
    mutationKey: ["project", "create"],
    onSuccess: (data) => {
      setSegments(data.segments);
      setSelectedFile(data.segments[0].filePath ?? null);
      onSuccess?.();
    },
    onError: ({ name }) => {
      const error = isKey(name, errorMessages) ? name : "Unknown";
      notify.error(errorMessages[error]);
    },
  });
};
