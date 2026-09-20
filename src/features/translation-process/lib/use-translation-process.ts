import { useIntlayer } from "react-intlayer";

import { setTranslations } from "@/entities/translation";
import { events } from "@/shared/api/bindings";
import { useAsyncEffect } from "@/shared/lib/hooks";
import { notify } from "@/shared/lib/notifications";
import { setIsTranslating } from "@/shared/model/sessionStore";

import { useStartTranslationMutation } from "../api/use-start-translation-mutation";
import { useStopTranslationMutation } from "../api/use-stop-translation-mutation";

export const useTranslationProcess = () => {
  const content = useIntlayer("use-translation-process");
  const { mutate: start } = useStartTranslationMutation();
  const { mutate: stop } = useStopTranslationMutation();

  useAsyncEffect(async () => {
    return await events.translationPogress.listen((event) => {
      setTranslations(event.payload);
    });
  }, []);

  useAsyncEffect(async () => {
    return await events.translationError.listen(() => {
      notify.error(content.errors.translationError);
      setIsTranslating(false);
    });
  }, []);

  useAsyncEffect(async () => {
    return await events.translationFinished.listen(() => {
      setIsTranslating(false);
    });
  }, []);

  return { start, stop };
};
