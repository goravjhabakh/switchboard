import { workflowsParams } from '@/lib/workflows/params'
import { useQueryStates } from 'nuqs'

export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams)
}