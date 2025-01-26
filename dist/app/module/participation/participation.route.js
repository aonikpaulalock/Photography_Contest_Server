"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const participation_controller_1 = require("./participation.controller");
const participation_validation_1 = require("./participation.validation");
const router = (0, express_1.Router)();
router
    //! Create Contest
    .post("/", (0, auth_1.auth)("user"), (0, ValidationRequest_1.ValidationRequestSchema)(participation_validation_1.ParticipationValidations.createParticipationValidation), participation_controller_1.ParticipationControllers.createParticipationFromDB);
// .get(
//   "/",
//   auth("admin", "contestHolder"),
//   ContestControllers.getAllContestsFromDB
// )
exports.ParticipationRouter = router;
