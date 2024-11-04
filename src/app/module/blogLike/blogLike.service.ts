import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import { TBlogLike } from "./blogLike.interface";
import BlogLike from "./blogLike.model";



const createBlogLikeIntoDB = async (payload: TBlogLike) => {
  const result = await BlogLike.create(payload);
  return result
}


const getTotalBlogLikeIntoDB = async (blogId: string) => {
  const result = await BlogLike.countDocuments({ blogId });
  return result;
};

const checkBlogLikeIntoDB = async (userId: string) => {
  const likedBlogs = await BlogLike.find({ userId });
  return likedBlogs.map((blog) => blog.blogId);
};


const dislikeBlogIntoDB = async (blogId: string, userId: string) => {
  const existingLike = await BlogLike.findOne({ blogId, userId });
  if (!existingLike) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Blog user not found"
    );
  }
  const result = await BlogLike.deleteOne({ blogId, userId });
  return result;
};


export const BlogLikeServices = {
  createBlogLikeIntoDB,
  getTotalBlogLikeIntoDB,
  checkBlogLikeIntoDB,
  dislikeBlogIntoDB
}