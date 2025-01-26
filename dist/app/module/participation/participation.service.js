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
exports.ParticipationServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const participation_model_1 = require("./participation.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const contest_model_1 = __importDefault(require("../contest/contest.model"));
const createParticipationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { contestId, userId } = payload;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //! Check if the user has already participated in this contest
        const existingParticipation = yield participation_model_1.Participation.findOne({ contestId, userId });
        if (existingParticipation) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "User has already participated in this contest.");
        }
        const createParticipation = yield participation_model_1.Participation.create([payload], { session });
        if (!createParticipation) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create participation');
        }
        //! Update contest with the participant ID within the transaction
        const updatedContest = yield contest_model_1.default.findByIdAndUpdate(contestId, { $addToSet: { participantsID: userId } }, { session, new: true });
        if (!updatedContest) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update contest participation');
        }
        yield session.commitTransaction();
        session.endSession();
        return createParticipation;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message || 'Failed to create contest participation');
    }
});
exports.ParticipationServices = {
    createParticipationIntoDB
};
