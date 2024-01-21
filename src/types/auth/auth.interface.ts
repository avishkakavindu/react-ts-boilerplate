export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUserInfo {
  user: { firstName: string; lastName: string };
  email: string;
}

export interface IAuthState {
  userInfo: IUserInfo | null;
}
