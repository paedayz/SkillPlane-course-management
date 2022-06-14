import { NextFunction, Request, Response } from "express"
import { LoginBodyDto, RegisterBodyDto } from "../dto"
import { UserService } from "../service"

export class UserController {
    private userService = new UserService()

    async register(request: Request, response: Response, next: NextFunction) {
        const body: RegisterBodyDto = request.body
        return await this.userService.register(body.username, body.password, body.confirmPassword)
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const body: LoginBodyDto = request.body
        return await this.userService.login(body.username, body.password)
    }
}