export interface User {
  username?: string;
  email: string;
  password: string;
  _id: string;
  __v: number;
}
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}
export interface LogoutResponse {
  message: string;
}

export interface SignupResponse {
  user: User;
  token: string;
  refreshToken: string;
}
