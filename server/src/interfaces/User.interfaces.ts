import { ITokens } from ".";


export interface IUserService {
    register(username: string, password: string, confirmPassword: string): Promise<ITokens>
    login(username: string, password: string): Promise<ITokens>
    refreshToken(refreshToken: string, username: string): Promise<ITokens>
}

export interface ISaveUserEntity {
    username: string;
    hashPassword: string;
    role: string;
}