"use client"

import React from 'react'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurentUser } from '@/hooks/use-current-user'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import LogOut from '@/lib/logout'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { ModeToggle } from './mode-toggle'
import { useI18n } from '@/locales/client'

  
const UserButton = () => {

    const user = useCurentUser()
    const router = useRouter()
    const t = useI18n()


    return (
        <div>
            {
                user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage 
                                src={user.image || undefined} 
                                alt={"user profile"} 
                            />
                            <AvatarFallback>{user.name?.toUpperCase().slice(0,2)}</AvatarFallback>
                        </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-[100px]'>
                            <DropdownMenuLabel>
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={async () => await LogOut()}
                            >
                                {t('sign_out')}
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button 
                        onClick={() => router.push('/sign-in')}
                    >
                        {t('sign_in')}
                    </Button>
                )
            }
        </div>
    )
}

export default UserButton