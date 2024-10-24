import { z } from "zod";
import { UserStatus } from "../Auth/auth.constant";

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const ValidationUser = {
  changeStatusValidationSchema,
};