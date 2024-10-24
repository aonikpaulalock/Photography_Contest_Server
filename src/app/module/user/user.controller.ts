/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { ServicesUsers } from "./user.service"
import { ResponseSend } from "../../../utils/ResponseSend"
import { JwtPayload } from "jsonwebtoken"

const getAllUserFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await ServicesUsers.getAllUserIntoDB(req.query)
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      meta: result.meta,
      data: result.result,
    }
    )
  }
)

const getMeFromDB = CatchAsyncPromise(async (req, res) => {

  const { userId, role } = req.user as JwtPayload;

  const result = await ServicesUsers.getMeIntoDB(userId, role);

  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const changeStatusFromDB = CatchAsyncPromise(async (req, res) => {
  const id = req.params.id;
  const result = await ServicesUsers.changeStatusIntoDB(id, req.body);

  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status is updated successfully",
    data: result,
  });
});

const updateUserFromDB = CatchAsyncPromise(async (req, res) => {
  const { userId } = req.user as JwtPayload;
  const { id } = req.params;
  const result = await ServicesUsers.updateUserIntoDB(id, req.body, userId);

  ResponseSend(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});


export const ControllersUsers = {
  getAllUserFromDB,
  getMeFromDB,
  changeStatusFromDB,
  updateUserFromDB
}