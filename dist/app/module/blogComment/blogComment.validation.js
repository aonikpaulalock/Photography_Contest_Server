"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentValidations = void 0;
const zod_1 = require("zod");
const createBlogCommentValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        blogId: zod_1.z.string(),
        content: zod_1.z.string(),
    })
});
exports.BlogCommentValidations = {
    createBlogCommentValidation,
};
