/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { ResponseSend } from "../../../utils/ResponseSend"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { UserServices } from "./auth.service"
import config from "../../config"

const createUser = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await UserServices.createUserIntoDB(req.body)
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: result
    })
  }
)
const loginUser = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await UserServices.loginUserIntoDB(req.body)
    const { refreshToken, accessToken, user } = result;

    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
    });
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successful",
      data: {
        accessToken
      }
    })
  }
)

const changePassword = CatchAsyncPromise(
  async (req, res, next) => {
    const userId = req.user?.userId
    const result = await UserServices.changePasswordIntoDB(userId, req.body)

    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password changed successfully",
      data: result
    })
  }
)

const refreshToken = CatchAsyncPromise(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserServices.refreshTokenIntoDB(refreshToken);

  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = CatchAsyncPromise(async (req, res) => {
  const userEmail = req.body.email;
  const result = await UserServices.forgetPasswordIntoDB(userEmail);
  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

const resetPassword = CatchAsyncPromise(async (req, res) => {
  const token = (req?.headers?.authorization) as string;

  const result = await UserServices.resetPasswordIntoDB(req.body, token);
  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesful!',
    data: result,
  });
});



export const UserControllers = {
  createUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}