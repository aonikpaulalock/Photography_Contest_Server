import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../module/Auth/auth.interface";
import { CatchAsyncPromise } from "./CatchAsyncPromise";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../module/Auth/auth.utils";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../module/Auth/auth.model";

export const auth = (...userRole: TUserRole[]) => {
  return CatchAsyncPromise(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers?.authorization
      //! If user not send token
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You can't unauthorize access"
        )
      }
      // checking if the given token is valid
      let decoded;
      try {
        decoded = verifyToken(
          token,
          config.jwt_access_secret as string,
        ) as JwtPayload;
      } catch (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      const { email } = decoded as JwtPayload
      // //! If User Exists in database
      const user = await User.isUserExists(email)

      if (!user) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "User not found"
        )
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

      //! checking user access
      if (userRole && !userRole.includes(user?.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Unauthorize access for this role"
        )
      }

      //!set to request
      req.user = decoded as JwtPayload & { role: string }
      next()
    }
  )
}