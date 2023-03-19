import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  //触发handleQueryClick事件后将搜索框中的内容queryInfo传给page-content里的网络请求
  const handleQueryClick = (queryInfo: any) => {
    // console.log({ ...queryInfo })
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
