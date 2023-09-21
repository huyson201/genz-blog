class CustomError<T> extends Error {
  public data?: T;
  public status?: number;
  public info?: T;
  constructor(status: number, message?: string, data?: T) {
    super(message);
    this.data = data;
    this.status = status;
    this.info = data;
  }
}

export default CustomError;
