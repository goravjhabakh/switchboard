import { WorkflowsContainer, WorkflowsError, WorkflowsList, WorkflowsLoading } from "@/components/workflows"
import { requireAuth } from "@/lib/auth/auth-utils"
import { workflowsParamsLoader } from "@/lib/workflows/params-loader"
import { prefetchWorkflows } from "@/trpc/prefetch/workflow"
import { HydrateClient } from "@/trpc/server"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

type Props = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
  await requireAuth()

  const params = await workflowsParamsLoader(searchParams)
  prefetchWorkflows(params)

  return (
    <div className="h-full">
      <WorkflowsContainer>
        <HydrateClient>
          <ErrorBoundary fallback={<WorkflowsError />}>
            <Suspense fallback={<WorkflowsLoading />}>
              <WorkflowsList />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </WorkflowsContainer>
    </div>
  )
}
export default Page