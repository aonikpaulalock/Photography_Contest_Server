"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateErrorFormat = void 0;
const DuplicateErrorFormat = (err) => {
    const match = err.message.match(/"([^"]*)"/)[1];
    const errorMessage = `${match} is already exists`;
    const errorDetails = {
        keyPattern: err === null || err === void 0 ? void 0 : err.keyPattern,
        keyValue: err === null || err === void 0 ? void 0 : err.keyValue,
    };
    const statusCode = 400;
    return {
        statusCode,
        message: "Duplicate Key Error",
        errorMessage,
        errorDetails
    };
};
exports.DuplicateErrorFormat = DuplicateErrorFormat;
