class ApiError extends Error {
  public readonly statusCode: number;
  public readonly data: null;
  public readonly success: false;
  public readonly errors: unknown[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: unknown[] = [],
    stack?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    // Fix prototype chain (VERY important)
    Object.setPrototypeOf(this, ApiError.prototype);

    if (stack) {
      this.stack = stack;
    }
  }
}

export { ApiError };
