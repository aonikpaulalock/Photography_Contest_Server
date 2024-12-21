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


import { Router } from "express";
import { auth } from "../../middleware/auth";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";
import { SubmissionControllers } from "./sumission.controller";
import { SubmissionValidations } from "./submission.validation";

const router = Router();
router
  //! Create Contest
  .post(
    "/",
    auth("user"),
    ValidationRequestSchema(SubmissionValidations.createSubmissionValidation),
    SubmissionControllers.createSubmissionFromDB
  )

  .get(
    "/user-submission",
    auth("user"),
    SubmissionControllers.getSubmissionUsersFromDB
  )
  .get(
    "/contestHolder-submission",
    auth("contestHolder","admin"),
    SubmissionControllers.getSubmissionContestHolderAndAdminFromDB
  )
  .get(
    "/manage-submission",
    auth("admin"),
    SubmissionControllers.getManageSubmissionFromDB
  )
  .put(
    "/:submissionId",
    auth("user", "admin", "contestHolder"),
    SubmissionControllers.updateSubmissionFromDB
  )
  .delete(
    "/:submissionId",
    auth("user", "admin", "contestHolder"),
    SubmissionControllers.deleteSubmissionFromDB
  )
  
  .get(
    "/:submissionId",
    auth("user", "admin", "contestHolder"),
    SubmissionControllers.getSingleSubmissionFromDB
  )
  .get(
    "/:contestId/submission",
    auth("admin","contestHolder"),
    SubmissionControllers.getSubmissionsByContestIdFromDB
  )

export const SubmissionRouter = router;