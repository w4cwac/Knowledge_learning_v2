import React from 'react'
import Logo from '../../../../components/global/logo'
import SidebarRoutes from './sidebar-routes'

const Sidebar = () => {
  return (
    <div className='h-full flex flex-col border-r overflow-y-auto shadow-sm'>
        <div className='p-4 flex items-center space-x-3'>
            <Logo />
            <h1 className='font-bold text-2xl'>Udemy</h1>
        </div>
        <div className='flex flex-col w-full'>
            <SidebarRoutes />
        </div>
    </div>
  )
}

export default Sidebar