'use client'

import { useSuspenseWorkflows, useCreateWorkflow } from "@/hooks/use-workflows"
import { EntityContainer, EntityHeader } from "./entity-components"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  return (
    <div className="flex-1 flex justify-center items-center">
      <pre>
        {JSON.stringify(workflows.data, null, 2)}
      </pre>
    </div>
  )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow()
  const { handlerError, modal } = useUpgradeModal()
  const router = useRouter()

  const handleCreate = () => createWorkflow.mutate(undefined, {
    onSuccess: (data) => {
      router.push(`/workflows/${data.id}`)
    },
    onError: (error) => {
      handlerError(error)
    }
  })

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        disabled={disabled}
        newButtonLabel="New Workflow"
        onNew={handleCreate}
        isCreating={createWorkflow.isPending}
      />
    </>
  )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  )
}