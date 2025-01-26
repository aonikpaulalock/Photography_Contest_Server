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
exports.ContestControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ResponseSend_1 = require("../../../utils/ResponseSend");
const CatchAsyncPromise_1 = require("../../middleware/CatchAsyncPromise");
const contest_service_1 = require("./contest.service");
const createContestFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contest_service_1.ContestServices.createContestIntoDB(req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Contest created successfully",
        data: result
    });
}));
const getSingleContestFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contestId } = req.params;
    const result = yield contest_service_1.ContestServices.getSingleContestIntoDB(contestId);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Contest retrive successfully",
        data: result,
    });
}));
const updateContestFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = req.user;
    const { contestId } = req.params;
    const result = yield contest_service_1.ContestServices.updateContestIntoDB(role, userId, contestId, req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Contest updated successfully",
        data: result,
    });
}));
const deleteContestFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = req.user;
    const { id } = req.params;
    yield contest_service_1.ContestServices.deleteContestIntoDB(role, userId, id);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.NO_CONTENT,
        message: "Contest deleted successfully",
        data: null,
    });
}));
const getAllContestsFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = req.user;
    const result = yield contest_service_1.ContestServices.getAllContestsIntoDB(role, userId, req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Contest retrieved successfully",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
const manageContestsFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contest_service_1.ContestServices.manageContestsIntoDB(req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Manage contest retrieved successfully",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
const getContestsParticipationFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contestId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = yield contest_service_1.ContestServices.getContestsParticipationIntoDB(contestId, Number(page), Number(limit));
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Contest participation retrieved successfully",
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalParticipants: result.totalParticipants,
        },
        data: result.data,
    });
}));
exports.ContestControllers = {
    createContestFromDB,
    getSingleContestFromDB,
    getAllContestsFromDB,
    getContestsParticipationFromDB,
    updateContestFromDB,
    manageContestsFromDB,
    deleteContestFromDB
};
