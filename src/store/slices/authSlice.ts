import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { API_AUTH } from "@/constants/api";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import {
  setAuthCookies,
  clearAuthCookies,
  getTokenFromCookie,
  getRefreshTokenFromCookie,
} from "@/lib/cookies";

// types
import type { LoginSchema } from "@/constants/schemas/loginSchema";
import type { User } from "@/constants/types";
import type { RegisterSchema } from "@/constants/schemas/registerSchema";

// ===== Types =====
export interface DecodedToken extends User {
  sub: string;
  exp: number;
  iat: number;
}

interface Credentials {
  accessToken: string;
  refreshToken: string;
  decoded?: DecodedToken;
}

interface AuthResponse {
  message: string;
  data: {
    newCredential: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface AuthState {
  user: Credentials | null;
  isPending: boolean;
  isError: boolean;
}

// ===== Helper =====
const buildUserFromTokens = (
  accessToken: string,
  refreshToken: string
): Credentials => {
  let decoded: DecodedToken | undefined = undefined;

  try {
    decoded = jwtDecode<DecodedToken>(accessToken);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error("can't login at the momment");
  }

  return { accessToken, refreshToken, decoded };
};

// ===== Initial State =====
const initialState: AuthState = {
  user: null,
  isPending: true,
  isError: false,
};

// ===== Thunks =====
export const login = createAsyncThunk<Credentials, LoginSchema>(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(API_AUTH.login, values);
      const creds = response.data.data.newCredential;

      return buildUserFromTokens(creds.accessToken, creds.refreshToken);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
      return rejectWithValue("Login failed");
    }
  }
);

export const register = createAsyncThunk<Credentials, RegisterSchema>(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        API_AUTH.register,
        values
      );
      console.log(response);

      const creds = response.data.data.newCredential;

      return buildUserFromTokens(creds.accessToken, creds.refreshToken);
    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        const directError = error.response?.data?.error;
        const detailedError =
          error.response?.data?.details?.[0]?.details?.[0]?.message;

        return rejectWithValue(
          directError || detailedError || "Register failed"
        );
      }
      return rejectWithValue("Register failed");
    }
  }
);

export const initTokenCheck = createAsyncThunk(
  "auth/initTokenCheck",
  async () => {
    if (typeof window === "undefined") return null;

    const access = getTokenFromCookie();
    const refresh = getRefreshTokenFromCookie();

    return access && refresh ? buildUserFromTokens(access, refresh) : null;
  }
);

// ===== Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      clearAuthCookies();
    },
    setIsPinding: (state, { payload }: PayloadAction<boolean>) => {
      state.isPending = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isPending = false;
        state.isError = false;
        setAuthCookies(action.payload);
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isPending = false;
        state.isError = true;
      })

      // register a new user
      .addCase(register.pending, (state) => {
        state.isPending = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isPending = false;
      })
      .addCase(register.rejected, (state) => {
        state.user = null;
        state.isPending = false;
      })

      // check user at initial loading of the app
      .addCase(initTokenCheck.pending, (state) => {
        state.isPending = true;
      })
      .addCase(initTokenCheck.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isPending = false;
      })
      .addCase(initTokenCheck.rejected, (state) => {
        state.user = null;
        state.isPending = false;
      });
  },
});

export const { logout, setIsPinding } = authSlice.actions;
export default authSlice.reducer;
