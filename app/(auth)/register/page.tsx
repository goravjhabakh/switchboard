import RegisterForm from "@/components/auth/register-form"
import { requireUnAuth } from "@/lib/auth-utils"

const Page = async () => {
  await requireUnAuth()

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <RegisterForm />
    </div>
  )
}
export default Page