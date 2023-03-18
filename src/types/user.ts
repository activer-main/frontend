export interface UserDataType {
  id: number,
  email: string,
  verify: boolean,
  realName: string,
  nickName: string,
  avatar: string,
  gender: string,
  birthday: string,
  profession: string,
  phone: string,
  county: string,
  area: string,
  activityHistory: Array<string>,
  tagHistory: Array<string>
}
