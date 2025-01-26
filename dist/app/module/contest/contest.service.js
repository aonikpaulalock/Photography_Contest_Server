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
exports.ContestServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const contest_model_1 = __importDefault(require("./contest.model"));
const contest_constant_1 = require("./contest.constant");
const createContestIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contest_model_1.default.create(payload);
    return result;
});
const updateContestIntoDB = (role, userId, contestId, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
payload) => __awaiter(void 0, void 0, void 0, function* () {
    const contest = yield contest_model_1.default.findById({ _id: contestId });
    if (!contest) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Contest not found');
    }
    if (role === 'contestHolder' && contest.userId.toString() !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to update this contest');
    }
    const contestFilteredUpdateData = {};
    for (const key in payload) {
        if (contest_constant_1.contestAllowedFields.includes(key)) {
            contestFilteredUpdateData[key] = payload[key];
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Field '${key}' is not allowed for update.`);
        }
    }
    if (Object.keys(contestFilteredUpdateData).length === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No valid fields provided for update');
    }
    const result = yield contest_model_1.default.findByIdAndUpdate({ _id: contestId }, contestFilteredUpdateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteContestIntoDB = (role, userId, contestId) => __awaiter(void 0, void 0, void 0, function* () {
    const contest = yield contest_model_1.default.findById({
        _id: contestId
    });
    if (!contest) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Contest not found');
    }
    if (role !== 'admin' && contest.userId.toString() !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to delete this contest');
    }
    const result = yield contest_model_1.default.findByIdAndDelete({ _id: contestId });
    return result;
});
const getSingleContestIntoDB = (contestId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contest_model_1.default.findById(contestId).populate("userId");
    return result;
});
const getAllContestsIntoDB = (role, userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'contestHolder') {
        const adminQuery = new QueryBuilder_1.default(contest_model_1.default.find({ userId }), query).paginate();
        const result = yield adminQuery.modelQuery;
        const meta = yield adminQuery.countTotal();
        return {
            result,
            meta,
        };
    }
    if (role === 'admin') {
        const adminQuery = new QueryBuilder_1.default(contest_model_1.default.find({ userId }), query).paginate();
        const result = yield adminQuery.modelQuery;
        const meta = yield adminQuery.countTotal();
        return {
            result,
            meta,
        };
    }
    // Allow normal users to view all contests
    const userQuery = new QueryBuilder_1.default(contest_model_1.default.find(), query).paginate();
    const result = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return {
        result,
        meta,
    };
});
const manageContestsIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const manageAdminQuery = new QueryBuilder_1.default(contest_model_1.default.find().populate("userId"), query)
        .paginate()
        .filter()
        .search(contest_constant_1.ContestSearchableFields);
    const result = yield manageAdminQuery.modelQuery;
    const meta = yield manageAdminQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getContestsParticipationIntoDB = (contestId, page = 1, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const skip = (page - 1) * limit;
    const contest = yield contest_model_1.default.findById(contestId).populate({
        path: "participantsID",
        options: {
            limit: limit,
            skip: skip,
        },
    });
    if (!contest) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Contest not found");
    }
    const totalParticipants = yield contest_model_1.default.aggregate([
        { $match: { _id: contest._id } },
        { $project: { totalParticipants: { $size: "$participantsID" } } },
    ]);
    return {
        data: contest,
        totalParticipants: ((_a = totalParticipants === null || totalParticipants === void 0 ? void 0 : totalParticipants[0]) === null || _a === void 0 ? void 0 : _a.totalParticipants) || 0,
    };
});
exports.ContestServices = {
    createContestIntoDB,
    getAllContestsIntoDB,
    getSingleContestIntoDB,
    getContestsParticipationIntoDB,
    updateContestIntoDB,
    manageContestsIntoDB,
    deleteContestIntoDB
};
