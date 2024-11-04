import { Router } from "express";
import { AuthRouter } from "../module/Auth/auth.route";
import { UserRoute } from "../module/user/user.route";
import { ContestRouter } from "../module/contest/contest.route";
import { ParticipationRouter } from "../module/participation/participation.route";
import { SubmissionRouter } from "../module/submission/sumission.route";
import { PaymentRouter } from "../module/payment/payment.route";
import { BlogRouter } from "../module/blog/blog.route";
import { BlogLikeRouter } from "../module/blogLike/blogLike.route";
import { BlogCommentRouter } from "../module/blogComment/blogComment.route";

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
  },
  {
    path: "/blog",
    routes: BlogRouter
  },
  {
    path: "/blog-like",
    routes: BlogLikeRouter
  },
  {
    path: "/blog-comment",
    routes: BlogCommentRouter
  }
]

ProjectRoutes.forEach((route) => router.use(route.path, route.routes))

export const GlobalRoutes = router
