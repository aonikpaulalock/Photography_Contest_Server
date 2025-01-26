"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        content: zod_1.z.string(),
        blogPhoto: zod_1.z.string().optional(),
        userId: zod_1.z.string(),
        // tags: z.array(z.string()).optional(),
    })
});
exports.BlogValidations = {
    createBlogValidation,
};
