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
exports.BlogCommentServices = void 0;
const blogComment_model_1 = __importDefault(require("./blogComment.model"));
const createBlogCommentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.default.create(payload);
    return result;
});
const getBlogCommentsIntoDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.default.find({ blogId })
        .populate("blogId userId");
    return result;
});
const getTotalBlogCommentFromDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.default.countDocuments({ blogId });
    return result;
});
exports.BlogCommentServices = {
    createBlogCommentIntoDB,
    getBlogCommentsIntoDB,
    getTotalBlogCommentFromDB
};
