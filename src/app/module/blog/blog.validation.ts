import { z } from "zod";


const createBlogValidation = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    blogPhoto: z.string().optional(),
    userId: z.string(),
    tags: z.array(z.string()).optional(),
  })
})

export const BlogValidations = {
  createBlogValidation,
}