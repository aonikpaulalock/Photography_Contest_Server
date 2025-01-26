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
exports.ControllersUsers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const CatchAsyncPromise_1 = require("../../middleware/CatchAsyncPromise");
const user_service_1 = require("./user.service");
const ResponseSend_1 = require("../../../utils/ResponseSend");
const getAllUserFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.ServicesUsers.getAllUserIntoDB(req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const getMeFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield user_service_1.ServicesUsers.getMeIntoDB(userId, role);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is retrieved succesfully',
        data: result,
    });
}));
const changeStatusFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.ServicesUsers.changeStatusIntoDB(id, req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Status is updated successfully",
        data: result,
    });
}));
const updateUserFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { id } = req.params;
    const result = yield user_service_1.ServicesUsers.updateUserIntoDB(id, req.body, userId);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is updated succesfully',
        data: result,
    });
}));
const getSingleUserFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.ServicesUsers.getSingleUserIntoDB(userId);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is retrive succesfully',
        data: result,
    });
}));
const updateUserRoleFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    const result = yield user_service_1.ServicesUsers.updateUserRoleIntoDB(id, role);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User role updated successfully',
        data: result,
    });
}));
const deleteUserFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.ServicesUsers.deleteUserIntoDB(id);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User is deleted succesfully',
        data: result,
    });
}));
exports.ControllersUsers = {
    getAllUserFromDB,
    getMeFromDB,
    changeStatusFromDB,
    updateUserFromDB,
    updateUserRoleFromDB,
    getSingleUserFromDB,
    deleteUserFromDB
};
