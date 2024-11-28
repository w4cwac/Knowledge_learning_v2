import NavbarRoutes from '@/components/global/navbar-routes'
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import CourseMobileSidebar from './course-mobile-sidebar'


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


const CourseNavbar = ({ course, progress } : Props) => {
    
    return (
        <div className='p-4 border-b h-full flex items-center shadow-sm'>
            <CourseMobileSidebar 
                course={course}
                progress={progress}
            />
            <NavbarRoutes />
        </div>
    )
}

export default CourseNavbar