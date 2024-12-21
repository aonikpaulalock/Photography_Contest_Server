import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TContest } from "./contest.interface";
import Contest from "./contest.model";
import { contestAllowedFields, contestUpdatableFields } from "./contest.constant";

const createContestIntoDB = async (payload: TContest) => {
  const result = await Contest.create(payload);
  return result
}


const updateContestIntoDB = async (
  role: string,
  userId: string,
  contestId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Partial<any>
) => {
  const contest = await Contest.findById({ _id: contestId });
  if (!contest) {
    throw new AppError(httpStatus.NOT_FOUND, 'Contest not found');
  }

  if (role === 'contestHolder' && contest.userId.toString() !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to update this contest');
  }

  const contestFilteredUpdateData: Partial<contestUpdatableFields> = {};


  for (const key in payload) {
    if (contestAllowedFields.includes(key as keyof contestUpdatableFields)) {
      contestFilteredUpdateData[key as keyof contestUpdatableFields] = payload[key as keyof contestUpdatableFields];
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Field '${key}' is not allowed for update.`
      );
    }
  }

  if (Object.keys(contestFilteredUpdateData).length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No valid fields provided for update');
  }

  const result = await Contest.findByIdAndUpdate(
    { _id: contestId },
    contestFilteredUpdateData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result
};

const deleteContestIntoDB = async (
  role: string,
  userId: string,
  contestId: string
) => {

  const contest = await Contest.findById({
    _id: contestId
  });

  if (!contest) {
    throw new AppError(httpStatus.NOT_FOUND, 'Contest not found');
  }

  if (role !== 'admin' && contest.userId.toString() !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to delete this contest');
  }

  const result = await Contest.findByIdAndDelete({ _id: contestId })
  return result

};

const getSingleContestIntoDB = async (contestId: string) => {
  const result = await Contest.findById(contestId);
  return result;
};

const getAllContestsIntoDB = async (
  role: string,
  userId: string,
  query: Record<string, unknown>
) => {
  if (role === 'contestHolder') {
    const adminQuery = new QueryBuilder(
      Contest.find({ userId }),
      query
    ).paginate();

    const result = await adminQuery.modelQuery;
    const meta = await adminQuery.countTotal();
    return {
      result,
      meta,
    };
  }

  if (role === 'admin') {
    const adminQuery = new QueryBuilder(
      Contest.find({ userId }),
      query
    ).paginate();

    const result = await adminQuery.modelQuery;
    const meta = await adminQuery.countTotal();
    return {
      result,
      meta,
    };
  }

  // Allow normal users to view all contests
  const userQuery = new QueryBuilder(Contest.find(), query).paginate();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return {
    result,
    meta,
  };
};



const getContestsParticipationIntoDB = async (id: string) => {
  const result = await Contest.findById(id).populate('participantsID');
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Contest not found'
    );
  }
  return result
}

export const ContestServices = {
  createContestIntoDB,
  getAllContestsIntoDB,
  getSingleContestIntoDB,
  getContestsParticipationIntoDB,
  updateContestIntoDB,
  deleteContestIntoDB
}