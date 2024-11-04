import mongoose, { Schema } from 'mongoose';
import { TBlogComment } from './blogComment.interface';


const BlogCommentSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const BlogComment = mongoose.model<TBlogComment>('BlogComment', BlogCommentSchema);

export default BlogComment;