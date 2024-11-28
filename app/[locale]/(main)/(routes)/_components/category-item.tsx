"use client"

import { cn } from '@/lib/utils'
import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { IconType } from 'react-icons'


type Props = {
    label: string
    icon?: IconType
    value?: string
}
const CategoryItem = ({ label, value, icon:Icon } : Props) => {
  
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const currentCategoryId = searchParams.get('categoryId')
    const currentTitle = searchParams.get('title')

    const isSelected = currentCategoryId === value

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: isSelected ? undefined : value,
                title: currentTitle
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }



    return (
    <button 
        className={cn(
            "p-2 px-3 text-sm border rounded-full flex items-center gap-x-1 hover:bg-primary hover:text-primary-foreground hover:border-primary",
            isSelected && "bg-primary text-primary-foreground border-primary"
        )}
        type="button"
        onClick={onClick}
    >
        {Icon && <Icon size={20} />}
        <span className='truncate'>
            {label}
        </span>
    </button>
  )
}

export default CategoryItem