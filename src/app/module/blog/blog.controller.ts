/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { ResponseSend } from "../../../utils/ResponseSend"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { BlogServices } from "./blog.service"

const createBlogFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await BlogServices.createBlogIntoDB(req.body)
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Blog created successfully",
      data: result
    })
  }
)

const getAllBlogFromDB = CatchAsyncPromise(async (req, res) => {
  const result = await BlogServices.getAllBlogIntoDB(req.query);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs are retrieved successfully",
    meta: result.meta,
    data: result.result,
  })
});

const getSingleBlogFromDB = CatchAsyncPromise(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogServices.getSingleBlogIntoDB(blogId)
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single blog are retrive successfully",
    data: result,
  });
});

const getUserBlogFromDB = CatchAsyncPromise(async (req, res) => {
  const { userId } = req.params;
  const result = await BlogServices.getUserBlogIntoDB(userId);
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User blog are retrieved successfully",
    data: result,
  });
});

const deleteBlogFromDB = CatchAsyncPromise(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogServices.deleteBlogIntoDB(blogId)
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});

const updateBlogFromDB = CatchAsyncPromise(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogServices.updateBlogIntoDB(blogId, req.body);
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});


export const BlogControllers = {
  createBlogFromDB,
  getAllBlogFromDB,
  getUserBlogFromDB,
  getSingleBlogFromDB,
  deleteBlogFromDB,
  updateBlogFromDB
}