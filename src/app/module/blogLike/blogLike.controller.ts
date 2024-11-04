/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { ResponseSend } from "../../../utils/ResponseSend"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { BlogLikeServices } from "./blogLike.service"

const createBlogLikeFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await BlogLikeServices.createBlogLikeIntoDB(req.body)
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Blog like created successfully",
      data: result
    })
  }
)

const getTotalBlogLikeFromDB = CatchAsyncPromise(async (req, res) => {
  const blogId = req.params.blogId;
  const result = await BlogLikeServices.getTotalBlogLikeIntoDB(blogId);
  //   send response
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Total like are retrieved successfully",
    data: result,
  });
});

const checkBlogLikeFromDB = CatchAsyncPromise(async (req, res) => {
  const { userId } = req.params;
  const result = await BlogLikeServices.checkBlogLikeIntoDB(userId);
  //   send response
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Retrieved user liked blogs",
    data: result,
  });
});

const dislikeBlogFromDB = CatchAsyncPromise(async (req, res) => {
  const { blogId, userId } = req.params;
  const result = await BlogLikeServices.dislikeBlogIntoDB(blogId, userId);

  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dislike blog successfully",
    data: result,
  });
});

export const BlogLikeControllers = {
  createBlogLikeFromDB,
  getTotalBlogLikeFromDB,
  checkBlogLikeFromDB,
  dislikeBlogFromDB
}