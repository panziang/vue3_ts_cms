import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface YNRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface YNRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YNRequestInterceptors<T>
  showLoading?: boolean
}

export type { YNRequestInterceptors, YNRequestConfig }
