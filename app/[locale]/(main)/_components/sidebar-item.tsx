import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'
import React from 'react'


type Props = {
    icon: LucideIcon,
    label: string,
    href: string,
}

const SidebarItem = ({ icon: Icon, label, href} : Props) => {
    
    const router = useRouter()
    const pathname = usePathname()

    const isActive = (pathname === '/') && (href === '/') ||
                    pathname === href || 
                    pathname.startsWith(`${href}/`)

    const handleClick = () => {
        router.push(href)
    }


    return (
        <button 
            onClick={handleClick}
            type='button'
            className={cn(
                'flex items-center gap-x-2 text-muted-foreground text-sm font-[500] pl-6 transition-all hover:bg-muted/40',
                isActive && 'text-muted-foreground bg-muted hover:bg-muted'
            )}
        >
            <div className='flex items-center gap-x-2 py-4'>
                <Icon 
                    size={22}  
                    className={cn(
                        'text-muted-foreground',
                        isActive && 'text-muted-foreground'
                    )}
                />
                {label}
            </div>  
            <div className={cn(
                'ml-auto opacity-0 border-2 border-muted-foreground h-full transition-all',
                isActive && 'opacity-100'
            )}/>
        </button>
    )
}

export default SidebarItem