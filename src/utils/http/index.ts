import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig
} from "axios";
// import { ResultEnum } from "@/enums/request-enum"; // ContentTypeEnum,
import NProgress from "../progress";
import { showFailToast } from "vant";
import "vant/es/toast/style";
import { useUserStore } from "@/store/modules/user-info";
// import { useRouter } from "vue-router";

// 默认 axios 实例请求配置
const configDefault = {
  // headers: {
  //   "Content-Type": ContentTypeEnum.FORM_URLENCODED
  // },
  timeout: 0,
  baseURL: "admin",
  data: {}
};

// 设置默认前缀
// const prefix = "admin";
// axios.defaults.baseURL = prefix;
// axios.defaults.headers.common["Accept-Language"] =
//   localStorage.getItem("lang") || "en";
// axios.defaults.timeout = 30000;

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance;
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start();
        const userStore = useUserStore();
        config.headers["accept-language"] = userStore.i18nLocale;

        // 发送请求前，可在此携带 token
        if (userStore.accessToken) {
          config.headers["we-services-token"] = userStore.accessToken;
        }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message);
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        // 与后端协定的返回字段
        const { code } = response.data;
        // const { message } = response.data;
        // 判断请求是否成功
        const isSuccess = code === 0;
        // result &&
        // Reflect.has(response.data, "code") &&
        // code === ResultEnum.SUCCESS;
        if (isSuccess) {
          return response.data;
        } else {
          // 处理请求错误
          // showFailToast(message);
          return Promise.reject(response.data);
        }
      },
      (error: AxiosError) => {
        NProgress.done();
        // 处理 HTTP 网络错误
        // let message = "";
        // HTTP 状态码
        const status = error.response?.status;
        // switch (status) {
        //   case 400:
        //     message = "请求错误";
        //     break;
        //   case 401:
        //     message = "未授权，请登录";
        //     break;
        //   case 403:
        //     message = "拒绝访问";
        //     break;
        //   case 404:
        //     message = `请求地址出错: ${error.response?.config?.url}`;
        //     break;
        //   case 408:
        //     message = "请求超时";
        //     break;
        //   case 500:
        //     message = "服务器内部错误";
        //     break;
        //   case 501:
        //     message = "服务未实现";
        //     break;
        //   case 502:
        //     message = "网关错误";
        //     break;
        //   case 503:
        //     message = "服务不可用";
        //     break;
        //   case 504:
        //     message = "网关超时";
        //     break;
        //   case 505:
        //     message = "HTTP版本不受支持";
        //     break;
        //   default:
        //     message = "网络连接故障";
        // }

        // showFailToast({
        //   message: (error.response.data as { msg: string }).msg,
        //   wordBreak: "normal"
        // });
        showFailToast(
          (error.response.data as { msg: string }).msg || "服务器无响应"
        );
        // 跳转登录
        if (status === 401) {
          const userStore = useUserStore();
          userStore.clearLock();
          // const router = useRouter();
          // router.push("/login"); // 使用编程式跳转
          window.location.href = "/login"; // 临时替代 router
        }

        return Promise.reject(error);
      }
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // 通用请求函数
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const http = new Http(configDefault);
