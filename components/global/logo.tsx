import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"}>
        <Image 
            height={50}
            width={40}
            alt='logo'
            src={'/logo.svg'}
            className='object-cover'
        />
    </Link>
  )
}

export default Logo
