import httpStatus from "http-status";
import AppError from "../../../utils/AppError";
import { TUser } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from "bcrypt"
import { createToken, verifyToken } from "./auth.utils";
import { sendEmail } from "../../../utils/sendEmail";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  // Abcdef11  ---- user --- alock
  // Abcdef12  ---- user
  // Abcdef13  ---- user --- shankar
  // Abcdef14  ---- user --- nikil
  // Password8 ----- contestHolder
  // Password9 ----- contestHolder
  // Qwerty89 ------ admin
  // Qwerty90 ------ admin

  return result
}


const loginUserIntoDB = async (
  payload:
    {
      email: string,
      password: string
    }
) => {

  const { email, password } = payload;

  //! If User Exists in database
  const user = await User.isUserExists(email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //! Compare pasword database to payload
  const matchPassword = await User.isPasswordMatch(password, user?.password)
  if (!matchPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Don't match password")
  }
  //! Create Jwt Payload
  const secretPayload = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
  }

  //! Create Access Token 
  const accessToken = createToken(
    secretPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    secretPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );


  return {
    user,
    accessToken,
    refreshToken
  }
}

const changePasswordIntoDB = async (
  userId: string,
  payload: {
    currentPassword: string
    newPassword: string
  }
) => {
  const { currentPassword, newPassword } = payload

  //! find User
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //! Compare database password and curent password
  if (!(await User.isPasswordMatch(
    currentPassword, user?.password as string))) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Current password didn't match"
    )
  }

  // ! New Password hash
  const hashedNewPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

  //! update and push new password and date
  const addToPasswordHistory = await User.findByIdAndUpdate(
    user._id,
    {
      password: hashedNewPassword,
    },
    { new: true, runValidators: true }
  );

  return addToPasswordHistory
}

const refreshTokenIntoDB = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExists(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPasswordIntoDB = async (email: string) => {
  // checking if the user is exist
  const user = await User.isUserExists(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_password_link}?userId=${user._id}&token=${resetToken}` as string;

  await sendEmail(user.email,
    `
        <div>
        <h2>Dear ${user?.username},</h2>
        <h4>Your reset password link and reset it before 10 minutes.</h4>
            <a href=${resetUILink}>
            ${resetUILink}
            </a>
        </div>
        `
  );

};

const resetPasswordIntoDB = async (
  payload: {
    userId: string;
    newPassword: string
  },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.findById(payload?.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (payload?.userId !== decoded?.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      _id: payload?.userId,
    },
    {
      password: newHashedPassword
    },
  );
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  changePasswordIntoDB,
  refreshTokenIntoDB,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
}