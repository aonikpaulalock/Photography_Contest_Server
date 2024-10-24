import { Router } from "express";
import { AuthRouter } from "../module/Auth/auth.route";
import { UserRoute } from "../module/user/user.route";

export const router = Router();
const ProjectRoutes = [
  {
    path: "/auth",
    routes: AuthRouter
  },
  {
    path: "/users",
    routes: UserRoute
  }
]

ProjectRoutes.forEach((route) => router.use(route.path, route.routes))

export const GlobalRoutes = router
