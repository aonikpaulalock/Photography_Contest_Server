"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentRouter = void 0;
const express_1 = require("express");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const blogComment_validation_1 = require("./blogComment.validation");
const blogComment_controller_1 = require("./blogComment.controller");
const router = (0, express_1.Router)();
router
    //! Create Contest
    .post("/", (0, ValidationRequest_1.ValidationRequestSchema)(blogComment_validation_1.BlogCommentValidations.createBlogCommentValidation), blogComment_controller_1.BlogCommentControllers.createBlogCommentFromDB)
    .get("/:blogId", blogComment_controller_1.BlogCommentControllers.getBlogCommentsFromDB)
    .get("/total-comment/:blogId", blogComment_controller_1.BlogCommentControllers.getTotalBlogCommentFromDB);
exports.BlogCommentRouter = router;
