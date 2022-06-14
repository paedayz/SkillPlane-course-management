export class RegisterBodyDto {
    username: string;
    password: string;
    confirmPassword: string
}

export class LoginBodyDto {
    username: string;
    password: string;
}

export class RefreshTokenBodyDto {
    username: string;
    refreshToken: string;
}