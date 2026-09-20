import { useMutation } from "@tanstack/react-query";

import { translatorCommands } from "@/entities/translator";
import { queryClient } from "@/shared/api/query";

export const useSetTranslatorConfigMutation = () => {
  return useMutation({
    mutationFn: translatorCommands.setConfig,
    mutationKey: ["translator", "config", "set"],
    onSuccess: (configs) => {
      queryClient.setQueryData(["translator", "configs"], configs);
    },
  });
};
