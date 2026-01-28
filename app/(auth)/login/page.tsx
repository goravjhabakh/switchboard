import LoginForm from "@/components/auth/login-form"
import { requireUnAuth } from "@/lib/auth-utils"

const Page = async () => {
  await requireUnAuth()

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <LoginForm />
    </div>
  )
}
export default Page