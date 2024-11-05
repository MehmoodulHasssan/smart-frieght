enum HttpStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
  }

  //following all are static methods that return new instances of ApiError
  //so there is no need to create new instances in the controllers i.e., new ApiError(..) format
  static badRequest(message: string) {
    return new ApiError(HttpStatusCodes.BAD_REQUEST, message);
  }

  static internal(message: string) {
    return new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, message);
  }

  static unauthorized(message: string) {
    return new ApiError(HttpStatusCodes.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new ApiError(HttpStatusCodes.FORBIDDEN, message);
  }
}

export default ApiError;
