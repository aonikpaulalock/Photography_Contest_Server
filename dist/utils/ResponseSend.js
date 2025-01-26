"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSend = void 0;
const ResponseSend = (res, data) => {
    return res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data
    });
};
exports.ResponseSend = ResponseSend;
