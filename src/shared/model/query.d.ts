import "@tanstack/react-query";
import { CommandError } from "./command";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: CommandError;
  }
}
