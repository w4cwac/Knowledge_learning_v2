import CoursesList from '@/components/global/courses-list'
import { getDashboardCourses } from '@/data'
import { currentUser } from '@/lib/auth'
import { CheckCircle, Clock } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getI18n } from '@/locales/server'

const page = async() => {

  const {
    completedCourses,
    inProgressCourses,
  } = await getDashboardCourses()
  const t = await getI18n()

  return (
    <div className='p-6 space-y-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("course_in_progress")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCourses.length} {inProgressCourses.length === 1 ? 'Course' : 'Courses'}</div>
            <p className="text-xs text-muted-foreground">{t("course_in_progress_description")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("course_completed")}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses.length} {completedCourses.length === 1 ? 'Course' : 'Courses'}</div>
            <p className="text-xs text-muted-foreground">{t("course_completed_description")}</p>
          </CardContent>
        </Card>
      </div>
      <CoursesList 
          items={[...inProgressCourses, ...completedCourses]}
      />
    </div>
  )
}

export default page