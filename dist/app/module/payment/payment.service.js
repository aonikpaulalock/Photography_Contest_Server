"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const ssl_service_1 = require("../ssl/ssl.service");
const payment_model_1 = __importDefault(require("./payment.model"));
const contest_model_1 = __importDefault(require("../contest/contest.model"));
const auth_model_1 = require("../Auth/auth.model");
const payment_utils_1 = require("./payment.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const participation_model_1 = require("../participation/participation.model");
const sumission_model_1 = require("../submission/sumission.model");
const paymentInitIntoDB = (contestId, winnerId) => __awaiter(void 0, void 0, void 0, function* () {
    const contest = yield contest_model_1.default.findById(contestId);
    if (!contest) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Contest not found');
    }
    ;
    const participant = yield auth_model_1.User.findOne({
        _id: winnerId
    });
    if (!participant) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Winner not found');
    }
    //! পেমেন্ট তথ্য তৈরি করুন
    const paymentInfo = {
        contestId: contest._id,
        winnerId: winnerId,
        amount: contest.prize,
        transactionId: (0, payment_utils_1.generateTransactionId)(),
    };
    //! Payment ডেটাবেসে নতুন রেকর্ড তৈরি করুন
    const newPayment = yield payment_model_1.default.create(paymentInfo);
    // SSL পেমেন্ট ইনিশিয়ালাইজ করুন
    const paymentObj = {
        amount: newPayment.amount,
        transactionId: newPayment.transactionId,
        username: participant.username,
        email: participant.email,
        country: participant.country,
    };
    const result = yield ssl_service_1.sslServices.initPayment(paymentObj);
    return {
        paymentUrl: result === null || result === void 0 ? void 0 : result.GatewayPageURL,
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePaymentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  const response = await sslServices.vaildatePayment(payload);
    //  console.log("SSL Payment Validation Response:", response); 
    //  if (response.status !== "VALID") {
    //    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
    //  }
    const response = payload;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const paymentInfo = yield payment_model_1.default.findOneAndUpdate({ transactionId: response.tran_id }, {
            status: 'PAID',
            paymentGatewayData: response
        }, { new: true, session });
        if (!paymentInfo) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Payment not found");
        }
        yield contest_model_1.default.findByIdAndUpdate(paymentInfo.contestId, {
            winnerId: paymentInfo.winnerId,
            paymentStatus: 'PAID',
            status: 'finished'
        }, { session });
        // Update the Submission isWinner field
        yield sumission_model_1.Submission.findOneAndUpdate({
            userId: paymentInfo.winnerId,
            contestId: paymentInfo.contestId
        }, {
            isWinner: true
        }, { new: true, session });
        // Update the Participation isWinner field
        yield participation_model_1.Participation.findOneAndUpdate({
            userId: paymentInfo.winnerId,
            contestId: paymentInfo.contestId
        }, {
            isWinner: true
        }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Payment validated successfully!",
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Internal server error");
    }
});
exports.PaymentServices = {
    paymentInitIntoDB,
    validatePaymentIntoDB
};
