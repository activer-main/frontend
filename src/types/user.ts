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
  username: string;
  avatar: string | null;
  gender: string | null;
  birthday: Date | null;
  profession: string | null;
  phone: string | null;
  county: string | null;
  area: string | null;
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

export type ProfileFormDataType = {
  avatar: { value: string | undefined }// TODO: remove undefined
  username: { value: string };
  gender:{ value: string };
  profession: { value: string };
  birthday: { value: Date };
  phone: { value: string };
  county: { value: string };
  area: { value: string };
};
