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
exports.BlogControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ResponseSend_1 = require("../../../utils/ResponseSend");
const CatchAsyncPromise_1 = require("../../middleware/CatchAsyncPromise");
const blog_service_1 = require("./blog.service");
const createBlogFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.createBlogIntoDB(req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Blog created successfully",
        data: result
    });
}));
const getAllBlogFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.getAllBlogIntoDB(req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Blogs are retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleBlogFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.BlogServices.getSingleBlogIntoDB(blogId);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Single blog are retrive successfully",
        data: result,
    });
}));
const getUserBlogFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield blog_service_1.BlogServices.getUserBlogIntoDB(userId, req.query);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User blog are retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const deleteBlogFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.BlogServices.deleteBlogIntoDB(blogId);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Blog deleted successfully",
        data: result,
    });
}));
const updateBlogFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.BlogServices.updateBlogIntoDB(blogId, req.body);
    (0, ResponseSend_1.ResponseSend)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Blog updated successfully",
        data: result,
    });
}));
exports.BlogControllers = {
    createBlogFromDB,
    getAllBlogFromDB,
    getUserBlogFromDB,
    getSingleBlogFromDB,
    deleteBlogFromDB,
    updateBlogFromDB
};
