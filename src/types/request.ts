import { UserInfoType } from './user';

export interface SegmentRequestType {
  page: number,
  per: number,
}

export interface RegisterRequestType {
  username: string,
  email: string,
  password: string
}

export type LoginRequestType = {
  email: string,
  password: string,
};

export type UserUpdateRequestType = Omit<UserInfoType, 'email' | 'password' | 'verify' | 'id'>;

export type VerifyRequestTyep = {
  verifyCode: string,
};

export interface SearchRequestType extends SegmentRequestType {
  keyword: string,
  tags: string[],
  date: string,
}

export const sortByUnion = ['trend', 'newest'];
export const sortingUnion = ['desc', 'asc'];
export interface ActivitiesRequestType extends SegmentRequestType {
  sortby: typeof sortByUnion[number];
  sorting: typeof sortByUnion[number];
}
