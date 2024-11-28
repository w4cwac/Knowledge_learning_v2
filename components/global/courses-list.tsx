"use client"

import { Category, Course } from '@prisma/client'
import React from 'react'
import CourseCard from './course-card'
import { useI18n } from '@/locales/client'


type CourseWithProgessWithCategory = Course & {
    category: Category | null,
    chapters: { id: string }[]
    progress?: number | null
}

type Props = {
    items: CourseWithProgessWithCategory[]
}


const CoursesList = ({ items } : Props) => {

    const t = useI18n()
    return (
        <div>
            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {items.map((course, index) => (
                    <CourseCard
                        key={index}
                        id={course.id}
                        title={course.title}
                        imageUrl={course.imageUrl!}
                        chaptersLength={course.chapters.length}
                        price={course.price!}
                        progress={course.progress}
                        category={course.category?.name!}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className='w-full h-full flex items-center justify-center'>
                    {t("not_found")}
                </div>
            )}
        </div>
    )
}

export default CoursesList