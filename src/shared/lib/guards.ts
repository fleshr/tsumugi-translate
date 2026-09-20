export const isKey = <T extends string>(key: string, obj: Record<T, unknown>): key is T => {
  return key in obj;
};
