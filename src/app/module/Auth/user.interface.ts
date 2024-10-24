/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

// User Model
export interface TUser {
  _id:string;
  username: string;
  email: string;
  password: string;
  // needsPasswordChange: boolean;
  role: 'user' | 'admin' | 'contestHolder';
  status: 'active' | 'blocked';
  isDeleted: boolean;
  bio: string;
  designation: string;
  country: string;
  profileImage: string;
}

export type TUserRole = keyof typeof USER_ROLE

// Put all user instance methods in this interface:
export interface UserModel extends Model<TUser> {
  validatePassword(password: string): Promise<boolean>
  isPasswordMatch(textPassword: string, hashPassord: string): Promise<boolean>
  isUserExists(email: string): Promise<TUser>
}