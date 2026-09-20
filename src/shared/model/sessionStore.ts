import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";

interface State {
  isTranslating: boolean;
  selectedFile: string | null;
}

const initialState: State = {
  isTranslating: false,
  selectedFile: null,
};

export const useSessionStore = createWithEqualityFn<State>()(() => initialState, shallow);

export const setIsTranslating = (isTranslating: boolean) => {
  useSessionStore.setState({ isTranslating });
};

export const setSelectedFile = (selectedFile: string) => {
  useSessionStore.setState({ selectedFile });
};

export const getIsTranslating = () => {
  return (store: State) => store.isTranslating;
};

export const getSelectedFile = () => {
  return (store: State) => store.selectedFile;
};
