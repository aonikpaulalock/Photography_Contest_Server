import { TUser } from "../Auth/auth.interface";

export const UserSearchableFields = [
  'username',
  'email',
  'bio',
  'designation',
  'country',
];

export const allowedFields = [
  "bio",
  "designation",
  "country",
  "profileImage",
  "username"
];

export type UpdatableFields = Pick<
  TUser,
  'bio' |
  'designation' |
  'country' |
  'profileImage' |
  'username'
>;