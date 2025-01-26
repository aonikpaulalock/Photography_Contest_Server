"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
const zod_1 = require("zod");
const ZodErrorFormat_1 = require("../ErrorFormat/ZodErrorFormat");
const CastErrorFormat_1 = require("../ErrorFormat/CastErrorFormat");
const DuplicateErrorFormat_1 = require("../ErrorFormat/DuplicateErrorFormat");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const GlobalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || "Something went wrong";
    let errorMessage = "Internal server error";
    let errorDetails = err;
    if (err instanceof zod_1.ZodError) {
        const formatingEroor = (0, ZodErrorFormat_1.ZodErrorFormat)(err);
        statusCode = formatingEroor.statusCode;
        message = formatingEroor.message;
        errorMessage = formatingEroor.errorMessage;
        errorDetails = formatingEroor.errorDetails;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const formatingEroor = (0, CastErrorFormat_1.CastErrorFormat)(err);
        statusCode = formatingEroor.statusCode;
        message = formatingEroor.message;
        errorMessage = formatingEroor.errorMessage;
        errorDetails = formatingEroor.errorDetails;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const formatingEroor = (0, DuplicateErrorFormat_1.DuplicateErrorFormat)(err);
        statusCode = formatingEroor.statusCode;
        message = formatingEroor.message;
        errorMessage = formatingEroor.errorMessage;
        errorDetails = formatingEroor.errorDetails;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
        errorDetails = err;
    }
    else if (err.name === "JsonWebTokenError") {
        message = "Unauthorized Access";
        errorMessage = "You do not have the necessary ;permissions to access this resource.";
        errorDetails = null;
    }
    return res.status(statusCode)
        .json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack: err.name === "JsonWebTokenError" ? null : err.stack
    });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
