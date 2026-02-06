import { Editor, EditorError, EditorLoading } from "@/components/editor/editor"
import EditorHeader from "@/components/editor/editor-header"
import { requireAuth } from "@/lib/auth/auth-utils"
import { prefetchWorkflow } from "@/trpc/prefetch/workflow"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface PageProps {
  params: Promise<{
    workflowId: string
  }>
}

const Page = async ({ params }: PageProps) => {
  await requireAuth()
  const { workflowId } = await params
  prefetchWorkflow(workflowId)

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId}/>
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}
export default Page