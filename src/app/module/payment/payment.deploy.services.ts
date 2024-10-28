// import httpStatus from "http-status";
// import AppError from "../../../utils/AppError"
// import { sslServices } from "../ssl/ssl.service"
// import Payment from "./payment.model";
// import Contest from "../contest/contest.model";
// import { User } from "../Auth/auth.model";
// import { generateTransactionId } from "./payment.utils";
// import mongoose from "mongoose";


// const paymentInitIntoDB = async (
//   contestId: string,
//   winnerId: string
// ) => {

//   const contest = await Contest.findById(contestId);

//   if (!contest) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Contest not found');
//   }

//   const participant = await User.findById({
//     _id: winnerId
//   });

//   if (!participant) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Winner not found');
//   }

//   //! Transaction ID Generate kora hocche
//   const transactionId = generateTransactionId();

//   //! SSL Payment init er jonne paymentObj toiri kora hocche
//   const paymentObj = {
//     amount: Number(contest.prize),
//     transactionId: transactionId,
//     username: participant.username,
//     email: participant.email,
//     country: participant.country,
//   };

//   // SSL e request pathano hocche
//   const result = await sslServices.initPayment(paymentObj);

//   if (!result.GatewayPageURL) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'SSL Payment initialization failed');
//   }

//   return {
//     paymentUrl: result.GatewayPageURL,
//     transactionId: transactionId,
//   };
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const validatePaymentIntoDB = async (payload: any) => {
//   const response = await sslServices.vaildatePayment(payload);

//   // SSL theke status "VALID" pailey matro entry create kora hocche
//   if (response.status === "VALID") {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       const paymentInfo = new Payment({
//         contestId: payload.contestId,
//         winnerId: payload.winnerId,
//         amount: payload.amount,
//         transactionId: response.tran_id,
//         status: "PAID",
//         paymentGatewayData: response,
//       });

//       await paymentInfo.save({ session });

//       await Contest.findByIdAndUpdate(
//         paymentInfo.contestId,
//         {
//           winnerId: paymentInfo.winnerId,
//           paymentStatus: "PAID",
//           status: "finished",
//         },
//         { session }
//       );

//       await session.commitTransaction();
//       session.endSession();

//       return {
//         message: "Payment validated and saved successfully!",
//       };
//     } catch (error) {
//       await session.abortTransaction();
//       session.endSession();
//       throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
//     }
//   } else {
//     throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
//   }
// }

// export const PaymentServices = {
//   paymentInitIntoDB,
//   validatePaymentIntoDB
// }