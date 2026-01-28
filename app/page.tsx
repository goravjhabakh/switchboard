'use client'

import Logout from "@/components/auth/logout"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const Home = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("Workflow created")
    }
  }))

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success("AI Job Queued")
    },
    onError: () => {
      toast.error("Failed to queue AI Job")
    }
  }))

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Switch Board</h1>
      <Button onClick={() => create.mutate()} disabled={create.isPending} size={"sm"}>Create Workflow</Button>
      <Button onClick={() => testAi.mutate()} disabled={testAi.isPending} size={"sm"}>Test AI</Button>
      {data && <pre className="bg-muted">{JSON.stringify(data, null, 2)}</pre>}
      <Logout />
    </div>
  )
}
export default Home