import { baseProcedure, createTRPCRouter } from '../init'

export const appRouter = createTRPCRouter({
  hello: baseProcedure.query(() => {
    return { message: 'TRPC is working!' }
  })
})

export type AppRouter = typeof appRouter