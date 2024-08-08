import { request } from '../request';

/**
 * Login
 *
 * @param userAccount
 * @param userPassword
 */
export function fetchLogin(userAccount: string, userPassword: string) {
  return request<Api.Auth.LoginToken>({
    url: '/user/login',
    method: 'post',
    data: {
      userAccount,
      userPassword
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/user/get/login' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/user/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}
