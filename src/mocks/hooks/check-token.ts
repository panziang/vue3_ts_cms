import localCache from '@/utils/localCache'
export function checkToken(res: any, ctx: any) {
  const token = localCache.getCache('token')
  if (!token) {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized'
      })
    )
  }
}
