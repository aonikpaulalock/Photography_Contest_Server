import { Router } from "express";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";
import { BlogCommentValidations } from "./blogComment.validation";
import { BlogCommentControllers } from "./blogComment.controller";

const router = Router();
router
  //! Create Contest
  .post(
    "/",
    ValidationRequestSchema(BlogCommentValidations.createBlogCommentValidation),
    BlogCommentControllers.createBlogCommentFromDB
  )
  .get("/:blogId",
    BlogCommentControllers.getBlogCommentsFromDB
  )
  .get("/total-comment/:blogId",
    BlogCommentControllers.getTotalBlogCommentFromDB
  );

export const BlogCommentRouter = router;