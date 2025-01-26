"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestRouter = void 0;
const express_1 = require("express");
const contest_controller_1 = require("./contest.controller");
const auth_1 = require("../../middleware/auth");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const contest_validation_1 = require("./contest.validation");
const router = (0, express_1.Router)();
router
    //! Create Contest
    .post("/", (0, auth_1.auth)("admin", "contestHolder"), (0, ValidationRequest_1.ValidationRequestSchema)(contest_validation_1.ContestValidations.createContestValidation), contest_controller_1.ContestControllers.createContestFromDB)
    .get("/manage-contest", contest_controller_1.ContestControllers.manageContestsFromDB)
    .put("/:contestId", (0, auth_1.auth)("admin", "contestHolder"), (0, ValidationRequest_1.ValidationRequestSchema)(contest_validation_1.ContestValidations.updateContestValidation), contest_controller_1.ContestControllers.updateContestFromDB)
    .delete("/:id", (0, auth_1.auth)("admin", "contestHolder"), contest_controller_1.ContestControllers.deleteContestFromDB)
    .get("/:contestId", contest_controller_1.ContestControllers.getSingleContestFromDB)
    .get("/:contestId/participants", (0, auth_1.auth)("admin", "contestHolder"), contest_controller_1.ContestControllers.getContestsParticipationFromDB)
    .get("/", (0, auth_1.auth)("admin", "contestHolder", "user"), contest_controller_1.ContestControllers.getAllContestsFromDB);
exports.ContestRouter = router;
