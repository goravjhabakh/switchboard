import Client from "@/components/client"
import { Button } from "@/components/ui/button"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

const Home = async () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.hello.queryOptions())

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Switch Board</h1>
      <Button>Get Started</Button>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}
export default Home