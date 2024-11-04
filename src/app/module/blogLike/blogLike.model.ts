import mongoose, { Schema } from 'mongoose';
import { TBlogLike } from './blogLike.interface';


const BlogLikeSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  }
}, {
  timestamps: true,
});

const BlogLike = mongoose.model<TBlogLike>('BlogLike', BlogLikeSchema);

export default BlogLike;