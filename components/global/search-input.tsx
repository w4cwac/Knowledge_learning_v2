"use client"

import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import qs from 'query-string'

const SearchInput = () => {

    const [value, setValue] = React.useState('')
    const debouncedValue = useDebounce(value)
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentCategoryId = searchParams.get('categoryId')
    useEffect(() => {  
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue
            }
        }, { skipNull: true, skipEmptyString: true }) 

        router.push(url)
    }, [debouncedValue, currentCategoryId, pathname, router])


    return (
        <div className='relative'>
            <Search 
                className="h-4 w-4 absolute top-3 left-3 text-muted-foreground"
            />
            <Input 
                className='w-full md:w-[500px] pl-9 rounded-full '
                placeholder='Search...'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default SearchInput