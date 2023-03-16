import { ActivityResponseType } from '../types/response';
import { SegmentRequestType } from '../types/request';
import dummyActivityResponse from './dummyActivityResponse.json';

// eslint-disable-next-line
export function getTrendActivity({ currentSegment, countSegment }: SegmentRequestType)
  : ActivityResponseType {
  return dummyActivityResponse;
}
// eslint-disable-next-line
export function getNewActivity({ currentSegment, countSegment }: SegmentRequestType)
  : ActivityResponseType {
  return dummyActivityResponse;
}
