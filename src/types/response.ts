import { ActivityDataType, TagDataType } from './data';
import { UserInfoType, TokenType } from './user';

export interface SegmentResponseType {
  maxPage: number;// maximun request page
  minPage: number;// minimun request page
  page: number;// current page
  per: number; // max number of data in its page
  count: number; // total data
}

export interface ActivityResponseType extends SegmentResponseType {
  searchResultData: ActivityDataType[];
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
