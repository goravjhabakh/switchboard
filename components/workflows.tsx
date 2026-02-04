'use client'

import { useSuspenseWorkflows, useCreateWorkflow } from "@/hooks/use-workflows"
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "./entity-components"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "@/hooks/use-workflows-params"
import { useEntitySearch } from "@/hooks/use-entity-search"

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  return (
    <div className="flex-1 flex justify-center items-center">
      <pre>
        {JSON.stringify(workflows.data.items, null, 2)}
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

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams()
  const { searchValue, setSearchValue } = useEntitySearch({ params, setParams })

  return (
    <EntitySearch value={searchValue} onChange={setSearchValue} placeholder="Search Workflows"/>
  )
}

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows()
  const [params, setParams] = useWorkflowsParams()

  return (
    <EntityPagination 
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({...params, page})}
    />
  )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
}