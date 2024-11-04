import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TUser } from "../Auth/auth.interface";
import { User } from "../Auth/auth.model";
import { allowedFields, UpdatableFields, UserSearchableFields } from "./user.constant";

const getAllUserIntoDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
}

const getMeIntoDB = async (userId: string, role: string) => {

  let result = null;

  if (role === 'user') {
    result = await User.findById(userId);
  }

  if (role === 'contestHolder') {
    result = await User.findById(userId);
  }

  if (role === 'admin') {
    result = await User.findById(userId);
  }

  return result;
};

const changeStatusIntoDB = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const updateUserIntoDB = async (
  id: string,
  payload: Partial<TUser>,
  userId: string,
) => {


  //! If User Exists in database
  const user = await User.findById({
    _id: id
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  //! If User is Deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //! checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //! Check if the current user is trying to update their own profile
  if (userId !== id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Unauthorize access for user's profile."
    );
  }

  const updatedPayload: Partial<UpdatableFields> = {};

  //! Iterate over each key in the payload
  for (const key in payload) {
    if (allowedFields.includes(key as keyof UpdatableFields)) {
      //! Use type assertion to access payload[key]
      updatedPayload[key as keyof UpdatableFields] = payload[key as keyof UpdatableFields];
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Field '${key}' is not allowed for update.`
      );
    }
  }

  const result = await User.findByIdAndUpdate({ _id: id }, updatedPayload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const updateUserRoleIntoDB = async (
  id: string,
  role: string
) => {

  //! If User Exists in database
  const user = await User.findById({
    _id: id
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  //! If User is Deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //! checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const result = await User.findByIdAndUpdate(
    { _id: id },
    { role: role },
    {
      new: true,
      runValidators: true,
    });
  return result;
};



const deleteUserIntoDB = async (
  id: string
) => {

  //! If User Exists in database
  const user = await User.findById({
    _id: id
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  //! If User is Deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //! checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const result = await User.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};


export const ServicesUsers = {
  getAllUserIntoDB,
  getMeIntoDB,
  changeStatusIntoDB,
  updateUserIntoDB,
  updateUserRoleIntoDB,
  deleteUserIntoDB
}