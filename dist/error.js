// General error classes
// https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/
class ApplicationError extends Error {
    get name() {
        return this.constructor.name;
    }
}
// ================= Client errors ===================
class ClientError extends ApplicationError {
    get statusCode() {
        return 400;
    }
}
export class BadRequestError extends ClientError {
    get statusCode() {
        return 400;
    }
}
export class UnauthorizedError extends ClientError {
    get statusCode() {
        return 401;
    }
}
export class ForbiddenError extends ClientError {
    get statusCode() {
        return 403;
    }
}
export class NotFoundError extends ClientError {
    get statusCode() {
        return 404;
    }
}
export class PayloadTooLargeError extends ClientError {
    get statusCode() {
        return 413;
    }
}
export class NotSupportedError extends ClientError {
    get statusCode() {
        return 421;
    }
}
// ================= Internal errors ===================
export class InternalError extends ApplicationError {
    get statusCode() {
        return 500;
    }
}
//# sourceMappingURL=error.js.map