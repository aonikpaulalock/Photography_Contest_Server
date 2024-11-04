import { Types } from "mongoose";

export interface TContest {
  title: string;
  userId: Types.ObjectId;
  prize: string;
  status: string;
  paymentStatus: string;
  tags: string[];
  requirements: string;
  deadline: string;
  participantsID?: Types.ObjectId[];
  winnerId: string;
}