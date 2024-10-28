import { Types } from "mongoose";


export interface TParticipation {
  _id: string;
  userId: Types.ObjectId;
  contestId: Types.ObjectId;
  submissionId?: Types.ObjectId;
  isWinner: boolean;
  createdAt: Date;
  updatedAt: Date;
}