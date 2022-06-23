import appAxios from "../app/axios.instance";
import { openNotificationWithIcon } from "../common/notification";
import {
  LOCALSTORAGE_AC_TOKEN_KEY,
  LOCALSTORAGE_RF_TOKEN_KEY,
} from "../constants";
import { ITokens } from "../interfaces";

export const login = async (
  username: string,
  password: string
): Promise<ITokens | undefined> => {
  try {
    const res = await appAxios.post("/login", {
      username,
      password,
    });

    if (!res.data) return undefined;

    const tokens: ITokens = res.data;
    localStorage.setItem("skill-lane-accessToken", tokens.accessToken);
    localStorage.setItem("skill-lane-refreshToken", tokens.refreshToken);

    return tokens;
  } catch (error: any) {
    if (error.response.data.error)
      openNotificationWithIcon("error", "Error", error.response.data.error);
    return undefined;
  }
};

export const register = async (
  username: string,
  password: string,
  confirmPassword: string,
  firstname: string,
  lastname: string,
  nickname: string,
  birthday: string,
  gender: string | undefined
): Promise<ITokens | undefined> => {
  try {
    const res = await appAxios.post("/register", {
      username,
      password,
      confirmPassword,
      firstname,
      lastname,
      nickname,
      birthday,
      gender,
    });

    if (!res.data) return undefined;

    const tokens: ITokens = res.data;
    localStorage.setItem("skill-lane-accessToken", tokens.accessToken);
    localStorage.setItem("skill-lane-refreshToken", tokens.refreshToken);

    return tokens;
  } catch (error: any) {
    if (error.response.data.error)
      openNotificationWithIcon("error", "Error", error.response.data.error);
    return undefined;
  }
};

export const logout = async (username: string): Promise<string | undefined> => {
  try {
    const res = await appAxios.delete(`/logout/${username}`);

    if (!res.data) return undefined;
    localStorage.removeItem(LOCALSTORAGE_AC_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_RF_TOKEN_KEY);
    return res.data;
  } catch (error: any) {
    if (error.response.data.error)
      openNotificationWithIcon("error", "Error", error.response.data.error);
    return undefined;
  }
};
