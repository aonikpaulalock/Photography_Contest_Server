"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorFormat = void 0;
const ZodErrorFormat = (err) => {
    var _a;
    const errorMessage = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => `${issue.path.join('.')} ${issue.message}`).join(". ");
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessage,
        errorDetails: err
    };
};
exports.ZodErrorFormat = ZodErrorFormat;
