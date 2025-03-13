import { http } from "@/utils/http";

const scope = "server";

type ApiResult<T = any> = {
  code: number;
  message: string;
  data: T;
};

// 登录接口
export function loginByUsername(
  username: string,
  password: string,
  code: string,
  randomStr: string
): Promise<ApiResult> {
  const grant_type = "password";
  return http.request({
    url: "/login",
    method: "post",
    data: {
      username,
      password,
      code,
      randomStr,
      grant_type,
      scope
    }
  });
}

// 获取用户信息
export function getUserInfo(): Promise<ApiResult> {
  return http.request({
    url: "/user/info",
    method: "get"
  });
}

// 注销退出登录
export function logout(): Promise<ApiResult> {
  return http.request({
    url: "/logout",
    method: "post"
  });
}

// 刷新 token（如需启用此接口）
export function refreshToken(refresh_token: string): Promise<ApiResult> {
  const grant_type = "refresh_token";
  return http.request({
    url: "/auth/oauth/token",
    method: "post",
    headers: {
      isToken: false,
      Authorization: "Basic aGlyZTpoaXJl"
    },
    params: {
      refresh_token,
      grant_type,
      scope
    }
  });
}

// 校验 Token（选配功能，可单独拆出去）
export function checkToken(token: string): Promise<ApiResult<{ exp: number }>> {
  return http.request({
    url: "/auth/oauth/check_token",
    method: "get",
    headers: {
      isToken: false,
      Authorization: "Basic aGlyZTpoaXJl"
    },
    params: { token }
  });
}
