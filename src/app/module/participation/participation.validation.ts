import { z } from "zod";


const createParticipationValidation = z.object({
  body: z.object({
    userId: z.string(),
    contestId: z.string(),
    submissionId:z.string().optional(),
    isWinner: z.boolean().default(false),
  })
})

export const ParticipationValidations = {
  createParticipationValidation,
}