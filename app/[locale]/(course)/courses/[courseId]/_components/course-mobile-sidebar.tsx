import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import CourseSidebar from './course-sidebar'

  
type Props = {
    course: Course & {
        chapters: ( 
            Chapter & {
                useProgress: UserProgress[] | null
            }
        )[]
    },
    progress: number
}


const CourseMobileSidebar = ({ course, progress } : Props) => {
    
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75'>
                <Menu />
            </SheetTrigger>
            <SheetContent side={"left"} className='p-0 w-72'>
                <CourseSidebar 
                    course={course}
                    progress={progress}
                />
            </SheetContent>
        </Sheet>
    )
}

export default CourseMobileSidebar