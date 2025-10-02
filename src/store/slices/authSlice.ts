import { API_AUTH } from "@/constants/api";
import { LoginSchema } from "@/constants/schemas/loginSchema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {
  setAuthCookies,
  clearAuthCookies,
  getTokenFromCookie,
  getRefreshTokenFromCookie,
} from "@/lib/cookies";

// ===== Types =====
interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
  [key: string]: unknown; // handle custom claims
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
  } catch (err) {
    console.error("Invalid JWT:", err);
  }
  return { accessToken, refreshToken, decoded };
};

// ===== Initial State =====
const initialState: AuthState = {
  user:
    typeof window !== "undefined" && getTokenFromCookie()
      ? buildUserFromTokens(
          getTokenFromCookie()!,
          getRefreshTokenFromCookie()!
        )
      : null,
  isPending: false,
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

// ===== Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      clearAuthCookies();
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
