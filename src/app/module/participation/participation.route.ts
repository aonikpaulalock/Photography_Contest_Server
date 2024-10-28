import { Router } from "express";
import { auth } from "../../middleware/auth";
import { ValidationRequestSchema } from "../../middleware/ValidationRequest";
import { ParticipationControllers } from "./participation.controller";
import { ParticipationValidations } from "./participation.validation";

const router = Router();
router
  //! Create Contest
  .post(
    "/",
    auth("user"),
    ValidationRequestSchema(ParticipationValidations.createParticipationValidation),
    ParticipationControllers.createParticipationFromDB
  )
  // .get(
  //   "/",
  //   auth("admin", "contestHolder"),
  //   ContestControllers.getAllContestsFromDB
  // )

export const ParticipationRouter = router;