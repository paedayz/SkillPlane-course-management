import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { ISaveUserEntity, ITokens, IUserCredentials, IUserService } from "../interfaces";
import * as jwt from "jsonwebtoken";
import { at_secret, rt_secret } from "../../config";
import * as bcrypt from "bcrypt";

export class UserService implements IUserService {
  private userRepository = AppDataSource.manager.getRepository(User);

  async register(
    username: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    nickname: string,
    birthday: Date,
    gender: string
  ): Promise<ITokens | Error> {
    try {
      if (password !== confirmPassword) return new Error("Password not match");

      const role = "user";

      const hashPassword = await this.hashData(password);

      const saveUserData: ISaveUserEntity = {
        username,
        hashPassword,
        role,
        firstname,
        lastname,
        nickname,
        birthday,
        gender,
      };

      await this.userRepository.save(saveUserData);

      const tokens = await this.getTokens(username, role);

      await this.updateRefreshTokenHash(username, tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.log(error);
      return new Error(error.message)
    }
  }

  async login(username: string, password: string): Promise<ITokens | Error> {
    const user = await this.userRepository.findOne({
      where: [{ username }],
    });

    if (!user) return new Error("User not found");

    const passwordmatches = await bcrypt.compare(password, user.hashPassword);
    if (!passwordmatches) return new Error("Password not matches");

    const tokens = await this.getTokens(user.username, user.role);
    await this.updateRefreshTokenHash(user.username, tokens.refreshToken);

    return tokens;
  }

  async getUserCredentials(username: string): Promise<IUserCredentials | Error> {
    const user = await this.userRepository.findOne({
        where: [{ username }],
      });
  
      if (!user) return new Error("User not found");

      const userCredentials: IUserCredentials = {
        username: user.username,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
        birthday: user.birthday,
        gender: user.gender,
      }

      return userCredentials
  }

  async refreshToken(refreshToken: string, username: string): Promise<ITokens | Error> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });
      if (!user || !user.hashRefreshToken || !refreshToken)
        return new Error("Access Denied");

      const rtMatches = await bcrypt.compare(
        refreshToken,
        user.hashRefreshToken
      );
      if (!rtMatches) return new Error("Access Denied");

      const tokens = await this.getTokens(user.username, user.role);
      await this.updateRefreshTokenHash(user.username, tokens.refreshToken);

      return tokens;
    } catch (error) {
      console.log(error)
      return new Error(error.message);
    }
  }

  async logout(username: string): Promise<string | Error> {
    try {
      await this.userRepository.update(
        {
          username,
        },
        {
          hashRefreshToken: null,
        }
      );
      return "Logout successfully";
    } catch (error) {
      console.log(error.message);
      return new Error(error.message);
    }
  }

  private async getTokens(username: string, role: string): Promise<ITokens> {
    const [at, rt] = await Promise.all([
      // access token
      jwt.sign(
        {
          username,
          role,
        },
        rt_secret,
        {
          expiresIn: "1h",
        }
      ),

      // refresh token
      jwt.sign(
        {
          username,
          role,
        },
        at_secret,
        {
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private async updateRefreshTokenHash(username: string, refreshToken: string) {
    const hashRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(
      {
        username,
      },
      {
        hashRefreshToken,
      }
    );
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
