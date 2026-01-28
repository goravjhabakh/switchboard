import { createTRPCRouter } from '../init'
import { workflowsRouter } from './workflow'

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter
})

export type AppRouter = typeof appRouter