'use client'


import React from 'react'
import MobileSidebar from './mobile-sidebar'
import NavbarRoutes from '@/components/global/navbar-routes'

const Navbar = () => {

    return (
        <nav className='p-6 border-b h-full shadow-sm backdrop-blur-sm flex items-center'>
            <MobileSidebar />
            <NavbarRoutes />
        </nav>
    )
}

export default Navbar