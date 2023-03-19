import axios, { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'

const DEAFULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    //默认显示loading 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    //使用拦截器
    //1.从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //2.添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器，请求成功拦截')

        if (this.showLoading) {
          //添加loading
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求....',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器，请求失败拦截')
        return err
      }
    ),
      this.instance.interceptors.response.use(
        (res) => {
          // console.log('所有实例都有的拦截器，响应成功拦截')
          //移除loading
          this.loading?.close()
          //HttpErrorCode不报错，但是返回的数据为空
          const data = res.data
          if (data.returnCode === '-1001') {
            console.log('请求失败~, 错误信息')
          } else {
            return data
          }
        },
        (err) => {
          // console.log('所有实例都有的拦截器，响应失败拦截')
          //移除loading
          this.loading?.close()

          //例子：判断不同的HttpErrorCode显示不同的错误信息
          if (err.response.status === 404) {
            console.log('404错误~')
          }
          return err
        }
      )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    //b.将T传入到HYRequestConfig，再传给HYRequestInterceptor
    return new Promise<T>((resolve, reject) => {
      //1.单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      //2.判断是否显示loading 当传入的showLoading为false时，传给this.showLoading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //拿到的结果类型是T
          //1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            //a.这里要求传入的类型为AxiosResponse,与T不匹配，所以在上方b处传T
            res = config.interceptors?.responseInterceptor(res)
          }

          //2.再将showLoading设置为默认状态true，不然会影响下一次请求
          this.showLoading = DEAFULT_LOADING

          //3.再将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          //再将showLoading设置为默认状态true，不然会影响下一次请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
