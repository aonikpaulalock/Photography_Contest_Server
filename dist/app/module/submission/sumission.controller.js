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
exports.SubmissionControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ResponseSend_1 = require("../../../utils/ResponseSend");
const CatchAsyncPromise_1 = require("../../middleware/CatchAsyncPromise");
const sumission_service_1 = require("./sumission.service");
const createSubmissionFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sumission_service_1.SubmissionServices.createSubmissionIntoDB(req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Submission created successfully",
        data: result
    });
}));
const updateSubmissionFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { submissionId } = req.params;
    const result = yield sumission_service_1.SubmissionServices.updateSubmissionIntoDB(submissionId, req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Submission updated successfully",
        data: result,
    });
}));
const deleteSubmissionFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { submissionId } = req.params;
    const result = yield sumission_service_1.SubmissionServices.deleteSubmissionIntoDB(submissionId);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Submission deleted successfully",
        data: result,
    });
}));
const getSingleSubmissionFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { submissionId } = req.params;
    const result = yield sumission_service_1.SubmissionServices.getSingleSubmissionIntoDB(submissionId);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Single submission are retrive successfully",
        data: result,
    });
}));
const getSubmissionUsersFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield sumission_service_1.SubmissionServices.getSubmissionUsersIntoDB(userId, req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User submission are retrieved successfully !",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
const getSubmissionContestHolderAndAdminFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield sumission_service_1.SubmissionServices.getSubmissionContestHolderAndAdminIntoDB(userId, req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "ContestHolder submission are retrieved successfully !",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
const getManageSubmissionFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sumission_service_1.SubmissionServices.getManageSubmissionIntoDB(req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Manage submission are retrieved successfully !",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
const getSubmissionsByContestIdFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contestId } = req.params;
    const result = yield sumission_service_1.SubmissionServices.getSubmissionsByContestIdIntoDB(contestId, req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Contest submission are retrieved successfully !",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
exports.SubmissionControllers = {
    createSubmissionFromDB,
    updateSubmissionFromDB,
    deleteSubmissionFromDB,
    getSingleSubmissionFromDB,
    getSubmissionUsersFromDB,
    getSubmissionContestHolderAndAdminFromDB,
    getManageSubmissionFromDB,
    getSubmissionsByContestIdFromDB
};
