"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
class AppError extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        stack
            ? (this.stack = stack)
            : Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
