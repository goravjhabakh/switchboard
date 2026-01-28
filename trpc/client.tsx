'use client'

import { createTRPCContext } from "@trpc/tanstack-react-query"
import type { AppRouter } from './routers/_app'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { makeQueryClient } from "./query-client"
import { useState } from "react"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import superjson from 'superjson'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient;

const getQueryClient = () => {
  if (typeof window === undefined) {
    return makeQueryClient()
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient
}

const getURL = () => {
  const base = (() => {
    if (typeof window !== 'undefined') return ''
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
  })()

  return `${base}/api/trpc`
}

export const TRPCReactProvider = (props: Readonly<{ children: React.ReactNode }>) => {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() => createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        transformer: superjson,
        url: getURL()
      })
    ]
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}