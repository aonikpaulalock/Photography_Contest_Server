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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const auth_constant_1 = require("./auth.constant");
// User Schema
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: auth_constant_1.userRole,
        default: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: auth_constant_1.UserStatus,
        default: 'active'
    },
    bio: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    profileImage: {
        type: String
    }
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        // hashing password and save into DB
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// Static method for password validation
UserSchema.statics.validatePassword = function (password) {
    // Password format requirements
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordFormat.test(password)) {
        throw new Error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.");
    }
};
//! Is User Exists
UserSchema.statics.isUserExists = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email });
    });
};
//! compare password body and datebase
UserSchema.statics.isPasswordMatch = function (textPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(textPassword, hashPassword);
    });
};
//! replace password and historyOfPassword field
UserSchema.methods.toJSON = function () {
    const cloneObj = this.toObject();
    delete cloneObj.password;
    return cloneObj;
};
exports.User = (0, mongoose_1.model)("User", UserSchema);
