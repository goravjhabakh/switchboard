import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Switch Board",
  description: `Connect your apps, automate your logic, and scale your workflows. Switchboard combines the power of node-based 
                automation with the ease of 1-click integrations.`
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
