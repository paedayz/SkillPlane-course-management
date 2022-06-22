import { NextFunction, Request, Response } from "express";
import { LoginBodyDto, RefreshTokenBodyDto, RegisterBodyDto } from "../dto";
import { ITokens } from "../interfaces";
import { UserService } from "../service";

export class UserController {
  private userService = new UserService();

  async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<ITokens| Error> {
    const body: RegisterBodyDto = request.body;
    return await this.userService.register(
      body.username,
      body.password,
      body.confirmPassword,
      body.firstname,
      body.lastname,
      body.nickname,
      new Date(body.birthday),
      body.gender
    );
  }

  async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<ITokens | Error> {
    const body: LoginBodyDto = request.body;
    return await this.userService.login(body.username, body.password);
  }

  async getUserCredentials(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const username = request['user'].username;
    return await this.userService.getUserCredentials(username)
  }

  async refreshToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<ITokens | Error> {
    const body: RefreshTokenBodyDto = request.body;
    return await this.userService.refreshToken(
      body.refreshToken,
      body.username
    );
  }

  async logout(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<string | Error> {
    const username = request.params.username
    return await this.userService.logout(username);
  }
}
