export interface UserDataType {
  loading: boolean,
  userInfo?: UserInfoType, // for user object
  userToken?: TokenType, // for storing the JWT
  error: any,
  success: boolean, // for monitoring the registration process.
}

export interface UserInfoType {
  id: string;
  email: string | null;
  emailVerified: boolean | null;
  username: string | null;
  avatar: string | null;
  gender: string | null;
  birthday: string | null;
  profession: {
    id: number;
    profession: string | null;
  }[];
  phone: string | null;
  county: string | null;
  area: string | null;
}

export interface TokenType {
  accessToken: string | null;
  expireAt: Date;
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
  birthday: { value: string };
  phone: { value: string };
  county: { value: string };
  area: { value: string };
};
