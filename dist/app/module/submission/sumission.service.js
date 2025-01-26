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
exports.SubmissionServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const sumission_model_1 = require("./sumission.model");
const participation_model_1 = require("../participation/participation.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const contest_model_1 = __importDefault(require("../contest/contest.model"));
const createSubmissionIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const existingSubmission = await Submission.findOne({
    //   userId: payload.userId,
    //   contestId: payload.contestId,
    // });
    // if (existingSubmission) {
    //   throw new AppError(
    //     httpStatus.CONFLICT,
    //     "A submission already exists for this contest by this participant"
    //   );
    // }
    // const result = await Submission.create(payload)
    // return result
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Check if submission already exists
        const existingSubmission = yield sumission_model_1.Submission.findOne({
            userId: payload.userId,
            contestId: payload.contestId,
        });
        if (existingSubmission) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "A submission already exists for this contest by this participant");
        }
        // Create submission
        const createSubmission = yield sumission_model_1.Submission.create([payload], { session });
        if (!createSubmission) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create submission');
        }
        // Check if user is already a participant
        const existingParticipation = yield participation_model_1.Participation.findOne({
            contestId: payload.contestId,
            userId: payload.userId,
        });
        if (!existingParticipation) {
            // Create participation if not exists
            const participationData = {
                contestId: payload.contestId,
                userId: payload.userId,
                submissionId: createSubmission[0]._id,
            };
            const createParticipation = yield participation_model_1.Participation.create([participationData], { session });
            if (!createParticipation) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create participation');
            }
            // Update contest with participant ID
            const updatedContest = yield contest_model_1.default.findByIdAndUpdate(payload.contestId, { $addToSet: { participantsID: payload.userId } }, { session, new: true });
            if (!updatedContest) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update contest participation');
            }
        }
        // Commit transaction
        yield session.commitTransaction();
        return createSubmission[0];
    }
    catch (err) {
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message || 'Failed to process submission');
    }
    finally {
        session.endSession();
    }
});
const deleteSubmissionIntoDB = (submissionId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Find the submission
        const submission = yield sumission_model_1.Submission.findById(submissionId).session(session);
        if (!submission) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Submission not found");
        }
        // Delete the participation record associated with this submission
        const deleteParticipation = yield participation_model_1.Participation.findOneAndDelete({ submissionId }, { session });
        if (!deleteParticipation) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete participation");
        }
        // Remove the user from the contest's participants array
        const updateContest = yield contest_model_1.default.findByIdAndUpdate(submission.contestId, { $pull: { participantsID: submission.userId } }, { session, new: true });
        if (!updateContest) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update contest");
        }
        // Delete the submission
        const deleteSubmission = yield sumission_model_1.Submission.findByIdAndDelete(submissionId, { session });
        if (!deleteSubmission) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete submission");
        }
        // Commit transaction
        yield session.commitTransaction();
        return { success: true, message: "Submission and participation deleted successfully" };
    }
    catch (err) {
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, err.message || "Failed to delete submission and participation");
    }
    finally {
        session.endSession();
    }
});
const updateSubmissionIntoDB = (submissionId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sumission_model_1.Submission.findByIdAndUpdate(submissionId, payload, { new: true });
    return result;
});
const getSingleSubmissionIntoDB = (submissionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sumission_model_1.Submission.findById(submissionId)
        .populate('contestId userId');
    return result;
});
const getSubmissionUsersIntoDB = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(sumission_model_1.Submission.find({
        userId
    })
        .populate('contestId')
        .lean(), query).fields().paginate();
    const result = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getSubmissionContestHolderAndAdminIntoDB = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const contestIds = yield contest_model_1.default.find({ userId });
    const contestQuery = new QueryBuilder_1.default(sumission_model_1.Submission.find({ contestId: { $in: contestIds } })
        .populate([
        { path: "userId", select: "username email profileImage" },
        { path: "contestId", select: "title prize deadline paymentStatus" },
    ])
        .lean(), query).fields().paginate();
    const result = yield contestQuery.modelQuery;
    const meta = yield contestQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getManageSubmissionIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const allSubmissionsQuery = new QueryBuilder_1.default(sumission_model_1.Submission.find().populate("userId", "username email").lean(), query).fields().paginate();
    const result = yield allSubmissionsQuery.modelQuery;
    const meta = yield allSubmissionsQuery.countTotal();
    return {
        result,
        meta
    };
});
const getSubmissionsByContestIdIntoDB = (contestId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const contestQuery = new QueryBuilder_1.default(sumission_model_1.Submission.find({ contestId })
        .populate("userId", "username email")
        .lean(), query).fields().paginate();
    const result = yield contestQuery.modelQuery;
    const meta = yield contestQuery.countTotal();
    return { result, meta };
});
exports.SubmissionServices = {
    createSubmissionIntoDB,
    updateSubmissionIntoDB,
    deleteSubmissionIntoDB,
    getSubmissionUsersIntoDB,
    getSingleSubmissionIntoDB,
    getSubmissionContestHolderAndAdminIntoDB,
    getManageSubmissionIntoDB,
    getSubmissionsByContestIdIntoDB
};
