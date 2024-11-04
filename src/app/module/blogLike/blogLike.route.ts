import { Router } from "express";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";
import { BlogLikeValidations } from "./blogLike.validation";
import { BlogLikeControllers } from "./blogLike.controller";

const router = Router();
router
  //! Create Contest
  .post(
    "/",
    ValidationRequestSchema(BlogLikeValidations.createBlogLikeValidation),
    BlogLikeControllers.createBlogLikeFromDB
  )
  .get("/:blogId",
    BlogLikeControllers.getTotalBlogLikeFromDB
  )
  .get("/check/:userId",
    BlogLikeControllers.checkBlogLikeFromDB
  )
  .delete("/dislike/:blogId/:userId",
    BlogLikeControllers.dislikeBlogFromDB
  );
export const BlogLikeRouter = router;