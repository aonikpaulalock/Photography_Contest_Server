import httpStatus from "http-status";
import AppError from "../../../utils/AppError"
import { sslServices } from "../ssl/ssl.service"
import Payment from "./payment.model";
import Contest from "../contest/contest.model";
import { User } from "../Auth/auth.model";
import { generateTransactionId } from "./payment.utils";
import mongoose from "mongoose";


const paymentInitIntoDB = async (
  contestId: string,
  winnerId: string
) => {

  const contest = await Contest.findById(contestId);

  if (!contest) {
    throw new AppError(httpStatus.NOT_FOUND, 'Contest not found');
  };

  const participant = await User.findOne({
    _id: winnerId
  });

  if (!participant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Winner not found');
  }


  //! পেমেন্ট তথ্য তৈরি করুন
  const paymentInfo = {
    contestId: contest._id,
    winnerId: winnerId,
    amount: contest.prize,
    transactionId: generateTransactionId(),
  };

  //! Payment ডেটাবেসে নতুন রেকর্ড তৈরি করুন
  const newPayment = new Payment(paymentInfo);
  await newPayment.save();

  // SSL পেমেন্ট ইনিশিয়ালাইজ করুন
  const paymentObj = {
    amount: newPayment.amount,
    transactionId: newPayment.transactionId,
    username: participant.username,
    email: participant.email,
    country: participant.country,
  };

  const result = await sslServices.initPayment(paymentObj);
  return {
    paymentUrl: result.GatewayPageURL,
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePaymentIntoDB = async (payload: any) => {

  //  const response = await sslServices.vaildatePayment(payload);
  //  console.log("SSL Payment Validation Response:", response); 
  //  if (response.status !== "VALID") {
  //    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
  //  }
  const response = payload

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const paymentInfo = await Payment.findOneAndUpdate(
      { transactionId: response.tran_id },
      {
        status: 'PAID',
        paymentGatewayData: response
      },
      { new: true, session }
    );

    if (!paymentInfo) {
      throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
    }

    await Contest.findByIdAndUpdate(
      paymentInfo.contestId,
      {
        winnerId: paymentInfo.winnerId,
        paymentStatus: 'PAID',
        status: 'finished'
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Payment validated successfully!",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
  }
}

export const PaymentServices = {
  paymentInitIntoDB,
  validatePaymentIntoDB
}