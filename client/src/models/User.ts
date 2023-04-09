export interface IUser {
  username: string;
  password: string;
  createdAt?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
}

export interface IUserInitialInfo {
  user: IUser | any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
