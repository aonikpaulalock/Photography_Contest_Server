import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';


const BlogSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  blogPhoto: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', required: true
  },
  tags: [{ type: String }],
}, {
  timestamps: true,
});

const Blog = mongoose.model<TBlog>('Blog', BlogSchema);

export default Blog;