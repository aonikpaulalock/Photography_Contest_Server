import { model, Schema } from "mongoose";
import { TParticipation } from "./participation.interface";

const participationSchema = new Schema<TParticipation>({
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
  submissionId: {
    type: Schema.Types.ObjectId,
    ref: 'Submission',
  },
  isWinner: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Participation = model<TParticipation>('Participation', participationSchema);