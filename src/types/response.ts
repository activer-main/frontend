import { ActivityDataType } from './data';
import { UserInfoType, TokenType } from './user';

export interface SegmentResponseType {
  maxSegment: number;// maximun request page
  minSegment: number;// minimun request page
  currentSegment: number;// current page
  countPerSegment: number; // max number of data in its page
  totalCount: number; // total data
}

export interface ActivityResponseType extends SegmentResponseType {
  searchResultData: ActivityDataType[];
}

export interface LoginResponseType {
  user: UserInfoType;
  token: TokenType;
}
export type RegisterResponseType = LoginResponseType;
