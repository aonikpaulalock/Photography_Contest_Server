"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submission = void 0;
const mongoose_1 = require("mongoose");
const submissionSchema = new mongoose_1.Schema({
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
    images: [{
            type: String,
            required: true
        }],
    isWinner: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.Submission = (0, mongoose_1.model)('Submission', submissionSchema);
