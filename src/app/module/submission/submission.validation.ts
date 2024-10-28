import { z } from "zod";


const createSubmissionValidation = z.object({
  body: z.object({
    userId: z.string(),
    contestId: z.string(),
    images: z.array(z.string()).min(1, "At least one image is required"),
    isWinner: z.boolean().default(false),
  })
})

export const SubmissionValidations = {
  createSubmissionValidation,
}