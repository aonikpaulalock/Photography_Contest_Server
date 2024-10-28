/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { ResponseSend } from "../../../utils/ResponseSend"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { SubmissionServices } from "./sumission.service"
import { JwtPayload } from "jsonwebtoken"

const createSubmissionFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await SubmissionServices.createSubmissionIntoDB(req.body)
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Submission created successfully",
      data: result
    })
  }
)

const getSubmissionUsersFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const { role, userId } = req.user as JwtPayload;
    const result = await SubmissionServices.getSubmissionUsersIntoDB(role, userId, req.query)
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Contest retrieved successfully",
      meta: result?.meta,
      data: result?.result,
    }
    )
  }
)

export const SubmissionControllers = {
  createSubmissionFromDB,
  getSubmissionUsersFromDB
}