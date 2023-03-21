export interface UserDataType {
  loading: boolean,
  userInfo: UserInfoType | null, // for user object
  userToken: TokenType | null, // for storing the JWT
  error: any,
  success: boolean, // for monitoring the registration process.
}

export interface UserInfoType {
  id: number;
  email: string;
  verify: boolean;
  realName: string;
  nickName: string;
  avatar: string;
  gender: string;
  birthdat: Date;
  profession: string;
  phone: string;
  county: string;
  area: string;
  activityHistory: string[];
  tagHistory: string[];
}

export interface TokenType {
  accessToken: string;
  expireIn: number;
}

export type RegisterFormDataType = {
  username:{ value: string };
  email: { value: string };
  password: { value: string };
  confirmPassword: { value: string };
};

export type LoginFormDataType = {
  email: { value: string };
  password: { value: string };
};
