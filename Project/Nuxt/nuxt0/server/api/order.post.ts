import type { Order } from '@prisma/client'
import { OrderStatus } from '@prisma/client'
import { createOrder } from '../database/repositories/orderRepository'



export default defineEventHandler(async (e) => {
  // 课程id
  const { courseId, userInfoId } = await readBody(e)

  console.log('order.post.ts>userInfoId', userInfoId)
  debugger;
  // 构建订单实体
  const order = {
    courseId: Number(courseId),
    userId: userInfoId,
    createdAt: new Date(),
    status: OrderStatus.WAIT_CONFIRM,
  } as Order

  const o = await createOrder(order)

  return { ok: true, data: { orderId: o.id } }
})