// "use client";

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { buildUserFromTokens } from '@/store/slices/authSlice';
import useDispatch from '@/hooks/redux/useDispatch';
import { setCredentials } from '@/store/slices/authSlice';
import { AxiosError } from 'axios';
import axios from 'axios';
import { API_AUTH } from '@/constants/api';

interface GoogleLoginButtonProps {
  onSuccessRedirect?: string; 
  onError?: (message: string) => void;
}

export default function GoogleLoginButton({ onSuccessRedirect, onError }: GoogleLoginButtonProps) {
  const dispatch = useDispatch();

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) return onError?.("No token received from Google");

    try {
      const response = await axios.post(API_AUTH.loginWithGmail, { idToken: token });
      const newCredential = response.data.data.newCredential;
      if (!newCredential?.accessToken || !newCredential?.refreshToken)
        throw new Error("Invalid credentials returned from server");

      const user = buildUserFromTokens(newCredential.accessToken, newCredential.refreshToken);
      dispatch(setCredentials(user));

      if (onSuccessRedirect) window.location.href = onSuccessRedirect;

    } catch (error: unknown) {
      let message = "Google login failed. Try again.";
      if (error instanceof AxiosError) message = error.response?.data?.message || message;
      onError?.(message);
    }
  };

  return (
    <div className=' w-full flex justify-center'>
      <GoogleLogin
      onSuccess={handleLogin}
      onError={() => onError?.("Google login failed")}
      text="continue_with"
      locale="en"
      width={'500px'}
      logo_alignment="center"
      size='large'
    />
    </div>
  );
}
