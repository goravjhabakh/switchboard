import RegisterForm from "@/components/auth/register-form"
import { requireUnAuth } from "@/lib/auth-utils"

const Page = async () => {
  await requireUnAuth()

  return (
    <div className="bg-muted flex justify-center items-center min-h-svh p-10">
      <RegisterForm />
    </div>
  )
}
export default Page