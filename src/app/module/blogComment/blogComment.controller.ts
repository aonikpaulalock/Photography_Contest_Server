/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { ResponseSend } from "../../../utils/ResponseSend"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { BlogCommentServices } from "./blogComment.service"

const createBlogCommentFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await BlogCommentServices.createBlogCommentIntoDB(req.body)
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Blog comment created successfully",
      data: result
    })
  }
)

const getBlogCommentsFromDB = CatchAsyncPromise(async (req, res) => {
  const blogId = req.params.blogId;
  const result = await BlogCommentServices.getBlogCommentsIntoDB(blogId);
  //   send response
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog comments retrieved successfully",
    data: result,
  });
});

const getTotalBlogCommentFromDB = CatchAsyncPromise(async (req, res) => {
  const blogId = req.params.blogId;
  const result = await BlogCommentServices.getTotalBlogCommentFromDB(blogId);
  //   send response
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Total blog comment retrieved successfully",
    data: result,
  });
});


export const BlogCommentControllers = {
  createBlogCommentFromDB,
  getBlogCommentsFromDB,
  getTotalBlogCommentFromDB
}