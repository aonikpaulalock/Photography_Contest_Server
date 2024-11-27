import { Router } from "express";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";
import { UserControllers } from "./auth.controller";
import { UserValidations } from "./auth.validation";
import { auth } from "../../middleware/auth";

const router = Router();
router
  //! User Register
  .post("/register",
    ValidationRequestSchema(
      UserValidations.createUserValidation
    ),
    UserControllers.createUser
  )

  //! User Login
  .post("/login",
    ValidationRequestSchema(
      UserValidations.loginUserValidation
    ),
    UserControllers.loginUser
  )

  //! Change passoword Login
  .post("/change-password",
    auth("user", "contestHolder", "admin"),
    ValidationRequestSchema(
      UserValidations.changePasswordValidation
    ),
    UserControllers.changePassword
  )


  .post(
    '/refresh-token',
    auth("user", "contestHolder", "admin"),
    ValidationRequestSchema(UserValidations.refreshTokenValidationSchema),
    UserControllers.refreshToken,
  )

  .post(
    '/forget-password',
    auth("user", "contestHolder", "admin"),
    ValidationRequestSchema(UserValidations.forgetPasswordValidationSchema),
    UserControllers.forgetPassword,
  )

  .post(
    '/reset-password',
    auth("user", "contestHolder", "admin"),
    ValidationRequestSchema(UserValidations.resetPasswordValidationSchema),
    UserControllers.resetPassword,
  )

export const AuthRouter = router;