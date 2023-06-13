import { ActivityDataType } from './data';

export interface SegmentRequestType {
  page? :number;
  countPerPage?: number;
}

export interface SearchRequestType extends SegmentRequestType {
  keyword: string,
  tags?: string[],
  date?: string,
  orderBy?: orderByUnion,
}

export enum sortByUnion {
  CREATEDAT = 'CreatedAt',
  TREND = 'Trend',
  ADDTIME = 'AddTime',
}
export enum orderByUnion { DESC = 'descending', ASC = 'ascending'}
export interface ActivitiesRequestType extends SegmentRequestType {
  tags?: string[];
  status?: string[] ;
  sortBy?: sortByUnion;
  orderBy?:orderByUnion;
}

export type ActivityStatusRequestType = { id: ActivityDataType['id']; status: ActivityDataType['status'] };

export type ResetPasswordRequestType = {
  email:string;
  token: string;
  password: string;
};

export interface TagsRequestType {
  key?: string;
  type?: string[];
}

export enum CommentSortbyUnion {
  ADDTIME = 'AddTime',
}

export interface ActivityCommentRequestType extends SegmentRequestType {
  activityId: string;
  orderBy?: orderByUnion;
  sortBy?: CommentSortbyUnion
}

export interface ActivityCommentPostRequestType {
  activityId: string;
  rate: number;
  content: string;
}
