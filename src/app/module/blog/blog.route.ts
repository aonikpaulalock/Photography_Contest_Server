import { Router } from "express";
import { BlogControllers } from "./blog.controller";
import { BlogValidations } from "./blog.validation";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";

const router = Router();
router
  //! Create Contest
  .post(
    "/",
    ValidationRequestSchema(BlogValidations.createBlogValidation),
    BlogControllers.createBlogFromDB
  )
  .get("/",
    BlogControllers.getAllBlogFromDB
  )
  .get("/:blogId",
    BlogControllers.getSingleBlogFromDB
  )
  .get("/userBlog/:userId",
    BlogControllers.getUserBlogFromDB
  )
  .delete("/:blogId",
    BlogControllers.deleteBlogFromDB
  )
  .put("/:blogId",
    BlogControllers.updateBlogFromDB
  );

export const BlogRouter = router;