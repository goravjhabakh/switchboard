import { WorkflowsContainer, WorkflowsList } from "@/components/workflows-list"
import { requireAuth } from "@/lib/auth-utils"
import { prefetchWorkflows } from "@/trpc/prefetch/workflow"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

const Page = async () => {
  await requireAuth()

  prefetchWorkflows()

  return (
    <div>
      <WorkflowsContainer>
        <HydrateClient>
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Suspense fallback={<p>Loading...</p>}>
              <WorkflowsList />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </WorkflowsContainer>
    </div>
  )
}
export default Page