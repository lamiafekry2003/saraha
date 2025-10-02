const BASE_URL =`http://ec2-16-170-67-164.eu-north-1.compute.amazonaws.com`;
const BASE_AUTH =`${BASE_URL}/api/auth`;
// auth
export const API_AUTH = {
    register: `${BASE_AUTH}/signUp`,
    confirmEmail: `${BASE_AUTH}/confirm-email`,
    loginWithGmail: `${BASE_AUTH}/loginWithGmail`,
    login: `${BASE_AUTH}/login`,
    refreshToken: `${BASE_AUTH}/refresh-token`,
    logout: `${BASE_AUTH}/logout`,
}
// user

// message