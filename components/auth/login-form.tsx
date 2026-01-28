'use client'

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: '/',
    }, {
      onSuccess: () => {
        router.push('/')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className="flex flex-col gap-6 max-w-xl w-full">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant={'outline'} className="w-full" type="button" disabled={isPending}>
                    Continue with Github
                  </Button>
                  <Button variant={'outline'} className="w-full" type="button" disabled={isPending}>
                    Continue with Google
                  </Button>
                </div>
                <div className="grid gap-6">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>

                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>

                  <Button type="submit" className="w-full" disabled={isPending}>Login</Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account? {" "}
                  <Link href={"/register"} className="underline underline-offset-4">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
export default LoginForm