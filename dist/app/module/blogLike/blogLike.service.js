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
exports.BlogLikeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const blogLike_model_1 = __importDefault(require("./blogLike.model"));
const createBlogLikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogLike_model_1.default.create(payload);
    return result;
});
const getTotalBlogLikeIntoDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogLike_model_1.default.countDocuments({ blogId });
    return result;
});
const checkBlogLikeIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const likedBlogs = yield blogLike_model_1.default.find({ userId });
    return likedBlogs.map((blog) => blog.blogId);
});
const dislikeBlogIntoDB = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingLike = yield blogLike_model_1.default.findOne({ blogId, userId });
    if (!existingLike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog user not found");
    }
    const result = yield blogLike_model_1.default.deleteOne({ blogId, userId });
    return result;
});
exports.BlogLikeServices = {
    createBlogLikeIntoDB,
    getTotalBlogLikeIntoDB,
    checkBlogLikeIntoDB,
    dislikeBlogIntoDB
};
