import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchableFields } from "./blog.constant";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result
}

const getAllBlogIntoDB = async (
  query: Record<string, unknown>
) => {
  const BlogQuery = new QueryBuilder(
    Blog.find().populate("userId"),
    query
  )
    .search(blogSearchableFields)
    .paginate();
  const result = await BlogQuery.modelQuery;
  const meta = await BlogQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleBlogIntoDB = async (userId: string) => {
  const result = await Blog.find({ userId })
    .populate("userId")
    .sort({ createdAt: -1 });
  return result;
};

const deleteBlogIntoDB = async (blogId: string) => {
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};
const updateBlogIntoDB = async (
  blogId: string,
  post: Partial<TBlog>
) => {
  const result = await Blog.findByIdAndUpdate(
    blogId,
    post,
    { new: true }
  );
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogIntoDB,
  getSingleBlogIntoDB,
  deleteBlogIntoDB,
  updateBlogIntoDB
}