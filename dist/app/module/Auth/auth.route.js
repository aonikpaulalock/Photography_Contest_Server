"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router
    //! User Register
    .post("/register", (0, ValidationRequest_1.ValidationRequestSchema)(auth_validation_1.UserValidations.createUserValidation), auth_controller_1.UserControllers.createUser)
    //! User Login
    .post("/login", (0, ValidationRequest_1.ValidationRequestSchema)(auth_validation_1.UserValidations.loginUserValidation), auth_controller_1.UserControllers.loginUser)
    //! Change passoword Login
    .post("/change-password", (0, auth_1.auth)("user", "contestHolder", "admin"), (0, ValidationRequest_1.ValidationRequestSchema)(auth_validation_1.UserValidations.changePasswordValidation), auth_controller_1.UserControllers.changePassword)
    .post('/refresh-token', (0, ValidationRequest_1.ValidationRequestSchema)(auth_validation_1.UserValidations.refreshTokenValidationSchema), auth_controller_1.UserControllers.refreshToken)
    .post('/forget-password', (0, ValidationRequest_1.ValidationRequestSchema)(auth_validation_1.UserValidations.forgetPasswordValidationSchema), auth_controller_1.UserControllers.forgetPassword)
    .post('/reset-password', (0, ValidationRequest_1.ValidationRequestSchema)(auth_validation_1.UserValidations.resetPasswordValidationSchema), auth_controller_1.UserControllers.resetPassword);
exports.AuthRouter = router;
