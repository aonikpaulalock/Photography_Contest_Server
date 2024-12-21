import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import { SubmissionPayload } from "./submission.interface";
import mongoose from "mongoose";
import { Submission } from "./sumission.model";
import { Participation } from "../participation/participation.model";
import QueryBuilder from "../../builder/QueryBuilder";
import Contest from "../contest/contest.model";
const createSubmissionIntoDB = async (
  payload: SubmissionPayload
) => {

  // const existingSubmission = await Submission.findOne({
  //   userId: payload.userId,
  //   contestId: payload.contestId,
  // });

  // if (existingSubmission) {
  //   throw new AppError(
  //     httpStatus.CONFLICT,
  //     "A submission already exists for this contest by this participant"
  //   );
  // }

  // const result = await Submission.create(payload)
  // return result

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if submission already exists
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

    // Create submission
    const createSubmission = await Submission.create([payload], { session });
    if (!createSubmission) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create submission'
      );
    }

    // Check if user is already a participant
    const existingParticipation = await Participation.findOne({
      contestId: payload.contestId,
      userId: payload.userId,
    });

    if (!existingParticipation) {
      // Create participation if not exists
      const participationData = {
        contestId: payload.contestId,
        userId: payload.userId,
        submissionId: createSubmission[0]._id,
      };

      const createParticipation = await Participation.create([participationData], { session });
      if (!createParticipation) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to create participation'
        );
      }

      // Update contest with participant ID
      const updatedContest = await Contest.findByIdAndUpdate(
        payload.contestId,
        { $addToSet: { participantsID: payload.userId } },
        { session, new: true }
      );

      if (!updatedContest) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update contest participation'
        );
      }
    }

    // Commit transaction
    await session.commitTransaction();
    return createSubmission[0];

  } catch (err) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      (err as Error).message || 'Failed to process submission'
    );
  } finally {
    session.endSession();
  }
}

const deleteSubmissionIntoDB = async (submissionId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the submission
    const submission = await Submission.findById(submissionId).session(session);
    if (!submission) {
      throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
    }

    // Delete the participation record associated with this submission
    const deleteParticipation = await Participation.findOneAndDelete(
      { submissionId },
      { session }
    );

    if (!deleteParticipation) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete participation");
    }

    // Remove the user from the contest's participants array
    const updateContest = await Contest.findByIdAndUpdate(
      submission.contestId,
      { $pull: { participantsID: submission.userId } },
      { session, new: true }
    );

    if (!updateContest) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update contest");
    }

    // Delete the submission
    const deleteSubmission = await Submission.findByIdAndDelete(submissionId, { session });
    if (!deleteSubmission) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete submission");
    }

    // Commit transaction
    await session.commitTransaction();
    return { success: true, message: "Submission and participation deleted successfully" };

  } catch (err) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      (err as Error).message || "Failed to delete submission and participation"
    );
  } finally {
    session.endSession();
  }
};


const updateSubmissionIntoDB = async (
  submissionId: string,
  payload: Partial<SubmissionPayload>
) => {
  const result = await Submission.findByIdAndUpdate(
    submissionId,
    payload,
    { new: true }
  );
  return result;
};

const getSingleSubmissionIntoDB = async (submissionId: string) => {
  const result = await Submission.findById(submissionId);
  return result;
};

// const getSubmissionUsersIntoDB = async (
//   role: string,
//   userId: string,
//   query: Record<string, unknown>
// ) => {
//   if (role === "user") {
//     const userQuery = new QueryBuilder(
//       Submission.find({ userId })
//         .populate('contestId').lean(),
//       query
//     ).fields().paginate()

//     const result = await userQuery.modelQuery;
//     const meta = await userQuery.countTotal();
//     return {
//       result,
//       meta,
//     }
//   } else if (role === "admin" || role === "contestHolder") {
//     const contestId = query?.contestId as string;

//     const adminQuery = new QueryBuilder(
//       Submission.find({
//         contestId: contestId
//       })
//         .populate("userId", "username email")
//         .lean(),
//       query
//     ).fields().paginate();

//     const result = await adminQuery.modelQuery;
//     const meta = await adminQuery.countTotal();
//     return {
//       result,
//       meta,
//     };
//   }
// }

const getSubmissionUsersIntoDB = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const userQuery = new QueryBuilder(
    Submission.find({
      userId
    })
      .populate('contestId')
      .lean(),
    query
  ).fields().paginate();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSubmissionContestHolderAndAdminIntoDB = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const contestIds = await Contest.find({ userId });

  const contestQuery = new QueryBuilder(
    Submission.find({ contestId: { $in: contestIds } })
      .populate([
        { path: "userId", select: "username email profileImage" },
        { path: "contestId", select: "title prize deadline paymentStatus" },
      ])
      .lean(),
    query
  ).fields().paginate();

  const result = await contestQuery.modelQuery;
  const meta = await contestQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getManageSubmissionIntoDB = async (
  query: Record<string, unknown>
) => {
  const allSubmissionsQuery = new QueryBuilder(
    Submission.find().populate("userId", "username email").lean(),
    query
  ).fields().paginate();

  const result = await allSubmissionsQuery.modelQuery;
  const meta = await allSubmissionsQuery.countTotal();
  return {
    result,
    meta
  };
};
const getSubmissionsByContestIdIntoDB = async (
  contestId: string,
  query: Record<string, unknown>
) => {
  const contestQuery = new QueryBuilder(
    Submission.find({ contestId })
      .populate("userId", "username email")
      .lean(),
    query
  ).fields().paginate();

  const result = await contestQuery.modelQuery;
  const meta = await contestQuery.countTotal();
  return { result, meta };
};


export const SubmissionServices = {
  createSubmissionIntoDB,
  updateSubmissionIntoDB,
  deleteSubmissionIntoDB,
  getSubmissionUsersIntoDB,
  getSingleSubmissionIntoDB,
  getSubmissionContestHolderAndAdminIntoDB,
  getManageSubmissionIntoDB,
  getSubmissionsByContestIdIntoDB
}