"use client"

import { BarChart, Layout, List } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/locales/client'

const homeRoutes = [
    {
        icon: Layout,
        label: "Home",
        href: "/",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/analytics",
    },
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
]



const SidebarRoutes = () => {

    const pathname = usePathname()
    const isTeacherPage = pathname?.includes('/teacher')

    const routes = isTeacherPage ? teacherRoutes : homeRoutes

    return (
        <div className='flex flex-col w-full'>
            {
                routes.map((route, index) => (
                    <SidebarItem 
                        key={index} 
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    )
}

export default SidebarRoutes