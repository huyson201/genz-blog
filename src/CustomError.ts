class CustomError<T> extends Error {
  public data?: T;
  public status?: number;
  constructor(status: number, message?: string, data?: T) {
    super(message);
    this.data = data;
    this.status = status;
  }
}

export default CustomError;
