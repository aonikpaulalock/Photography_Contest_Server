"use strict";
// ৩. Submission তৈরি করা
// API Endpoint
// URL: POST /api/contests/:contestId/submit
// Params: contestId (e.g., 12345abcde)
// Body (JSON):
// json
// Copy code
// {
//     "images": [
//         "https://example.com/image1.jpg",
//         "https://example.com/image2.jpg"
//     ]
// }
// Postman Example
// Select POST method.
// Enter the URL: http://localhost:5000/api/contests/12345abcde/submit.
// Go to the Body tab, select raw, and set it to JSON.
// Paste the above JSON.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const ValidationRequest_1 = require("../../middleware/ValidationRequest");
const sumission_controller_1 = require("./sumission.controller");
const submission_validation_1 = require("./submission.validation");
const router = (0, express_1.Router)();
router
    //! Create Contest
    .post("/", (0, auth_1.auth)("user"), (0, ValidationRequest_1.ValidationRequestSchema)(submission_validation_1.SubmissionValidations.createSubmissionValidation), sumission_controller_1.SubmissionControllers.createSubmissionFromDB)
    .get("/user-submission", (0, auth_1.auth)("user"), sumission_controller_1.SubmissionControllers.getSubmissionUsersFromDB)
    .get("/contestHolder-submission", (0, auth_1.auth)("contestHolder", "admin"), sumission_controller_1.SubmissionControllers.getSubmissionContestHolderAndAdminFromDB)
    .get("/manage-submission", (0, auth_1.auth)("admin"), sumission_controller_1.SubmissionControllers.getManageSubmissionFromDB)
    .put("/:submissionId", (0, auth_1.auth)("user", "admin", "contestHolder"), sumission_controller_1.SubmissionControllers.updateSubmissionFromDB)
    .delete("/:submissionId", (0, auth_1.auth)("user", "admin", "contestHolder"), sumission_controller_1.SubmissionControllers.deleteSubmissionFromDB)
    .get("/:submissionId", (0, auth_1.auth)("user", "admin", "contestHolder"), sumission_controller_1.SubmissionControllers.getSingleSubmissionFromDB)
    .get("/:contestId/submission", (0, auth_1.auth)("admin", "contestHolder"), sumission_controller_1.SubmissionControllers.getSubmissionsByContestIdFromDB);
exports.SubmissionRouter = router;
