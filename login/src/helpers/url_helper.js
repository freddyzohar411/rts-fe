//LOGIN
export const POST_LOGIN = "/api/user/signin";
export const GET_LOGOUT = "/api/user/logout";
export const POST_PASSWORD_FORGET = "/api/user/signin";

//VALIDATE
export const GET_VALIDATE = "/api/user/validate";

// PROFILE
export const GET_USER_PROFILE = "/api/user/profile";

// PROFILE
export const LOGIN_RESET_PASSWORD = "/api/user/loginResetPassword";

// FORGET PASSWORD
export const forgetPassword = (email) => `/api/user/forget-password/${email}`

// Validate Reset Token
export const validateResetToken = (token) => "/api/user/validate-forget-password-token?token=" + token;

