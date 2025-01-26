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
exports.sslServices = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const https_1 = __importDefault(require("https"));
const initPayment = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: config_1.default.store_id,
            store_passwd: config_1.default.store_pass,
            total_amount: paymentInfo.amount,
            currency: 'BDT',
            tran_id: paymentInfo.transactionId,
            success_url: config_1.default.success_url,
            fail_url: config_1.default.fail_url,
            cancel_url: config_1.default.cancel_url,
            ipn_url: config_1.default.ipn_url,
            shipping_method: 'N/A',
            product_name: 'N/A',
            product_category: 'N/A',
            product_profile: 'N/A',
            cus_name: paymentInfo.username,
            cus_email: paymentInfo.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: 'N/A',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const agent = new https_1.default.Agent({
            rejectUnauthorized: false,
        });
        const response = yield (0, axios_1.default)({
            method: "post",
            url: config_1.default.transaction_api,
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            httpsAgent: agent,
        });
        return response.data;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid Payment");
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vaildatePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!payload || !payload.status || !(payload.status === "VALID")) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Payment Failed");
        }
        const response = yield (0, axios_1.default)({
            method: "GET",
            url: `${config_1.default.validate_api}?val_id=${payload.val_id}&store_id=${config_1.default.store_id}&store_passwd=${config_1.default.store_pass}&format=json`
        });
        return response.data;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Payment Failed");
    }
});
exports.sslServices = {
    initPayment,
    vaildatePayment
};
