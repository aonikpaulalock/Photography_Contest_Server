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
exports.ServicesUsers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const auth_model_1 = require("../Auth/auth.model");
const user_constant_1 = require("./user.constant");
const getAllUserIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const adminQuery = new QueryBuilder_1.default(auth_model_1.User.find({
        isDeleted: false
    }), query)
        .search(user_constant_1.UserSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield adminQuery.modelQuery;
    const meta = yield adminQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getMeIntoDB = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'user') {
        result = yield auth_model_1.User.findById(userId);
    }
    if (role === 'contestHolder') {
        result = yield auth_model_1.User.findById(userId);
    }
    if (role === 'admin') {
        result = yield auth_model_1.User.findById(userId);
    }
    return result;
});
const changeStatusIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const updateUserIntoDB = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //! If User Exists in database
    const user = yield auth_model_1.User.findById({
        _id: id
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //! If User is Deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    //! checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    //! Check if the current user is trying to update their own profile
    if (userId !== id) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorize access for user's profile.");
    }
    const updatedPayload = {};
    //! Iterate over each key in the payload
    for (const key in payload) {
        if (user_constant_1.allowedFields.includes(key)) {
            //! Use type assertion to access payload[key]
            updatedPayload[key] = payload[key];
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Field '${key}' is not allowed for update.`);
        }
    }
    const result = yield auth_model_1.User.findByIdAndUpdate({ _id: id }, updatedPayload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const updateUserRoleIntoDB = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    //! If User Exists in database
    const user = yield auth_model_1.User.findById({
        _id: id
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //! If User is Deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    //! checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    const result = yield auth_model_1.User.findByIdAndUpdate({ _id: id }, { role: role }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //! If User Exists in database
    const user = yield auth_model_1.User.findById({
        _id: id
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //! If User is Deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted !');
    }
    //! checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    const result = yield auth_model_1.User.findByIdAndUpdate({ _id: id }, { isDeleted: true }, {
        new: true,
    });
    return result;
});
const getSingleUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById(userId);
    return result;
});
exports.ServicesUsers = {
    getAllUserIntoDB,
    getMeIntoDB,
    changeStatusIntoDB,
    updateUserIntoDB,
    updateUserRoleIntoDB,
    deleteUserIntoDB,
    getSingleUserIntoDB
};
