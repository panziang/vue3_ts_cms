import { App } from 'vue'
import { formatUtcString } from '@/utils/date-utils'
export default function registerProperties(app: App) {
  //增加一个全局属性 格式化时间
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
