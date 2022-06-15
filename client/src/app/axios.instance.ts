import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  LOCALSTORAGE_AC_TOKEN_KEY,
  LOCALSTORAGE_RF_TOKEN_KEY,
} from "../constants";
import { IDecodeToken } from "../interfaces";
const appAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default appAxios;

export const getAccessToken = async (): Promise<string | null> => {
  const accessToken: string | null = localStorage.getItem(
    LOCALSTORAGE_AC_TOKEN_KEY
  );
  if (accessToken) {
    const decode: IDecodeToken = jwt_decode(accessToken);
    const isExpire = decode.exp * 1000 < Date.now();
    if (isExpire) {
      const refreshToken = localStorage.getItem(LOCALSTORAGE_RF_TOKEN_KEY);
      const res = await appAxios.post("/refreshToken", {
        username: decode.username,
        refreshToken: refreshToken,
      });

      if (!res.data) return null;

      localStorage.setItem(LOCALSTORAGE_AC_TOKEN_KEY, res.data.accessToken);
      localStorage.setItem(LOCALSTORAGE_RF_TOKEN_KEY, res.data.refreshToken);

      return res.data.accessToken;
    } else {
      return accessToken;
    }
  } else {
    return null;
  }
};
