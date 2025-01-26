"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionId = void 0;
const generateTransactionId = () => {
    return `TRANS_${Date.now()}`;
};
exports.generateTransactionId = generateTransactionId;
