"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const user_controller_1 = require("./user.controller");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const user_validations_1 = require("./user.validations");
const auth_validation_1 = require("../Auth/auth.validation");
const router = (0, express_1.Router)();
router
    .post("/change-status/:id", (0, auth_1.auth)("admin"), (0, ValidationRequest_1.ValidationRequestSchema)(user_validations_1.ValidationUser.changeStatusValidationSchema), user_controller_1.ControllersUsers.changeStatusFromDB)
    .put('/:id', (0, auth_1.auth)("user", "contestHolder", "admin"), (0, ValidationRequest_1.ValidationRequestSchema)(auth_validation_1.UserValidations.updateUserValidation), user_controller_1.ControllersUsers.updateUserFromDB)
    .patch('/:id/role', (0, auth_1.auth)("admin"), (0, ValidationRequest_1.ValidationRequestSchema)(user_validations_1.ValidationUser.updateUserRoleValidation), user_controller_1.ControllersUsers.updateUserRoleFromDB)
    .delete('/:id', (0, auth_1.auth)("admin"), user_controller_1.ControllersUsers.deleteUserFromDB)
    //! Get All User
    .get("/", (0, auth_1.auth)("admin"), user_controller_1.ControllersUsers.getAllUserFromDB)
    .get('/me', (0, auth_1.auth)("user", "contestHolder", "admin"), user_controller_1.ControllersUsers.getMeFromDB)
    .get('/:userId', (0, auth_1.auth)("admin"), user_controller_1.ControllersUsers.getSingleUserFromDB);
exports.UserRoute = router;
