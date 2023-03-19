import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router'

import { IAccount } from '@/service/login/types'
import { ILoginState } from './types'
import { IRootState } from '../types'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus=>routes
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(
        (route) => {
          router.addRoute('main', route)
        }
        //将routes=>router.main.children
      )

      //获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // console.log('accountLoginAction', payload)
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)

      //将token保存至本地
      localCache.setCache('token', token)

      //发送初始化请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })

      //2.请求用户信息
      const userInfoResult = await requestUserById(id)
      // console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      //将userInfo保存至本地
      localCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      // console.log(userMenus)
      commit('changeUserMenus', userMenus)
      //将userMenus保存至本地
      localCache.setCache('userMenus', userMenus)

      //4.转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }

    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('phoneLoginAction', payload)
    // }
  },
  getters: {}
}

export default loginModule
