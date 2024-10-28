/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status"
import { ResponseSend } from "../../../utils/ResponseSend"
import { CatchAsyncPromise } from "../../middleware/CatchAsyncPromise"
import { ParticipationServices } from "./participation.service"

const createParticipationFromDB = CatchAsyncPromise(
  async (req, res, next) => {
    const result = await ParticipationServices.createParticipationIntoDB(req.body)
    ResponseSend(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Participation created successfully",
      data: result
    })
  }
)


export const ParticipationControllers = {
  createParticipationFromDB
}