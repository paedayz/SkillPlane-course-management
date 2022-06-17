export class RegisterBodyDto {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  nickname: string;
  birthday: string;
  gender: string;
}

export class LoginBodyDto {
  username: string;
  password: string;
}

export class RefreshTokenBodyDto {
  username: string;
  refreshToken: string;
}
