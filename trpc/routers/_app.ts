import prisma from '@/lib/prisma'
import { protectedProcedure, createTRPCRouter, premiumProcedure } from '../init'
import { inngest } from '@/inngest/client'

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany() ?? null
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'test@example.com'
      }
    })
    return { success: true, message: 'Job queued' }
  }),
  testAi: premiumProcedure.mutation(async () => {
    await inngest.send({ name: "execute/workflow" })
    return { success: true, message: 'Job queued' }
  })
})

export type AppRouter = typeof appRouter