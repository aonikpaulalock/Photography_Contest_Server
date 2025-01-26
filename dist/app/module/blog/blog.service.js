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
exports.BlogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.create(payload);
    return result;
});
const getAllBlogIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const BlogQuery = new QueryBuilder_1.default(blog_model_1.default.find().populate("userId"), query)
        .search(blog_constant_1.blogSearchableFields)
        .paginate();
    const result = yield BlogQuery.modelQuery;
    const meta = yield BlogQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getSingleBlogIntoDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(blogId).populate("userId");
    return result;
});
const getUserBlogIntoDB = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const BlogQuery = new QueryBuilder_1.default(blog_model_1.default.find({
        userId
    })
        .populate("userId"), query).paginate();
    const result = yield BlogQuery.modelQuery;
    const meta = yield BlogQuery.countTotal();
    return {
        result,
        meta,
    };
});
const deleteBlogIntoDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndDelete(blogId);
    return result;
});
const updateBlogIntoDB = (blogId, post) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndUpdate(blogId, post, { new: true });
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogIntoDB,
    getSingleBlogIntoDB,
    getUserBlogIntoDB,
    deleteBlogIntoDB,
    updateBlogIntoDB
};
