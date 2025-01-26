"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastErrorFormat = void 0;
const CastErrorFormat = (err) => {
    const errorMessage = `${err === null || err === void 0 ? void 0 : err.value} is not a valid Id`;
    const errorDetails = {
        stringValue: err === null || err === void 0 ? void 0 : err.value,
        valueType: err === null || err === void 0 ? void 0 : err.kind,
        kind: err === null || err === void 0 ? void 0 : err.kind,
        value: err === null || err === void 0 ? void 0 : err.value,
        path: err === null || err === void 0 ? void 0 : err.path,
        reason: err === null || err === void 0 ? void 0 : err.reason,
        name: err === null || err === void 0 ? void 0 : err.name,
        message: err === null || err === void 0 ? void 0 : err.message,
    };
    // const errorDetails = err;
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorMessage,
        errorDetails,
    };
};
exports.CastErrorFormat = CastErrorFormat;
