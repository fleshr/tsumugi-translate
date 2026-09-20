import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";

import { translationCommands } from "@/entities/translation";
import type { StopTranslationError } from "@/shared/api/bindings";
import { isKey } from "@/shared/lib/guards";
import { notify } from "@/shared/lib/notifications";
import { setIsTranslating } from "@/shared/model/sessionStore";

export const useStopTranslationMutation = () => {
  const content = useIntlayer("use-stop-translation-mutation");

  const errorMessages: Record<StopTranslationError["name"] | "Unknown", ReactNode> = {
    NotRunning: content.errors.notRunning,
    Unknown: content.errors.unknown,
  };

  return useMutation({
    mutationFn: translationCommands.stopTranslation,
    mutationKey: ["translation", "stop"],
    onSuccess: () => {
      setIsTranslating(false);
    },
    onError: ({ name }) => {
      let error = isKey(name, errorMessages) ? name : "Unknown";
      notify.error(errorMessages[error]);
    },
  });
};
