import { Textarea, type TextareaProps } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import type { ChangeEvent } from "react";

import { setTranslation } from "@/entities/translation";

import { useSetTranslationsMutation } from "../../api/use-set-translations-mutation";

interface EditTranslationTextareaProps extends TextareaProps {
  id: string;
}

export const EditTranslationTextarea = (props: EditTranslationTextareaProps) => {
  const { id, ...restProps } = props;
  const { mutate: setTranslations } = useSetTranslationsMutation();
  const setTranslationsDebounced = useDebouncedCallback(setTranslations, 300);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
    const translation = e.target.value;

    setTranslation(id, translation);
    setTranslationsDebounced([{ id, translation }]);
  };

  return <Textarea minRows={1} onChange={handleChange} autosize {...restProps} />;
};
