import hyRequest from '../../index'

import { IDataType } from '../../types'
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

//删除操作
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}

//新增、编辑
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
