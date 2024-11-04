import { z } from "zod";


const createBlogCommentValidation = z.object({
  body: z.object({
    userId: z.string(),
    blogId: z.string(),
    content: z.string(),
  })
})

export const BlogCommentValidations = {
  createBlogCommentValidation,
}