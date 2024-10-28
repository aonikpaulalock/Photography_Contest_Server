import { model, Schema } from "mongoose";
import { TSubmission } from "./submission.interface";

const submissionSchema = new Schema<TSubmission>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contestId: {
    type: Schema.Types.ObjectId,
    ref: 'Contest',
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  isWinner: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Submission = model<TSubmission>('Submission', submissionSchema);