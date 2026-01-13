export interface ApiResponseI<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export interface UserI {
  id: string;
  name: string;
  email: string;
  isAccountVerified: boolean;
  isTwoFactorEnabled: boolean;
}

export interface LoginResponseI {
  msg: string;
  user: UserI;
  accessToken: string;
}
