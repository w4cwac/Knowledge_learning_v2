import { getCoursePurchase } from '@/data'
import { Course, Chapter, UserProgress } from '@prisma/client'
import React from 'react'
import CourseSidebarChapter from './course-sidebar-chapter'
import CourseProgress from '@/components/global/course-progress'


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


const CourseSidebar = async({ course, progress} : Props) => {

    const purchase = await getCoursePurchase(course.id)

    return (
        <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
            <div className='p-8 flex flex-col border-b'>
                <h1 className='text-2xl font-bold'>{course.title}</h1>
                {
                    purchase && (
                        <div className="mt-10">
                            <CourseProgress 
                                variant="default"
                                value={progress}
                            />
                        </div>
                    )
                }
            </div>
            <div className='flex flex-col w-full'>
                {
                    course.chapters.map((chapter, index) => (
                        <CourseSidebarChapter 
                            key={index}
                            id={chapter.id}
                            label={chapter.title}
                            isCompleted={!!chapter.useProgress?.[0]?.isCompleted}
                            courseId={course.id}
                            isLocked={!purchase && !chapter.isFree}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default CourseSidebar