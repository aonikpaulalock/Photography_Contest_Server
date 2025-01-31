"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const auth_constant_1 = require("./auth.constant");
// const passwordValidationSchema = z.string()
//   .refine((password) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//     return regex.test(password)
//   }, {
//     message: "must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
//   })
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
        role: zod_1.z.enum([...auth_constant_1.userRole]).default("user"),
        isDeleted: zod_1.z.boolean().default(false),
        status: zod_1.z.enum([...auth_constant_1.UserStatus]).default("active"),
        bio: zod_1.z.string(),
        designation: zod_1.z.string(),
        country: zod_1.z.string(),
        profileImage: zod_1.z.string(),
    })
});
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
    }),
});
const loginUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required.' }),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    }),
});
const changePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string().min(8, "Password must be at least 8 characters"),
        newPassword: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    })
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required!',
        }),
    })
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'User id is required!',
        }),
        newPassword: zod_1.z.string({
            required_error: 'User password is required!',
        }),
    })
});
exports.UserValidations = {
    createUserValidation,
    loginUserValidation,
    changePasswordValidation,
    resetPasswordValidationSchema,
    forgetPasswordValidationSchema,
    refreshTokenValidationSchema,
    updateUserValidation
};
