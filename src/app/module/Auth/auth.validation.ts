import { z } from "zod";
import { userRole, UserStatus } from "./auth.constant";

const passwordValidationSchema = z.string()
  .refine((password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password)
  }, {
    message: "must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit"
  })


const createUserValidation = z.object({
  body: z.object({
    username: z.string(),
    email: z.string(),
    password: passwordValidationSchema,
    // needsPasswordChange: z.boolean(),
    role: z.enum([...userRole] as [string, ...string[]]),
    isDeleted: z.boolean(),
    status: z.enum([...UserStatus] as [string, ...string[]]),
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
    password: passwordValidationSchema,
  }),
})

const changePasswordValidation = z.object({
  body: z.object({
    currentPassword: passwordValidationSchema,
    newPassword: passwordValidationSchema,
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