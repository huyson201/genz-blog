export class RequireAuthException extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
      return;
    }
    super("Authorization required");
  }
}
