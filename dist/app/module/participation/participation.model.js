"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participation = void 0;
const mongoose_1 = require("mongoose");
const participationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contestId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    submissionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Submission',
    },
    isWinner: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.Participation = (0, mongoose_1.model)('Participation', participationSchema);
