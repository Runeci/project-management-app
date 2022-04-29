export interface UserAuth {
  name: string;
  login: string;
  password: string;
}

export interface UserResponse {
  token: string;
}

export interface UserInfo {
  id: string;
  login: string;
  name: string;
}
