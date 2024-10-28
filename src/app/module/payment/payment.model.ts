import mongoose, { Schema } from 'mongoose';
import { paymentStatus } from './payment.constant';
import { TPayment } from './payment.interface';

const PaymentSchema: Schema = new mongoose.Schema({
  winnerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contestId: {
    type: Schema.Types.ObjectId,
    ref: 'Contest',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: paymentStatus,
    default: 'UNPAID'
  },
  paymentGatewayData: {
    type: Object,
    default: null
  },
}, {
  timestamps: true,
});

const Payment = mongoose.model<TPayment>('Payment', PaymentSchema);

export default Payment;