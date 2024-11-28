import { Button } from '@/components/ui/button'
import { getI18n } from '@/locales/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
}


const layout = async({ children } : Props) => {

    const t = await getI18n()
    return (
        <div className='h-full w-full flex flex-col p-4'>
            <Link href={"/"}>
                <Button 
                    variant={"outline"}
                    className='rounded-full flex items-center'
                >
                    <ArrowLeft className='w-4 h-4 mr-1'/>
                    {t('sign_in_home')}
                </Button>
            </Link>
            {children}
        </div>
    )
}

export default layout