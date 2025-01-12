import { TContest } from "./contest.interface";

export const contestStatus = ["granted", "finished"]

export const contestAllowedFields = [
  'title',
  'prize',
  'tags',
  'requirements',
  'deadline'
];

export type contestUpdatableFields = Pick<
  TContest,
  'title' |
  'prize' |
  'tags' |
  'requirements' |
  'deadline'
>;

export const ContestSearchableFields = [
  'title',
  'prize',
  'status',
  'paymentStatus',
  'requirements',
];