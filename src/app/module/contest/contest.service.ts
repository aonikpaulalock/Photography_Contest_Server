import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TContest } from "./contest.interface";
import Contest from "./contest.model";

const createContestIntoDB = async (payload: TContest) => {
  const result = await Contest.create(payload);
  return result
}

const getAllContestsIntoDB = async (
  role: string,
  userId: string,
  query: Record<string, unknown>
) => {

  if (role === 'contestHolder') {
    const adminQuery = new QueryBuilder(
      Contest.find({ userId }),
      query
    ).paginate()

    const result = await adminQuery.modelQuery;
    const meta = await adminQuery.countTotal();
    return {
      result,
      meta,
    };
  }

  if (role === 'admin') {
    const adminQuery = new QueryBuilder(Contest.find({
      userId
    }), query)
      .paginate()

    const result = await adminQuery.modelQuery;
    const meta = await adminQuery.countTotal();
    return {
      result,
      meta,
    };
  }
}


const getContestsParticipationIntoDB = async (id: string) => {
  const result = await Contest.findById(id).populate('participantsID');
  if(!result){
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
  getContestsParticipationIntoDB
}