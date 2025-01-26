"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestValidations = void 0;
const zod_1 = require("zod");
const contest_constant_1 = require("./contest.constant");
const payment_constant_1 = require("../payment/payment.constant");
const createContestValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        userId: zod_1.z.string(),
        prize: zod_1.z.string(),
        status: zod_1.z.enum([...contest_constant_1.contestStatus]).default("granted"),
        paymentStatus: zod_1.z.enum([...payment_constant_1.paymentStatus]).default("UNPAID"),
        tags: zod_1.z.array(zod_1.z.string()),
        requirements: zod_1.z.string(),
        deadline: zod_1.z.string(),
        participantsID: zod_1.z.array(zod_1.z.string()).optional(),
        winnerId: zod_1.z.string().optional(),
    })
});
const updateContestValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prize: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        requirements: zod_1.z.string().optional(),
        deadline: zod_1.z.string().optional(),
    }),
});
exports.ContestValidations = {
    createContestValidation,
    updateContestValidation
};
