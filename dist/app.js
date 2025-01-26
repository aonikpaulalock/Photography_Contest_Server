"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const GlobalErrorHandle_1 = require("./app/middleware/GlobalErrorHandle");
const NotFound_1 = require("./app/middleware/NotFound");
const app = (0, express_1.default)();
// perser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    // "https://photography-frontend-eta.vercel.app"
    // ['http://localhost:5173']
    origin: "https://photography-frontend-eta.vercel.app",
    credentials: true
}));
// Use router
app.use("/api", routes_1.router);
const TestingRouteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "Successfully Testing Data"
    });
});
// "http://localhost:5173/payment-success"
// "http://localhost:5173/payment-failed"
//! payment redirect sucess or failed message
app.post("/success", (req, res) => {
    res.redirect("https://photography-frontend-eta.vercel.app/payment-success");
});
// SSLCommerz FAIL Callback
app.post("/fail", (req, res) => {
    res.redirect("https://photography-frontend-eta.vercel.app/payment-failed");
});
app.get("/", TestingRouteController);
// Global Error
app.use(GlobalErrorHandle_1.GlobalErrorHandler);
// Not Found Route
app.use(NotFound_1.NotFoundRoute);
exports.default = app;
