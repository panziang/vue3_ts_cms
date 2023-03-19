import { rest } from 'msw'
import type { ILoginBody, ILoginResponse } from './types'

import { checkToken } from '@/mocks/hooks/check-token'

import { loginTokenList } from './data/login-token'
import { userInfoList } from './data/login-userInfo'
import { userMenusList } from './data/login-userMenus'

enum MockLoginAPI {
  AccountLogin = '/mock/login',
  LoginUserInfo = '/mock/users',
  UserMenus = '/mock/role'
}

export const loginHandlers = [
  rest.post<ILoginBody, ILoginResponse>(
    MockLoginAPI.AccountLogin,
    async (req, res, ctx) => {
      const { name, password } = await req.json()
      if (name === 'admin' || password === '123456') {
        return res(ctx.status(200), ctx.json(loginTokenList[0]))
      } else if (name === 'user' || password === '123456') {
        return res(ctx.status(200), ctx.json(loginTokenList[0]))
      } else {
        return res(ctx.status(400))
      }
    }
  ),
  rest.get(`${MockLoginAPI.LoginUserInfo}/:id`, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    const { id } = req.params
    const data = userInfoList[Number(id) - 1]
    if (data) {
      return res(ctx.status(200), ctx.json(data))
    } else {
      return res(ctx.status(500))
    }
  }),
  rest.get(`${MockLoginAPI.UserMenus}/:id/menu`, (req, res, ctx) => {
    const result = checkToken(res, ctx)
    if (result) return result
    const { id } = req.params
    const data = userMenusList[Number(id) - 1]
    if (data) {
      return res(ctx.status(200), ctx.json(data))
    } else {
      return res(ctx.status(500))
    }
  })
]
