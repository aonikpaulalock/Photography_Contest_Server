/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { ResponseSend } from "../../../utils/ResponseSend"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { ContestServices } from "./contest.service"
import { JwtPayload } from "jsonwebtoken"

const createContestFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await ContestServices.createContestIntoDB(req.body)
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Contest created successfully",
      data: result
    })
  }
)


const getSingleContestFromDB = CatchAsyncPromise(async (req, res, next) => {
  const { contestId } = req.params;
  const result = await ContestServices.getSingleContestIntoDB(contestId);
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contest retrive successfully",
    data: result,
  });
});

const updateContestFromDB = CatchAsyncPromise(async (req, res, next) => {
  const { role, userId } = req.user as JwtPayload;
  const { contestId } = req.params;
  const result = await ContestServices.updateContestIntoDB(role, userId, contestId, req.body);
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contest updated successfully",
    data: result,
  });
});

const deleteContestFromDB = CatchAsyncPromise(async (req, res, next) => {
  const { role, userId } = req.user as JwtPayload;
  const { id } = req.params;
  await ContestServices.deleteContestIntoDB(role, userId, id);
  ResponseSend(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: "Contest deleted successfully",
    data: null,
  });
});

const getAllContestsFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const { role, userId } = req.user as JwtPayload;
    const result = await ContestServices.getAllContestsIntoDB(role, userId, req.query)
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

const getContestsParticipationFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const { id } = req.params;
    const result = await ContestServices.getContestsParticipationIntoDB(id)
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Contest participation retrieved successfully",
      data: result
    }
    )
  }
)

export const ContestControllers = {
  createContestFromDB,
  getSingleContestFromDB,
  getAllContestsFromDB,
  getContestsParticipationFromDB,
  updateContestFromDB,
  deleteContestFromDB
}