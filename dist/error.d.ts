declare class ApplicationError extends Error {
    get name(): string;
}
declare class ClientError extends ApplicationError {
    get statusCode(): number;
}
export declare class BadRequestError extends ClientError {
    get statusCode(): number;
}
export declare class UnauthorizedError extends ClientError {
    get statusCode(): number;
}
export declare class ForbiddenError extends ClientError {
    get statusCode(): number;
}
export declare class NotFoundError extends ClientError {
    get statusCode(): number;
}
export declare class PayloadTooLargeError extends ClientError {
    get statusCode(): number;
}
export declare class NotSupportedError extends ClientError {
    get statusCode(): number;
}
export declare class InternalError extends ApplicationError {
    get statusCode(): number;
}
export {};
