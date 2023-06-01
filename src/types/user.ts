export interface UserDataType {
  loading: boolean,
  userInfo?: UserInfoType, // for user object
  userToken?: TokenType, // for storing the JWT
  error: any,
  success: boolean, // for monitoring the registration process.
  changed: boolean
}

export interface UserInfoType {
  id: string;
  email: string | null;
  emailVerified: boolean | null;
  username: string | null;
  avatar: string | null;
  gender: string | null;
  birthday: string | null;
  professions: ProfessionType[] | null;
  phone: string | null;
  county: string | null;
  area: string | null;
}

export interface LocationType {
  id: number;
  cityName: string;
  cityEngName: string;
  areas:[
    { id: number,
      zipCode: string,
      areaName:string,
      areaEngName: string },
  ]
}

export interface ProfessionType {
  id: number;
  profession: string;
}

export interface TokenType {
  accessToken: string | null;
  expireAt: Date;
}
