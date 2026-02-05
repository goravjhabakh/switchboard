'use client'

import { useSuspenseWorkflows, useCreateWorkflow, useRemoveWorkflow } from "@/hooks/use-workflows"
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "./entity-components"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "@/hooks/use-workflows-params"
import { useEntitySearch } from "@/hooks/use-entity-search"
import type { Workflow } from "@/lib/generated/prisma/client"
import { WorkflowIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows()

  return (
    <EntityList 
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => (<WorkflowItem data={workflow}/>)}
      emptyView={<WorkflowsEmpty />}
    />
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

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..."/>
}

export const WorkflowsError = () => {
  return <ErrorView message="Failed to load workflows"/>
}

export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow()
  const { handlerError, modal } = useUpgradeModal()

  const handleCreate = () => createWorkflow.mutate(undefined, {
    onError: (error) => {
      handlerError(error)
    }
  })

  return (
    <>
      {modal}
      <EmptyView
        title="No workflows"
        description="No workflows found. Create a workflow to get started"
        buttonLabel="New Workflow"
        onNew={handleCreate}
      />
    </>
  )
}

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const removeWorkflow = useRemoveWorkflow()
  const handleRemove = () => removeWorkflow.mutate({ id: data.id }) 

  return (
    <EntityItem 
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle = {<>
        Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })} {" "} &bull;
        Created {" "} {formatDistanceToNow(data.createdAt, { addSuffix: true })}
      </>}
      image = {
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground"/>
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  )
}