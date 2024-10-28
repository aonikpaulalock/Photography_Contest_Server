import { Router } from "express";
import { ContestControllers } from "./contest.controller";
import { auth } from "../../middleware/auth";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";
import { ContestValidations } from "./contest.validation";

const router = Router();
router
  //! Create Contest
  .post(
    "/",
    auth("admin", "contestHolder"),
    ValidationRequestSchema(ContestValidations.createContestValidation),
    ContestControllers.createContestFromDB
  )
  .get(
    "/",
    auth("admin", "contestHolder"),
    ContestControllers.getAllContestsFromDB
  )
  .get(
    "/:id/participants",
    auth("admin", "contestHolder"),
    ContestControllers.getContestsParticipationFromDB
  )

export const ContestRouter = router;