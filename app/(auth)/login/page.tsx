import LoginForm from "@/components/login-form"
import { requireUnAuth } from "@/lib/auth/auth-utils"

const Page = async () => {
  await requireUnAuth()

  return (
    <div className="bg-muted flex justify-center items-center min-h-svh p-10">
      <LoginForm />
    </div>
  )
}
export default Page