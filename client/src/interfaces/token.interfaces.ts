export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IDecodeToken {
    username: string;
    exp: number;
    role: "user" | "admin";
  }