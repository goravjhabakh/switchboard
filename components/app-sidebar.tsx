'use client'

import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"
import { useState } from "react"
import { toast } from "sonner"
import { useHasActiveSubscription } from "../hooks/use-subscription"

const menuItems = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: '/workflows'
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: '/credentials'
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: '/executions'
      }
    ]
  }
]

const AppSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { hasActiveSubscription, isLoading: subscriptionLoading } = useHasActiveSubscription()

  const [signoutLoading, setSignoutLoading] = useState<boolean>(false)
  const [polarLoading, setPolarLoading] = useState<boolean>(false)
  const [portalLoading, setPortalLoading] = useState<boolean>(false)

  const handleSignout = async () => {
    setSignoutLoading(true)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        },
        onError: ({ error }) => {
          toast.error(error?.message || 'Failed to sign out')
          setSignoutLoading(false)
        }
      }
    })
  }

  const handleUpgrade = async () => {
    setPolarLoading(true)
    await authClient.checkout({
      slug: "Switch-Board-Pro"
    }, {
      onError: () => {
        toast.error('Failed to upgrade')
        setPolarLoading(false)
      }
    })
  }

  const handlePortal = async () => {
    setPortalLoading(true)
    await authClient.customer.portal({
      fetchOptions: {
        onError: () => {
          toast.error('Failed to open portal')
          setPortalLoading(false)
        }
      }
    })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
          <Link href={'/'} prefetch>
            <Image src={'/logo.svg'} alt="Switch Board" width={30} height={30}/>
            <span className="font-semibold text-sm">Switch Board</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    isActive={item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)}
                    asChild 
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link href={item.url} prefetch>
                      <item.icon className="size-4"/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Logout"}
              className="gap-x-4 h-10 px-4"
              onClick={() => handleSignout()}
              disabled={signoutLoading}
            >
              <LogOutIcon className="h-4 w-4"/>
              <span>Logout</span>
            </SidebarMenuButton>

            {!hasActiveSubscription && !subscriptionLoading && (
              <SidebarMenuButton
                tooltip={"Upgrade to Pro"}
                className="gap-x-4 h-10 px-4"
                onClick={() => handleUpgrade()}
                disabled={polarLoading}
              >
                <StarIcon className="h-4 w-4"/>
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            )}
            <SidebarMenuButton
              tooltip={"Billing Portal"}
              className="gap-x-4 h-10 px-4"
              onClick={() => handlePortal()}
              disabled={portalLoading}
            >
              <CreditCardIcon className="h-4 w-4"/>
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar