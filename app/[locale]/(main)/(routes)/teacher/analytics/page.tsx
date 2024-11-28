
import { getCourseChapters, getCoursePerformance, getMonthlyRevenue, getStudentEnrollment } from "@/data"
import Analytics from "./_components/analytics"
import { getI18n } from "@/locales/server"

const page = async() => {

  const monthlyRevenue = await getMonthlyRevenue()
  const studentEnrollment = await getStudentEnrollment()
  const coursesWithChapters = await getCourseChapters()
  const coursePerformance = await getCoursePerformance()
  const t = await getI18n()


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("teacher_analytics")}</h1>
      <Analytics 
        monthlyRevenue={monthlyRevenue} 
        studentEnrollment={studentEnrollment}
        coursesWithChapters={coursesWithChapters}
        coursePerformance={coursePerformance}
      />
    </div>
  )

}


export default page