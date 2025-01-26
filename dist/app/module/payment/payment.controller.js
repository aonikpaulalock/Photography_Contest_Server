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
exports.paymentControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ResponseSend_1 = require("../../../utils/ResponseSend");
const CatchAsyncPromise_1 = require("../../middleware/CatchAsyncPromise");
const payment_service_1 = require("./payment.service");
const paymentInitFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contestId, userId } = req.params;
    const result = yield payment_service_1.PaymentServices.paymentInitIntoDB(contestId, userId);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Payment initilation successfully!',
        data: result,
    });
}));
const validatePaymentFromDB = (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentServices.validatePaymentIntoDB(req.query);
    (0, ResponseSend_1.ResponseSend)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Payment validation successfully!',
        data: result,
    });
}));
exports.paymentControllers = {
    paymentInitFromDB,
    validatePaymentFromDB
};
