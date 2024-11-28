"use client"

import { useCurentUser } from '@/hooks/use-current-user'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import SearchInput from './search-input'

import Logo from './logo'
import UserButton from './user-button'
import { ModeToggle } from './mode-toggle'
import SwitchLang from './switch-lang'
import { useI18n } from '@/locales/client'




const NavbarRoutes = () => {

    const authUser = useCurentUser()
    const pathname = usePathname()

    const isHomePage = pathname === '/'
    const isTeacherPage = pathname?.startsWith('/teacher')
    const isPlayerPage = pathname?.startsWith('/courses')
    const t = useI18n()

    return (
        <>
            {
                !isPlayerPage && (
                    <div className='hidden md:flex p-4 items-center space-x-3'>
                        <Logo />
                        <h1 className='font-bold text-2xl'>Udemy</h1>
                    </div>
                )
            }
            {
                isHomePage && (
                    <div className='hidden md:block'>
                        <SearchInput />
                    </div>
                )
            }
            {isTeacherPage || isPlayerPage && (
                <Link href={"/"}>
                    <Button>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('home_exit')}
                    </Button>
                </Link>
            )}
            <div className='flex  gap-x-2 ml-auto'>

                {isTeacherPage && (
                    <Link href={"/"}>
                        <Button
                            size={"sm"}
                            variant={"ghost"}
                        >
                            {t('home')}
                        </Button>
                    </Link>
                )}

                {
                    authUser && !isPlayerPage && (
                        <Link href={"/teacher/courses"}>
                            <Button
                                size={"sm"}
                                variant={"ghost"}
                            >
                                {isTeacherPage ? t("courses") : t("teaching")}
                            </Button>
                        </Link>
                    )
                        
                }
                {
                    authUser && isTeacherPage && !isPlayerPage && (
                        <Link href={"/teacher/analytics"} className='hidden md:block'>
                            <Button
                                size={"sm"}
                                variant={"ghost"}
                            >
                                {t("analytics_teacher")}
                            </Button>
                        </Link>
                    )
                }
                {
                    authUser && !isTeacherPage && !isPlayerPage && (
                        <Link href={"/analytics"} className='hidden md:block'>
                            <Button
                                size={"sm"}
                                variant={"ghost"}
                            >
                                {t("analytics")}
                            </Button>
                        </Link>
                    )
                }

                <UserButton />
                <ModeToggle />
                <SwitchLang />
            </div>
        </>
    )
}

export default NavbarRoutes