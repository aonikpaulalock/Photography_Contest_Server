import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
import { userRole, UserStatus } from "./user.constant";
// User Schema
const UserSchema = new Schema<TUser, UserModel>({
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
  // needsPasswordChange: {
  //   type: Boolean,
  //   default: false
  // }, // This could be a password reset field
  role: {
    type: String,
    enum: userRole,
    default: 'user'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: UserStatus,
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

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Static method for password validation
UserSchema.statics.validatePassword = function (password) {
  // Password format requirements
  const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordFormat.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit."
    );
  }
};



//! Is User Exists
UserSchema.statics.isUserExists = async function (email) {
  return await User.findOne({ email })
}

//! compare password body and datebase
UserSchema.statics.isPasswordMatch = async function (textPassword, hashPassword) {
  return await bcrypt.compare(textPassword, hashPassword)
}

//! replace password and historyOfPassword field
UserSchema.methods.toJSON = function () {
  const cloneObj = this.toObject();
  delete cloneObj.password;
  return cloneObj;
};



export const User = model<TUser, UserModel>("User", UserSchema)