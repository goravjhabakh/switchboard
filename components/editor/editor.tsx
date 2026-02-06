'use client'

import { useSuspenseWorkflow } from "@/hooks/use-workflows"
import { ErrorView, LoadingView } from "../entity-components"

export const EditorLoading = () => {
  return (
    <LoadingView message="Loading editor..."/>
  )
}

export const EditorError = () => {
  return (
    <ErrorView message="Error loading editor!"/>
  )
}

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId)

  return (
    <div className="p-10">
      <pre>{JSON.stringify(workflow, null, 2)}</pre>
    </div>
  )
}