import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";

import { translationCommands } from "@/entities/translation";
import type { StartTranslationError } from "@/shared/api/bindings";
import { isKey } from "@/shared/lib/guards";
import { notify } from "@/shared/lib/notifications";
import { setIsTranslating } from "@/shared/model/sessionStore";

export const useStartTranslationMutation = () => {
  const content = useIntlayer("use-start-translation-mutation");

  const errorMessages: Record<StartTranslationError["name"] | "Unknown", ReactNode> = {
    EmptyProject: content.errors.emptyProject,
    AlreadyRunning: content.errors.alreadyRunning,
    Unknown: content.errors.unknown,
  };

  return useMutation({
    mutationFn: translationCommands.startTranslation,
    mutationKey: ["translation", "start"],
    onSuccess: () => {
      setIsTranslating(true);
    },
    onError: ({ name }) => {
      let error = isKey(name, errorMessages) ? name : "Unknown";
      notify.error(errorMessages[error]);
    },
  });
};
