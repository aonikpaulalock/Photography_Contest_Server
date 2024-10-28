import mongoose from "mongoose";
import { TParticipation } from "./participation.interface";
import { Participation } from "./participation.model";
import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import Contest from "../contest/contest.model";

const createParticipationIntoDB = async (
  payload: TParticipation
) => {
  const { contestId, userId } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //! Check if the user has already participated in this contest
    const existingParticipation = await Participation.findOne({ contestId, userId });

    if (existingParticipation) {
      throw new AppError(httpStatus.CONFLICT, "User has already participated in this contest.")
    }

    const createParticipation = await Participation.create([payload], { session })

    if (!createParticipation) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create participation'
      );
    }

    //! Update contest with the participant ID within the transaction
    const updatedContest = await Contest.findByIdAndUpdate(
      contestId,
      { $addToSet: { participantsID: userId } },
      { session, new: true }
    );

    if (!updatedContest) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update contest participation'
      );
    }
    await session.commitTransaction();
    session.endSession();
    return createParticipation


  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      (err as Error).message || 'Failed to create contest participation'
    );
  }
}

export const ParticipationServices = {
  createParticipationIntoDB
}