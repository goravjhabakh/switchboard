import prisma from '@/lib/prisma'
import { protectedProcedure, createTRPCRouter } from '../init'

export const appRouter = createTRPCRouter({
  hello: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.auth.user.id
      }
    })
  })
})

export type AppRouter = typeof appRouter