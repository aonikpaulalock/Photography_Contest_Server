"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ResponseSend_1 = require("../../../utils/ResponseSend");
const CatchAsyncPromise_1 = require("../../middleware/CatchAsyncPromise");
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config"));
const createUser = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.UserServices.createUserIntoDB(req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "User registered successfully",
        data: result
    });
}));
const loginUser = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.UserServices.loginUserIntoDB(req.body);
    const { refreshToken, accessToken, user } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true,
    });
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User login successful",
        data: {
            accessToken
        }
    });
}));
const changePassword = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield auth_service_1.UserServices.changePasswordIntoDB(userId, req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Password changed successfully",
        data: result
    });
}));
const refreshToken = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.UserServices.refreshTokenIntoDB(refreshToken);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
}));
const forgetPassword = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    const result = yield auth_service_1.UserServices.forgetPasswordIntoDB(userEmail);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reset link is generated succesfully!',
        data: result,
    });
}));
const resetPassword = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) || "";
    const result = yield auth_service_1.UserServices.resetPasswordIntoDB(req.body, token);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password reset succesfuly!',
        data: result,
    });
}));
exports.UserControllers = {
    createUser,
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
