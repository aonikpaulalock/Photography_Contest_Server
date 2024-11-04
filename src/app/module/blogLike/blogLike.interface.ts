import { Types } from "mongoose";

export interface TBlogLike{
  userId: Types.ObjectId;
  blogId: Types.ObjectId;
}