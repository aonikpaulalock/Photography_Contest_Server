"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogLikeRouter = void 0;
const express_1 = require("express");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const blogLike_validation_1 = require("./blogLike.validation");
const blogLike_controller_1 = require("./blogLike.controller");
const router = (0, express_1.Router)();
router
    //! Create Contest
    .post("/create-like", (0, ValidationRequest_1.ValidationRequestSchema)(blogLike_validation_1.BlogLikeValidations.createBlogLikeValidation), blogLike_controller_1.BlogLikeControllers.createBlogLikeFromDB)
    .get("/total-like/:blogId", blogLike_controller_1.BlogLikeControllers.getTotalBlogLikeFromDB)
    .get("/check-like/:userId", blogLike_controller_1.BlogLikeControllers.checkBlogLikeFromDB)
    .delete("/dislike/:blogId/:userId", blogLike_controller_1.BlogLikeControllers.dislikeBlogFromDB);
exports.BlogLikeRouter = router;
