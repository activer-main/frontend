import { TagDataType } from 'types/data';
import { orderByUnion, sortByUnion } from './request';

export interface SegmentResponseType {
  orderBy: orderByUnion;
  sortBy: sortByUnion;
  countPerPage: number;
  page: number;
  totalPage: number;
  totalData: number;
}

export interface ErrorResponseType {
  data: {
    statusCode: number;
    message: string;
  }
}
