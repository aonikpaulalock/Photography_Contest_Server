import { z } from "zod";
import { userRole, UserStatus } from "./auth.constant";

// const passwordValidationSchema = z.string()
//   .refine((password) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//     return regex.test(password)
//   }, {
//     message: "must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
//   })


const createUserValidation = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum([...userRole] as [string, ...string[]]).default("user"),
    isDeleted: z.boolean().default(false),
    status: z.enum([...UserStatus] as [string, ...string[]]).default("active"),
    bio: z.string(),
    designation: z.string(),
    country: z.string(),
    profileImage: z.string(),
  })
})

const updateUserValidation = z.object({
  body: z.object({
    bio: z.string().optional(),
    designation: z.string().optional(),
    country: z.string().optional(),
    profileImage: z.string().optional(),
    username: z.string().optional(),
  }),
})

const loginUserValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required.' }),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
})

const changePasswordValidation = z.object({
  body: z.object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required!',
    }),
  })
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  })
});

export const UserValidations = {
  createUserValidation,
  loginUserValidation,
  changePasswordValidation,
  resetPasswordValidationSchema,
  forgetPasswordValidationSchema,
  refreshTokenValidationSchema,
  updateUserValidation
}