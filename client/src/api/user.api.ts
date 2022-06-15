import appAxios, { getAccessToken } from "../app/axios.instance";
import { LOCALSTORAGE_AC_TOKEN_KEY, LOCALSTORAGE_RF_TOKEN_KEY } from "../constants";
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
    localStorage.setItem('skill-lane-accessToken', tokens.accessToken)
    localStorage.setItem('skill-lane-refreshToken', tokens.refreshToken)

    return tokens;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const register = async (
  username: string,
  password: string,
  confirmPassword: string
): Promise<ITokens | undefined> => {
  try {
    const res = await appAxios.post("/register", {
      username,
      password,
      confirmPassword,
    });

    if (!res.data) return undefined;

    const tokens: ITokens = res.data;
    localStorage.setItem('skill-lane-accessToken', tokens.accessToken)
    localStorage.setItem('skill-lane-refreshToken', tokens.refreshToken)

    return tokens;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const logout = async (): Promise<string | undefined> => {
    try {
        const accessToken = await getAccessToken()
        const res = await appAxios.delete('/logout', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if(!res.data) return undefined;
        localStorage.removeItem(LOCALSTORAGE_AC_TOKEN_KEY)
        localStorage.removeItem(LOCALSTORAGE_RF_TOKEN_KEY)
        return res.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}