"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUser = void 0;
const zod_1 = require("zod");
const auth_constant_1 = require("../Auth/auth.constant");
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...auth_constant_1.UserStatus]),
    }),
});
const updateUserRoleValidation = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(['admin', 'contestHolder']),
    }),
});
exports.ValidationUser = {
    changeStatusValidationSchema,
    updateUserRoleValidation
};
