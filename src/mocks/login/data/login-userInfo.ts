export const userInfoList = [
  {
    code: 0,
    data: {
      id: 1,
      name: 'admin',
      realname: 'admin',
      cellphone: 18812345678,
      enable: 1,
      createAt: '2021-01-02T10:20:26.000Z',
      updateAt: '2021-01-03T04:50:13.000Z',
      role: {
        id: 1,
        name: '超级管理员',
        intro: '所有权限',
        createAt: '2021-01-02T10:01:52.000Z',
        updateAt: '2021-01-02T10:01:52.000Z'
      },
      department: {
        id: 1,
        name: '总裁办',
        parentId: null,
        createAt: '2021-01-02T10:03:09.000Z',
        updateAt: '2021-01-05T08:25:46.000Z',
        leader: 'coderwhy'
      }
    }
  },
  {
    code: 0,
    data: {
      id: 2,
      name: 'user',
      realname: 'test',
      cellphone: 16655552222,
      enable: 1,
      createAt: '2021-08-23T07:25:02.000Z',
      updateAt: '2021-08-23T07:25:09.000Z',
      role: {
        id: 3,
        name: '运营',
        intro: '日常事务',
        createAt: '2021-01-05T11:47:42.000Z',
        updateAt: '2021-01-05T11:50:11.000Z'
      },
      department: {
        id: 3,
        name: '运营部',
        parentId: 1,
        createAt: '2021-01-02T10:03:42.000Z',
        updateAt: '2021-01-05T08:25:52.000Z',
        leader: 'lucy'
      }
    }
  }
]
