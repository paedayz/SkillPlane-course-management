import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { ISaveUserEntity, ITokens, IUserService } from "../interfaces";
import * as jwt from 'jsonwebtoken'
import { at_secret, rt_secret } from "../../config";
import * as bcrypt from 'bcrypt'

export class UserService implements IUserService {
    
    private userRepository = AppDataSource.manager.getRepository(User)

    async register(username: string, password: string, confirmPassword: string): Promise<ITokens> {
        
        try {
            if(password !== confirmPassword) throw new Error('Password not match')

            const role = 'user'

            const hashPassword = await this.hashData(password)

            const saveUserData: ISaveUserEntity = {
                username,
                hashPassword,
                role
            }

            await this.userRepository.save(saveUserData)

            const tokens = await this.getTokens(username, role)

            await this.updateRefreshTokenHash(username, tokens.refreshToken)
            return tokens
        } catch (error) {
            console.log(error)
        }

        
    }

    async login(username: string, password: string): Promise<ITokens> {
        const user = await this.userRepository.findOne({
            where: [
                {username}
            ]
        })
        
        if(!user) throw new Error('User not found')

        const passwordmatches = await bcrypt.compare(password, user.hashPassword)
        if(!passwordmatches) throw new Error('Password not matches')

        const tokens = await this.getTokens(user.username, user.role)
        await this.updateRefreshTokenHash(user.username, tokens.refreshToken)

        return tokens
    }

    async refreshToken(refreshToken: string, username: string): Promise<ITokens> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    username 
                }
            })
            if(!user || !user.hashRefreshToken || !refreshToken) throw new Error('Access Denied')

            const rtMatches = await bcrypt.compare(refreshToken, user.hashRefreshToken)
            if(!rtMatches) throw new Error('Access Denied')

            const tokens = await this.getTokens(user.username, user.role)
            await this.updateRefreshTokenHash(user.username, tokens.refreshToken)

            return tokens
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async logout(username: string): Promise<string> {
        try {
            await this.userRepository.update({
                username
            }, {
                hashRefreshToken: null
            })
            return 'Logout successfully'
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }
    
    private async getTokens(username: string, role: string): Promise<ITokens> {
        const [at, rt] = await Promise.all([
            // access token
            jwt.sign({
                username,
                role
            },
            rt_secret,
            {
                expiresIn: '1h'
            }
            ),

            // refresh token
            jwt.sign({
                username,
                role
            },
            at_secret,
            {
                expiresIn: '7d'
            }
            ),

        ])

        return {
            accessToken: at,
            refreshToken: rt
        }
    }

    private async updateRefreshTokenHash(username: string, refreshToken: string) {
        const hashRefreshToken = await this.hashData(refreshToken)
        await this.userRepository.update({
            username
        }, {
            hashRefreshToken
        })
    }

    private async hashData(data: string): Promise<string> {
        return await bcrypt.hash(data, 10)
    }
    
}