export interface SegmentRequestType {
  page? :number;
  countPerPage?: number;
}

export enum sortByUnion {
  CREATEDAT = 'CreatedAt',
  TREND = 'Trend',
  ADDTIME = 'AddTime',
}
export enum orderByUnion { DESC = 'descending', ASC = 'ascending'}

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
