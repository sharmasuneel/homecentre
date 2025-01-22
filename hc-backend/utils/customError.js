class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'}`;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);  // Status code for bad request
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

class InternalServerError extends AppError {
  constructor(message) {
    super(message || 'Something went wrong!', 500);
  }
}

module.exports = { AppError, ValidationError, NotFoundError, InternalServerError, AuthenticationError, CustomError };
