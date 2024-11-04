import { Types } from "mongoose";

export interface TBlog {
  title: string;
  content: string;
  userId: Types.ObjectId;
  blogPhoto?: string;
  tags: string[];
}