import { Types } from "mongoose";

export interface TSubmission {
  _id: string;
  userId: Types.ObjectId;
  contestId: Types.ObjectId;
  images: string[];
  isWinner: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface SubmissionPayload extends TSubmission {
  participationId: string; 
}