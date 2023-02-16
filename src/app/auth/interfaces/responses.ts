import { User, UserLogin } from "./user";

export interface UserResponse {
  user: User;
}

export interface UserLoginResponse {
  user: UserLogin;
}

export interface TokenResponse {
  accessToken: string;
}
