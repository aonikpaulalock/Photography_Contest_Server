"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogLikeValidations = void 0;
const zod_1 = require("zod");
const createBlogLikeValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        blogId: zod_1.z.string(),
    })
});
exports.BlogLikeValidations = {
    createBlogLikeValidation,
};
