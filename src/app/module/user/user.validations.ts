import { z } from "zod";
import { UserStatus } from "../Auth/auth.constant";

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

const updateUserRoleValidation = z.object({
  body: z.object({
    role: z.enum(['admin', 'contestHolder']),
  }),
});


export const ValidationUser = {
  changeStatusValidationSchema,
  updateUserRoleValidation
};