import { Router } from "express";
import { auth } from "../../middleware/auth";
import { ControllersUsers } from "./user.controller";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";
import { ValidationUser } from "./user.validations";
import { UserValidations } from "../Auth/auth.validation";

const router = Router();
router
  .post(
    "/change-status/:id",
    auth("admin"),
    ValidationRequestSchema(ValidationUser.changeStatusValidationSchema),
    ControllersUsers.changeStatusFromDB
  )
  .put(
    '/:id',
    auth("user", "contestHolder", "admin"),
    ValidationRequestSchema(UserValidations.updateUserValidation),
    ControllersUsers.updateUserFromDB,
  )
  .patch(
    '/:id/role',
    auth("admin"),
    ValidationRequestSchema(ValidationUser.updateUserRoleValidation),
    ControllersUsers.updateUserRoleFromDB,
  )
  .delete(
    '/:id',
    auth("admin"),
    ControllersUsers.deleteUserFromDB,
  )
  //! Get All User
  .get("/",
    auth("admin"),
    ControllersUsers.getAllUserFromDB
  )
  .get('/me',
    auth("user", "contestHolder", "admin"),
    ControllersUsers.getMeFromDB
  );

export const UserRoute = router;