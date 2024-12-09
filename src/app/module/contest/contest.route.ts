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
  .put(
    "/:contestId",
    auth("admin", "contestHolder"),
    ValidationRequestSchema(ContestValidations.updateContestValidation),
    ContestControllers.updateContestFromDB
  )
  .delete(
    "/:id",
    auth("admin", "contestHolder"),
    ContestControllers.deleteContestFromDB
  )
  .get("/:contestId",
    ContestControllers.getSingleContestFromDB
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