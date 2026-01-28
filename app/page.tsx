import Logout from "@/components/auth/logout"
import { Button } from "@/components/ui/button"
import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server"

const Home = async () => {
  await requireAuth()
  
  const data = await caller.hello()

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Switch Board</h1>
      <Button>Get Started</Button>

      <pre className="text-white bg-muted p-4 rounded-md">{JSON.stringify(data, null, 2)}</pre>
      <Logout />
    </div>
  )
}
export default Home