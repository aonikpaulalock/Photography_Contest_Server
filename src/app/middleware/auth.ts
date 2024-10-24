import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../module/Auth/user.interface";
import { CatchAsyncPromise } from "./CatchAsyncPromise";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../module/Auth/user.utils";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../module/Auth/user.model";

export const auth = (...userRole: TUserRole[]) => {
  return CatchAsyncPromise(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization
      //! If user not send token
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You can't unauthorize access"
        )
      }

      const decoded = verifyToken(
        token,
        config.jwt_access_secret as string
      )

      const { userId } = decoded as JwtPayload

      // //! If User Exists in database
      const user = await User.findById(userId)
      if (!user) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "User not found"
        )
      }
      //! checking user access
      if (userRole && !userRole.includes(user?.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Unauthorize access for this role"
        )
      }

      //!set to request
      req.userPayload = decoded as JwtPayload
      next()
    }
  )
}