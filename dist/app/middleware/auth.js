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
exports.auth = void 0;
const CatchAsyncPromise_1 = require("./CatchAsyncPromise");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("../module/Auth/auth.utils");
const config_1 = __importDefault(require("../config"));
const auth_model_1 = require("../module/Auth/auth.model");
const auth = (...userRole) => {
    return (0, CatchAsyncPromise_1.CatchAsyncPromise)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        //! If user not send token
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can't unauthorize access");
        }
        // checking if the given token is valid
        let decoded;
        try {
            decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_access_secret);
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        const { email } = decoded;
        // //! If User Exists in database
        const user = yield auth_model_1.User.isUserExists(email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
        }
        // checking if the user is blocked
        const userStatus = user === null || user === void 0 ? void 0 : user.status;
        if (userStatus === 'blocked') {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
        }
        //! checking user access
        if (userRole && !userRole.includes(user === null || user === void 0 ? void 0 : user.role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorize access for this role");
        }
        //!set to request
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
