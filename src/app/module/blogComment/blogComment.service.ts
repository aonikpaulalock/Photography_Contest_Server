import { TBlogComment } from "./blogComment.interface";
import BlogComment from "./blogComment.model";


const createBlogCommentIntoDB = async (payload: TBlogComment) => {
  const result = await BlogComment.create(payload);
  return result
}

const getBlogCommentsIntoDB = async (blogId: string) => {
  const result = await BlogComment.find({ blogId })
    .populate("blogId userId");
  return result;
};

const getTotalBlogCommentFromDB = async (blogId: string) => {
  const result = await BlogComment.countDocuments({ blogId });
  return result;
};


export const BlogCommentServices = {
  createBlogCommentIntoDB,
  getBlogCommentsIntoDB,
  getTotalBlogCommentFromDB
}