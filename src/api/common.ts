import { http } from "@/utils/http";

type ApiResult<T = any> = {
  code: number;
  message: string;
  data: T;
};

export function remote(type): Promise<ApiResult> {
  return http.request({
    url: "/dict/type/" + type,
    method: "get"
  });
}

export function companyFetchPage(data) {
  return http.request({
    url: "/company/page",
    method: "post",
    data
  });
}
