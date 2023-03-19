import { Module } from 'vuex'

import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor
} from '@/service/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from '@/store/types'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCateegoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCateegoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCateegoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      //发送网络请求 请求数据
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCateegoryGoodsCount', categoryCountResult.data)

      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCateegoryGoodsSale', categorySaleResult.data)

      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCateegoryGoodsFavor', categoryFavorResult.data)

      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)
    }
  }
}

export default dashboardModule
