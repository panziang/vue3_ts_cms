import { rest } from 'msw'
import { checkToken } from '@/mocks/hooks/check-token'

import { usersList } from './data/users-list'
import { roleList } from './data/role-list'
import { goodsList } from './data/goods-list'
import { menuList } from './data/menu-list'
import { departmentList } from './data/department-list'
import { categoryList } from './data/category-list'
import { storyList } from './data/story-list'

enum MockSystemAPI {
  usersList = '/mock/users/list',
  roleList = '/mock/role/list',
  goodsList = '/mock/goods/list',
  menuList = '/mock/menu/list',
  departmentList = '/mock/department/list',
  categoryList = '/mock/category/list',
  storyList = '/mock/story/list'
}

export const systemHandlers = [
  rest.post(MockSystemAPI.usersList, (req, res, ctx) => {
    // cellphone: ''
    // createAt: ''
    // enable: ''
    // id: 'use'
    // name: ''
    // offset: 0
    // realname: ''
    // size: 10
    const result = checkToken(res, ctx)
    if (result) return result
    return res(ctx.status(200), ctx.json(usersList))
  }),
  rest.post(MockSystemAPI.roleList, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    return res(ctx.status(200), ctx.json(roleList))
  }),
  rest.post(MockSystemAPI.goodsList, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    return res(ctx.status(200), ctx.json(goodsList))
  }),
  rest.post(MockSystemAPI.menuList, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    return res(ctx.status(200), ctx.json(menuList))
  }),
  rest.post(MockSystemAPI.departmentList, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    return res(ctx.status(200), ctx.json(departmentList))
  }),
  rest.post(MockSystemAPI.categoryList, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    return res(ctx.status(200), ctx.json(categoryList))
  }),
  rest.post(MockSystemAPI.storyList, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    return res(ctx.status(200), ctx.json(storyList))
  })
]
