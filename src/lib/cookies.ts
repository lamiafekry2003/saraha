import { setCookie, getCookie, deleteCookie } from "cookies-next";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const setAuthCookies = (user: { accessToken: string; refreshToken: string }) => {
  setCookie(ACCESS_TOKEN, user.accessToken, { maxAge: 60 * 60 * 24 * 7 });
  setCookie(REFRESH_TOKEN, user.refreshToken, { maxAge: 60 * 60 * 24 * 7 });
};

export const getTokenFromCookie = () => {
  return getCookie(ACCESS_TOKEN) as string | null;
};

export const getRefreshTokenFromCookie = () => {
  return getCookie(REFRESH_TOKEN) as string | null;
};

export const clearAuthCookies = () => {
  deleteCookie(ACCESS_TOKEN);
  deleteCookie(REFRESH_TOKEN);
};
