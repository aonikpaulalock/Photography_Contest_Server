"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalRoutes = exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("../module/Auth/auth.route");
const user_route_1 = require("../module/user/user.route");
const contest_route_1 = require("../module/contest/contest.route");
const participation_route_1 = require("../module/participation/participation.route");
const sumission_route_1 = require("../module/submission/sumission.route");
const payment_route_1 = require("../module/payment/payment.route");
const blog_route_1 = require("../module/blog/blog.route");
const blogLike_route_1 = require("../module/blogLike/blogLike.route");
const blogComment_route_1 = require("../module/blogComment/blogComment.route");
exports.router = (0, express_1.Router)();
const ProjectRoutes = [
    {
        path: "/auth",
        routes: auth_route_1.AuthRouter
    },
    {
        path: "/users",
        routes: user_route_1.UserRoute
    },
    {
        path: "/contests",
        routes: contest_route_1.ContestRouter
    },
    {
        path: "/participation",
        routes: participation_route_1.ParticipationRouter
    },
    {
        path: "/submission",
        routes: sumission_route_1.SubmissionRouter
    },
    {
        path: "/payment",
        routes: payment_route_1.PaymentRouter
    },
    {
        path: "/blog",
        routes: blog_route_1.BlogRouter
    },
    {
        path: "/blog-like",
        routes: blogLike_route_1.BlogLikeRouter
    },
    {
        path: "/blog-comment",
        routes: blogComment_route_1.BlogCommentRouter
    }
];
ProjectRoutes.forEach((route) => exports.router.use(route.path, route.routes));
exports.GlobalRoutes = exports.router;
