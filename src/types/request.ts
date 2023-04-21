import { UserInfoType } from './user';

export interface SegmentRequestType {
  currentSegment: number,
  countPerSegment: number,
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
