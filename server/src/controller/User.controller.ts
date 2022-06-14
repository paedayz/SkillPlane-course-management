import { NextFunction, Request, Response } from "express"
import { LoginBodyDto, RefreshTokenBodyDto, RegisterBodyDto } from "../dto"
import { ITokens } from "../interfaces"
import { UserService } from "../service"

export class UserController {
    private userService = new UserService()

    async register(request: Request, response: Response, next: NextFunction): Promise<ITokens> {
        const body: RegisterBodyDto = request.body
        return await this.userService.register(body.username, body.password, body.confirmPassword)
    }

    async login(request: Request, response: Response, next: NextFunction): Promise<ITokens> {
        const body: LoginBodyDto = request.body
        return await this.userService.login(body.username, body.password)
    }

    async refreshToken(request: Request, response: Response, next: NextFunction): Promise<ITokens> {
        const body: RefreshTokenBodyDto = request.body
        return await this.userService.refreshToken(body.refreshToken, body.username)
    }
}