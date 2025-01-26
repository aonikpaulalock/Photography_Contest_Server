"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const router = (0, express_1.Router)();
router
    //! Create Contest
    .post("/", (0, ValidationRequest_1.ValidationRequestSchema)(blog_validation_1.BlogValidations.createBlogValidation), blog_controller_1.BlogControllers.createBlogFromDB)
    .get("/", blog_controller_1.BlogControllers.getAllBlogFromDB)
    .get("/:blogId", blog_controller_1.BlogControllers.getSingleBlogFromDB)
    .get("/userBlog/:userId", blog_controller_1.BlogControllers.getUserBlogFromDB)
    .delete("/:blogId", blog_controller_1.BlogControllers.deleteBlogFromDB)
    .put("/:blogId", blog_controller_1.BlogControllers.updateBlogFromDB);
exports.BlogRouter = router;
