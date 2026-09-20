export class CommandError extends Error {
  constructor({ name, message }: { name: string; message?: string }) {
    super(message);
    this.name = name;
  }
}
