import { ActivityDataType } from './data';

export interface SegmentRequestType {
  orderby?: string ;
  page? :number;
  countPerPage?: number;
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

export type UserUpdateRequestType = {
  username?: string | null;
  gender? : string | null;
  birthday?: string | null;
  profession? : string[] | null;
  phone?: string | null;
  county?: string | null;
  area?: string | null;
};

export type VerifyRequestType = {
  verifyCode: string,
};

export interface SearchRequestType extends SegmentRequestType {
  keyword: string,
  tags: string[],
  date: string,
}

export enum sortByUnion {'createdAt', 'title', 'activityClickedCount'}
export enum orderByUnion { 'descending', 'ascending'}
export interface ActivitiesRequestType extends SegmentRequestType {
  sortBy: sortByUnion;
  orderBy: orderByUnion;
}

export type ActivityStatusRequestType = { activityId: ActivityDataType['id']; status: ActivityDataType['status'] };
