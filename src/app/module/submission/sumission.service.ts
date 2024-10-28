// export const submitEntry = async (req: Request, res: Response) => {
//   try {
//     const submission = new Submission(req.body);
//     await submission.save();

//     // Update participation with submission ID
//     await Participation.findByIdAndUpdate(req.body.participationId, {
//       submissionId: submission._id,
//     });

//     res.status(201).json(submission);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import { SubmissionPayload } from "./submission.interface";
import mongoose from "mongoose";
import { Submission } from "./sumission.model";
import { Participation } from "../participation/participation.model";
import QueryBuilder from "../../builder/QueryBuilder";
const createSubmissionIntoDB = async (
  payload: SubmissionPayload
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const existingSubmission = await Submission.findOne({
      userId: payload.userId,
      contestId: payload.contestId,
    });

    if (existingSubmission) {
      throw new AppError(
        httpStatus.CONFLICT,
        "A submission already exists for this contest by this participant"
      );
    }

    const createSubmission = await Submission.create([payload], { session })

    if (!createSubmission) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create Submission'
      );
    }

    //! Update contest with the participant ID within the transaction
    const updatedContest = await Participation.findByIdAndUpdate(
      payload.participationId,
      {
        submissionId: createSubmission[0]._id
      },
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
    return createSubmission[0];


  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      (err as Error).message || 'Failed to Submission'
    );
  }
}

const getSubmissionUsersIntoDB = async (
  role: string,
  userId: string,
  query: Record<string, unknown>
) => {
  if (role === "user") {
    const userQuery = new QueryBuilder(
      Submission.find({ userId }).lean(),
      query
    ).fields().paginate()

    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();
    return {
      result,
      meta,
    }
  } else if (role === "admin" || role === "contestHolder") {
    const contestId = query.contestId as string;

    const adminQuery = new QueryBuilder(
      Submission.find({ contestId })
        .populate("userId", "username email")
        .lean(),
      query
    ).fields().paginate();

    const result = await adminQuery.modelQuery;
    const meta = await adminQuery.countTotal();
    return {
      result,
      meta,
    };
  }
}


export const SubmissionServices = {
  createSubmissionIntoDB,
  getSubmissionUsersIntoDB
}