import mongoose, { Schema } from 'mongoose';
import { TContest } from './contest.interface';
import { contestStatus } from './contest.constant';
import { paymentStatus } from '../payment/payment.constant';

const ContestSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prize: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: contestStatus,
    default: "granted"
  },
  paymentStatus: {
    type: String,
    enum: paymentStatus,
    default: "UNPAID"
  },
  tags: {
    type: [String],
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  participantsID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  winnerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
}, {
  timestamps: true,
});

const Contest = mongoose.model<TContest>('Contest', ContestSchema);

export default Contest;