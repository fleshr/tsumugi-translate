import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";

import type { Segment, TranslatedSegment } from "@/shared/api/bindings";

interface State {
  byId: Record<string, Segment>;
  allIds: string[];
}

const initialState: State = {
  byId: {},
  allIds: [],
};

export const useTranslationStore = createWithEqualityFn<State>()(
  immer(() => initialState),
  shallow,
);

export const setSegments = (segments: Segment[]) => {
  const newState: State = {
    byId: {},
    allIds: [],
  };

  for (const segment of segments) {
    newState.byId[segment.id] = segment;
    newState.allIds.push(segment.id);
  }

  useTranslationStore.setState(newState);
};

export const getSegment = (id: string) => {
  return (store: State): Segment | undefined => {
    return store.byId[id];
  };
};

export const getSegments = (filePath?: string | null) => {
  return (store: State): Segment[] => {
    const segments = filePath
      ? store.allIds.filter((id) => store.byId[id].filePath === filePath)
      : store.allIds;

    return segments.map((id) => getSegment(id)(store) as Segment);
  };
};

export const getFiles = () => {
  return (store: State) => {
    return [...new Set(store.allIds.map((id) => store.byId[id].filePath))];
  };
};

export const getProgress = (filePath?: string) => {
  return (store: State) => {
    const segments = filePath
      ? store.allIds.filter((id) => store.byId[id].filePath === filePath)
      : store.allIds;

    const translated = segments.filter((id) => store.byId[id].translated);

    return { done: translated.length, total: segments.length };
  };
};

export const setTranslation = (id: string, translation: string) => {
  useTranslationStore.setState((state) => {
    if (state.byId[id]) {
      state.byId[id].translated = translation.trim();
    }
  });
};

export const setTranslations = (segments: TranslatedSegment[]) => {
  useTranslationStore.setState((state) => {
    for (const segment of segments) {
      if (state.byId[segment.id]) {
        state.byId[segment.id].translated = segment.translation.trim();
      }
    }
  });
};
