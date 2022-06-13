import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { UserService } from "../service/User.service"
import { RegisterBodyDto } from "../dto"

export class UserController {
    private userService = new UserService()

    async register(request: Request, response: Response, next: NextFunction) {
        const body: RegisterBodyDto = request.body
        return await this.userService.register(body.username, body.password, body.confirmPassword)
    }


}