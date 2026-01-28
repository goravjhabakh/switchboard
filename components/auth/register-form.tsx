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
import { Spinner } from "../ui/spinner"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useState } from "react"

const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  const [githubLoading, setGithubLoading] = useState<boolean>(false)
  const [googleLoading, setGoogleLoading] = useState<boolean>(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const handleSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email({
      name: values.fullName,
      email: values.email,
      password: values.password,
      callbackURL: '/'
    }, {
      onSuccess: () => {
        router.push('/')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  }

  const handleGithub = async () => {
    setGithubLoading(true)
    await authClient.signIn.social({
      provider: "github",
      callbackURL: '/'
    }, {
      onError: (ctx) => {
        toast.error(ctx.error.message)
      }
    })
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await authClient.signIn.social({
      provider: "google",
      callbackURL: '/'
    }, {
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
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant={'outline'} className="w-full gap-2" type="button" disabled={isPending || githubLoading || googleLoading} onClick={handleGithub}>
                    {githubLoading ? <Spinner /> : <Image src={resolvedTheme === 'dark' ? "/github-dark.svg" : "/github-light.svg"} alt="Github" width={24} height={24}/>}
                    {githubLoading ? "" : "Continue with Github"}
                  </Button>
                  <Button variant={'outline'} className="w-full gap-2" type="button" disabled={isPending || githubLoading || googleLoading} onClick={handleGoogle}>
                    {googleLoading ? <Spinner /> : <Image src="/google.png" alt="Google" width={20} height={20}/>}
                    {googleLoading ? "" : "Continue with Google"}
                  </Button>
                </div>
                <div className="grid gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>

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

                  <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>

                  <Button type="submit" className="w-full" disabled={isPending || githubLoading || googleLoading}>
                    {isPending ? <Spinner /> : "Register"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account? {" "}
                  <Link href={"/login"} className="underline underline-offset-4">
                    Login
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
export default RegisterForm