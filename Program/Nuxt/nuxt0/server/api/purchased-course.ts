// import { isNuxtError } from 'nuxt/app'
import { createError } from 'h3'
import { getCoursesByUser } from '../database/repositories/orderRepository'
import { getTokenInfo } from '../database/service/token'
export default defineEventHandler(async (e) => {
  try {
    const token = getTokenInfo(e)

    if (!token) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: '请先登录!',
      }))
    }

    const courses = await getCoursesByUser(token.id)

    return { ok: true, data: courses }
  }
  catch (error) {
    return sendError(e, createError('获取数据失败'))
  }
})
