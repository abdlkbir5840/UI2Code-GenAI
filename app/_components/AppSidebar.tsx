import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CircleDollarSign, Home, Paintbrush } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Workspace",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Design",
        url: "/design",
        icon: Paintbrush,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: CircleDollarSign,
    },
]

export function AppSidebar() {
    const path = usePathname()
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'/logo.png'} alt='logo' width={100} height={100}
                        className='w-full h-full' />
                    <h2 className='text-sm text-gray-400 text-center'>Build Awesome</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                <Link href={item.url} key={index} passHref>
                                    <div className={`p-2 text-lg flex gap-2 items-center cursor-pointer
                                     hover:bg-gray-100 rounded-lg
                                     ${path === item.url ? 'bg-gray-200' : ''}
                                     `}>
                                        <item.icon className='h-5 w-5' />
                                        <span>{item.title}</span>
                                    </div>
                                </Link>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm'>Copyright @elbahmadi</h2>
            </SidebarFooter>
        </Sidebar>
    )
}
