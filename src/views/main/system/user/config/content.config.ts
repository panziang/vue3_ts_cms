//用户管理页面table配置
export const contentTableConfig = {
  //表格上的header里的title
  title: '用户列表',

  propList: [
    {
      prop: 'name',
      label: '用户名',
      minWidth: '80',
      slotName: 'name'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '80',
      slotName: 'realname'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '100',
      slotName: 'cellphone'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '60',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '100',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '100',
      slotName: 'handler'
    }
  ],
  //表格序号
  showIndexColumn: true,
  //是否选中
  showSelectColumn: true
}
