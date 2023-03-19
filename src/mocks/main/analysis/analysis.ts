import { rest } from 'msw'
import { checkToken } from '@/mocks/hooks/check-token'

import { goodsAmountList } from './data/goods-amount-list'
import { categoryGoodsCount } from './data/category-goods-count'
import { categoryGoodsSale } from './data/category-goods-sale'
import { categoryGoodsFavor } from './data/category-goods-favor'
import { addressGoodsSale } from './data/address-goods-sale'

enum MockDashboardAPI {
  goodsAmountList = '/mock/goods/amount/list',
  categoryGoodsCount = '/mock/goods/category/count',
  categoryGoodsSale = '/mock/goods/category/sale',
  categoryGoodsFavor = '/mock/goods/category/favor',
  addressGoodsSale = '/mock/goods/address/sale'
}

export const analysisHandlers = [
  rest.get(MockDashboardAPI.goodsAmountList, (req, res, ctx) => {
    checkToken(res, ctx)
    return res(ctx.status(200), ctx.json(goodsAmountList))
  }),
  rest.get(MockDashboardAPI.categoryGoodsCount, (req, res, ctx) => {
    checkToken(res, ctx)
    return res(ctx.status(200), ctx.json(categoryGoodsCount))
  }),
  rest.get(MockDashboardAPI.categoryGoodsSale, (req, res, ctx) => {
    checkToken(res, ctx)
    return res(ctx.status(200), ctx.json(categoryGoodsSale))
  }),
  rest.get(MockDashboardAPI.categoryGoodsFavor, (req, res, ctx) => {
    checkToken(res, ctx)
    return res(ctx.status(200), ctx.json(categoryGoodsFavor))
  }),
  rest.get(MockDashboardAPI.addressGoodsSale, (req, res, ctx) => {
    checkToken(res, ctx)
    return res(ctx.status(200), ctx.json(addressGoodsSale))
  })
]
