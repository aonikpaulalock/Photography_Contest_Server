"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionValidations = void 0;
const zod_1 = require("zod");
const createSubmissionValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        contestId: zod_1.z.string(),
        images: zod_1.z.array(zod_1.z.string()).min(1, "At least one image is required"),
        isWinner: zod_1.z.boolean().default(false),
    })
});
exports.SubmissionValidations = {
    createSubmissionValidation,
};
