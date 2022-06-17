import { ITokens } from ".";

// first name, last name, nickname, birthday, gender
export interface IUserService {
  register(
    username: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    nickname: string,
    birthday: Date,
    gender: string
  ): Promise<ITokens>;
  login(username: string, password: string): Promise<ITokens>;
  getUserCredentials(username: string): Promise<IUserCredentials>;
  refreshToken(refreshToken: string, username: string): Promise<ITokens>;
  logout(username: string): Promise<string>;
}

export interface ISaveUserEntity {
  username: string;
  hashPassword: string;
  role: string;
  firstname: string;
  lastname: string;
  nickname: string;
  birthday: Date;
  gender: string;
}

export interface IUserCredentials {
  username: string;
  role: string;
  firstname: string;
  lastname: string;
  nickname: string;
  birthday: Date;
  gender: string;
}
