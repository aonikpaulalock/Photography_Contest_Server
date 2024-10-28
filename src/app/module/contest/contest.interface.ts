import { Types } from "mongoose";

export interface TContest {
  _id: string;
  title: string;
  userId: Types.ObjectId;
  prize: string;
  status: string;
  paymentStatus: string;
  tags: string[];
  requirements: string;
  deadline: string;
  participantsID?: Types.ObjectId[]
  winnerId: string;
  createAt: Date;
  updatedAt: Date;
}