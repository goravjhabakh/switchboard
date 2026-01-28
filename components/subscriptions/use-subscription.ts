import { authClient } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data, error } = await authClient.customer.state()
      if (error) return null
      return data
    },
    retry: 1
  })
}

export const useHasActiveSubscription = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription()
  const hasActiveSubscription = customerState?.activeSubscriptions && customerState.activeSubscriptions.length > 0
  return { hasActiveSubscription, isLoading, ...rest }
}