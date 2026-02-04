import { betterAuth } from "better-auth"
import { polar, checkout, portal, usage, webhooks } from '@polar-sh/better-auth'
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "../prisma"
import { polarClient } from "../polar"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [{
            productId: "ac02689c-d21c-45e8-809e-a6dac2259da2",
            slug: "Switch-Board-Pro"
          }],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true
        }),
        portal()
      ]
    })
  ]
})