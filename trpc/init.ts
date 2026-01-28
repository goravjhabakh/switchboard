import { cache } from "react"
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const createTRPCContext = cache(async () => {
  return { health: 'API is working' }
})

const t = initTRPC.create({
  transformer: superjson
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource'
    })
  }

  return next({ ctx: { ...ctx, auth: session } })
})