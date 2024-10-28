import { Types } from "mongoose";

export interface TPayment {
  winnerId: Types.ObjectId;
  contestId: Types.ObjectId;
  amount: number;
  transactionId: string;
  status: string[];
  paymentGatewayData?: object | null;
}

export type TPaymentInit = {
  amount: number | undefined,
  transactionId: string | undefined,
  username: string,
  email: string,
  country: string
}