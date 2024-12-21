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

const updateSubmissionFromDB = CatchAsyncPromise(async (req, res) => {
  const { submissionId } = req.params;
  const result = await SubmissionServices.updateSubmissionIntoDB(submissionId, req.body);
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Submission updated successfully",
    data: result,
  });
});

const deleteSubmissionFromDB = CatchAsyncPromise(async (req, res) => {
  const { submissionId } = req.params;
  const result = await SubmissionServices.deleteSubmissionIntoDB(submissionId)
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Submission deleted successfully",
    data: result,
  });
});


const getSingleSubmissionFromDB = CatchAsyncPromise(async (req, res) => {
  const { submissionId } = req.params;
  const result = await SubmissionServices.getSingleSubmissionIntoDB
    (submissionId)
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single submission are retrive successfully",
    data: result,
  });
});

const getSubmissionUsersFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const { userId } = req.user as JwtPayload;
    const result = await SubmissionServices.getSubmissionUsersIntoDB(userId, req.query)
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User submission are retrieved successfully !",
      meta: result?.meta,
      data: result?.result,
    }
    )
  }
)
const getSubmissionContestHolderAndAdminFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const { userId } = req.user as JwtPayload;
    const result = await SubmissionServices.getSubmissionContestHolderAndAdminIntoDB(userId, req.query)
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "ContestHolder submission are retrieved successfully !",
      meta: result?.meta,
      data: result?.result,
    }
    )
  }
)

const getManageSubmissionFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await SubmissionServices.getManageSubmissionIntoDB(req.query)
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Manage submission are retrieved successfully !",
      meta: result?.meta,
      data: result?.result,
    }
    )
  }
)
const getSubmissionsByContestIdFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const { contestId } = req.params;
    const result = await SubmissionServices.getSubmissionsByContestIdIntoDB(contestId, req.query)
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Contest submission are retrieved successfully !",
      meta: result?.meta,
      data: result?.result,
    }
    )
  }
)

export const SubmissionControllers = {
  createSubmissionFromDB,
  updateSubmissionFromDB,
  deleteSubmissionFromDB,
  getSingleSubmissionFromDB,
  getSubmissionUsersFromDB,
  getSubmissionContestHolderAndAdminFromDB,
  getManageSubmissionFromDB,
  getSubmissionsByContestIdFromDB
}