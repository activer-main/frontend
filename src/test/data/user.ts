import { LoginResponseType } from 'types/response';

export const mockUserData: LoginResponseType = {
  user: {
    id: 1,
    email: '',
    verify: false,
    username: 'onandon',
    avatar: 'onandon',
    gender: 'onandon',
    birthday: new Date(2020, 6, 9),
    profession: 'onandon',
    phone: 'onandon',
    county: 'onandon',
    area: 'onandon',
  },
  token: {
    accessToken: 'test_token',
    expireIn: 52699,
  },
};
