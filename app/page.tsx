'use client'

import Logout from "@/components/auth/logout"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const Home = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
    }
  }))

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Switch Board</h1>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>Create Workflow</Button>
      <pre className="bg-muted">{JSON.stringify(data, null, 2)}</pre>
      <Logout />
    </div>
  )
}
export default Home