"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationValidations = void 0;
const zod_1 = require("zod");
const createParticipationValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        contestId: zod_1.z.string(),
        submissionId: zod_1.z.string().optional(),
        isWinner: zod_1.z.boolean().default(false),
    })
});
exports.ParticipationValidations = {
    createParticipationValidation,
};
