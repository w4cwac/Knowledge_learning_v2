import { getCourse, getCourseForUser, getProgress } from '@/data'
import { currentUser } from '@/lib/auth'
import { count } from 'console'
import { redirect } from 'next/navigation'
import React from 'react'
import CourseSidebar from './_components/course-sidebar'
import CourseNavbar from './_components/course-navbar'


type Props = {
    params: {
        courseId: string
    }
    children: React.ReactNode
}
const layout = async({ children, params } : Props) => {
    
    const user = await currentUser()
    if (!user?.id) {
        return redirect('/sign-in')
    }
    const course = await getCourseForUser(params.courseId)
    const progress = await getProgress(params.courseId)

    return (
        <div className='h-full'>
            <div className='h-[80px] md:pl-80 w-full z-50 fixed backdrop-blur-md inset-y-0'>
                <CourseNavbar
                    course={course}
                    progress={progress}
                />
            </div>
            <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
                <CourseSidebar 
                    course={course}
                    progress={progress}
                />
            </div>
            <main className='md:pl-80 h-full pt-[80px]'>
                {children}
            </main>
        </div>
    )
}

export default layout