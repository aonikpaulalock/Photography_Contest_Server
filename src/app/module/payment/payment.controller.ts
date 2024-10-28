import httpStatus from "http-status";
import { ResponseSend } from "../../../utils/ResponseSend";
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise";
import { PaymentServices } from "./payment.service";

const paymentInitFromDB = CatchAsyncPromise(async (req, res) => {
  const { contestId, userId } = req.params;
  const result = await PaymentServices.paymentInitIntoDB(contestId, userId);
  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment initilation successfully!',
    data: result,
  });
});

const validatePaymentFromDB = CatchAsyncPromise(async (req, res) => {
  const result = await PaymentServices.validatePaymentIntoDB(req.query);
  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment validation successfully!',
    data: result,
  });
});

export const paymentControllers = {
  paymentInitFromDB,
  validatePaymentFromDB
}