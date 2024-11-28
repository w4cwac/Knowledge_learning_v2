import { getCourseForUser } from '@/data'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        courseId: string
    }
}


const page = async({ params } : Props) => {
    
    const course = await getCourseForUser(params.courseId)
    if (!course) {
        return redirect('/')
    }
    return (
        redirect(`/courses/${params.courseId}/chapters/${course.chapters[0].id}`)
    )
}

export default page