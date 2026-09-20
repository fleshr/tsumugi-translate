import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";

import { translationCommands } from "@/entities/translation";
import type { SetTranslationsError } from "@/shared/api/bindings";
import { isKey } from "@/shared/lib/guards";
import { notify } from "@/shared/lib/notifications";

export const useSetTranslationsMutation = () => {
  const content = useIntlayer("use-set-translations-mutation");

  const errorMessages: Record<SetTranslationsError["name"] | "Unknown", ReactNode> = {
    EmptyProject: content.errors.emptyProject,
    SegmentNotFound: content.errors.segmentNotFount,
    Unknown: content.errors.unknownError,
  };

  return useMutation({
    mutationFn: translationCommands.setTranslations,
    mutationKey: ["translation", "set"],
    onError: ({ name }) => {
      const error = isKey(name, errorMessages) ? name : "Unknown";
      notify.error(errorMessages[error]);
    },
  });
};
