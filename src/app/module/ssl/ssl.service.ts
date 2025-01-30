import axios from "axios";
import config from "../../config";
import AppError from "../../../utils/AppError";
import httpStatus from "http-status";
import { TPaymentInit } from "../payment/payment.interface";
import https from "https";
const initPayment = async (paymentInfo: TPaymentInit) => {
  try {
    const data = {
      store_id: config.store_id,
      store_passwd: config.store_pass,
      total_amount: paymentInfo.amount,
      currency: 'BDT',
      tran_id: paymentInfo.transactionId,
      success_url: config.success_url,
      fail_url: config.fail_url,
      cancel_url: config.cancel_url,
      ipn_url: config.ipn_url,
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

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await axios({
      method: "post",
      url: config.transaction_api,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      httpsAgent: agent,
    })
    return response.data
  }
  catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid Payment"
    )
  }

}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vaildatePayment = async (payload: any) => {
  try {
    if (!payload || !payload.status || !(payload.status === "VALID")) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Payment Failed"
      )
    }

    const response = await axios({
      method: "GET",
      url: `${config.validate_api}?val_id=${payload.val_id}&store_id=${config.store_id}&store_passwd=${config.store_pass}&format=json`
    })

    return response?.data
    
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Payment Failed"
    )
  }

}




export const sslServices = {
  initPayment,
  vaildatePayment
}