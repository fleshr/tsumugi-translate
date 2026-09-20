import { CommandError } from "../model/command";

export const commandWrapper = <Params, Data, Error extends { name: string; message?: string }>(
  command: (
    params: Params,
  ) => Promise<{ status: "ok"; data: Data } | { status: "error"; error: Error | null }>,
) => {
  return async (params: Params): Promise<Data> => {
    try {
      const res = await command(params);

      if (res.status === "error") {
        throw new CommandError(res.error ?? { name: "UnknownError" });
      }

      return res.data;
    } catch (e) {
      if (e instanceof CommandError) {
        throw e;
      }

      if (e instanceof Error) {
        throw new CommandError({ name: e.name, message: e.message });
      }

      throw new CommandError({ name: "UnknownError" });
    }
  };
};
