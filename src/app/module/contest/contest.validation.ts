import { z } from "zod";
import { contestStatus } from "./contest.constant";
import { paymentStatus } from "../payment/payment.constant";


const createContestValidation = z.object({
  body: z.object({
    title: z.string(),
    userId: z.string(),
    prize: z.string(),
    status: z.enum([...contestStatus] as [string, ...string[]]).default("granted"),
    paymentStatus: z.enum([...paymentStatus] as [string, ...string[]]).default("UNPAID"),
    tags: z.array(z.string()),
    requirements: z.string(),
    deadline: z.string(),
    participantsID: z.array(z.string()).optional(),
    winnerId: z.string().optional(),
  })
})

export const ContestValidations = {
  createContestValidation,
}