import { Router } from "express";
import { AuthRouter } from "../module/Auth/auth.route";
import { UserRoute } from "../module/user/user.route";
import { ContestRouter } from "../module/contest/contest.route";
import { ParticipationRouter } from "../module/participation/participation.route";
import { SubmissionRouter } from "../module/submission/sumission.route";
import { PaymentRouter } from "../module/payment/payment.route";

export const router = Router();
const ProjectRoutes = [
  {
    path: "/auth",
    routes: AuthRouter
  },
  {
    path: "/users",
    routes: UserRoute
  },
  {
    path: "/contests",
    routes: ContestRouter
  },
  {
    path: "/participation",
    routes: ParticipationRouter
  },
  {
    path: "/submission",
    routes: SubmissionRouter
  },
  {
    path: "/payment",
    routes: PaymentRouter
  }
]

ProjectRoutes.forEach((route) => router.use(route.path, route.routes))

export const GlobalRoutes = router
