import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
  iat: number;
}

export const parseAccessToken = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
