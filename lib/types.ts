import { Category, Chapter, Course } from "@prisma/client"

export type CourseProgressWithCatgeroy = Course & {
    category: Category | null,
    progress: number | null,
    chapters: { id: string }[]
}

export type CourseWithCategory = Course & {
    category: Category | null
    chapters: { id: string }[]
}

export type GetCourses = {
    userId: string,
    title?: string,
    categoryId?: string,
}

export type GetCoursesWithoutProgress = {
    title?: string,
    categoryId?: string,
}


export type GetChapter = {
    courseId: string,
    userId: string
    chapterId: string
}

export type DashboardCoursesWithProgressWithCategory = Course & {
    category: Category,
    progress: number | null,
    chapters: Chapter[]
}

export type DashboardCourses = {
    completedCourses: DashboardCoursesWithProgressWithCategory[],
    inProgressCourses: DashboardCoursesWithProgressWithCategory[],
}