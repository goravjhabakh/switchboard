import { cache } from "react"
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { polarClient } from "@/lib/polar"

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
  try {
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
  } catch (err) {
    console.error("Error in protectedProcedure:", err);
    throw err;
  }
})

export const premiumProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  try {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id
    })

    if (!customer.activeSubscriptions || customer.activeSubscriptions.length === 0) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You must have an active subscription to access this resource'
      })
    }

    return next({ ctx: { ...ctx, customer } })
  } catch (err) {
    console.error("Error in premiumProcedure:", err);
    throw err;
  }
})