import { ActivityDataType, TagDataType } from './data';
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
  keyword: string;
  tags: TagDataType[];
  date: string;
  searchResultData: ActivityDataType[];
}

export interface LoginResponseType {
  user: UserInfoType;
  token: TokenType;
}
export type RegisterResponseType = LoginResponseType;
