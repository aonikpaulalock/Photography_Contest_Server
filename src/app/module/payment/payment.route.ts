import express from 'express';
import { paymentControllers } from './payment.controller';
const router = express.Router()

router
  .post(
    "/init/:contestId/:userId",
    paymentControllers.paymentInitFromDB
  )
  .get(
    "/validate",
    paymentControllers.validatePaymentFromDB
  )


export const PaymentRouter = router