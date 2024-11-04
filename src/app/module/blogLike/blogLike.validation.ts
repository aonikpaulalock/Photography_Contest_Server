import { z } from "zod";


const createBlogLikeValidation = z.object({
  body: z.object({
    userId: z.string(),
    blogId: z.string(),
  })
})

export const BlogLikeValidations = {
  createBlogLikeValidation,
}