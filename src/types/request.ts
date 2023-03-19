export interface SegmentRequestType {
  currentSegment: number,
  countSegment: number,
}

export interface RegisterRequestType {
  username: string,
  email: string,
  password: string
}

export interface LoginRequestType {
  email: string,
  password: string,
}
