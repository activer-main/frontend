import { CommentDataType, TagDataType } from 'types/data';
import { ActivityDataType } from './data';
import { orderByUnion, sortByUnion } from './request';
import { UserInfoType, TokenType } from './user';

export interface SegmentResponseType {
  orderBy: orderByUnion;
  sortBy: sortByUnion;
  countPerPage: number;
  page: number;
  totalPage: number;
  totalData: number;
}

export interface ActivityResponseType extends SegmentResponseType {
  searchData: ActivityDataType[] | null;
}

export interface SearchResponseType extends SegmentResponseType {
  keyword: string | null;
  tags: TagDataType[] | null;
  date: string | null;
  searchData: ActivityDataType[];
}

export interface LoginResponseType {
  user: UserInfoType;
  token: TokenType;
}
export type RegisterResponseType = LoginResponseType;

export interface ManageFilterValueResponseType {
  tags: TagDataType[];
  status: string[];
}

export interface ErrorResponseType {
  data: {
    statusCode: number;
    message: string;
  }
}

export interface ActivityCommentResponseType extends SegmentResponseType {
  activityId: string;
  searchData: CommentDataType[];
  userComment: CommentDataType | null;
}
