import { getCategories, getCourses, getCoursesWithoutProgress, getCoursesWithProgress, getUserCourses } from '@/data'
import React from 'react'
import Categories from './_components/categories'
import SearchInput from '@/components/global/search-input'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CoursesList from '@/components/global/courses-list'
import { CourseProgressWithCatgeroy } from '@/lib/types'


type Props = {
  searchParams: {
    title: string,
    categoryId: string
  }
}

const page = async({ searchParams } : Props) => {

    const categories = await getCategories()
    let courses;

    const user = await currentUser()

    if (user?.id) {
        courses = await getCoursesWithProgress({ userId: user.id, title: searchParams.title, categoryId: searchParams.categoryId })
    } else {
        courses = await getCoursesWithoutProgress({  title: searchParams.title, categoryId: searchParams.categoryId })
    }


    return (
      <>
        <div className='px-6 pt-6 md:hidden md:mb-0 block'>
          <SearchInput />
        </div>
        <div className='p-6 space-y-6'>
          <Categories 
            items={categories}
          />
          <CoursesList 
            items={courses}
          />
        </div>
      </>
    )
}

export default page