import type { Metadata } from "next"
import "./globals.css"
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  title: "Switch Board",
  description: `Connect your apps, automate your logic, and scale your workflows. Switchboard combines the power of node-based 
                automation with the ease of 1-click integrations.`
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="dark antialiased">
        <TRPCReactProvider>
          <NuqsAdapter>
            {children}
            <Toaster />
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
