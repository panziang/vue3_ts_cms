import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'normalize.css'
import './assets/css/index.less'
// import './service/axios_demo.ts'

import App from './App.vue'

import router from './router'
import store from './store'
import hyRequest from './service'
import { setupStore } from './store'
import { globalRegister } from './global'

const app = createApp(App)

//全局使用elemen-plus的icon
for (const iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName])
}

app.use(store)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(globalRegister)
setupStore()
app.use(router)

app.mount('#app')

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的res')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
