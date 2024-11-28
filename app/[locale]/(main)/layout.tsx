import React from 'react'
import Navbar from './_components/navbar'



type Props = {
    children: React.ReactNode
}


const layout = ({ children } : Props) => {
  return (
    <div className='w-full h-full'>
        <div className='h-20 fixed inset-0 w-full z-50'>
            <Navbar />
        </div>

        <div className='h-full pt-20'>
          {children}
        </div>
    </div>
  )
}

export default layout