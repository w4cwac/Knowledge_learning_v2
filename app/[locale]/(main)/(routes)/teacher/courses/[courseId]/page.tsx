import IconBadge from '@/components/global/icon-badge'
import { getCategories, getCourse } from '@/data'
import { currentUser } from '@/lib/auth'
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from 'lucide-react'
import { redirect } from 'next/navigation'

import React from 'react'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/category-form'
import PriceForm from './_components/price-form'
import AttachmentForm from './_components/attachment-form'
import ChaptersForm from './_components/chapters-form'
import Banner from '@/components/global/banner'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { DollarSign, FileText, Grid, Image as ImageIcon, LayoutList, Upload } from "lucide-react"
import CourseActions from './_components/course-actions'
import ChapterList from './_components/chapter-list'
import { getI18n } from '@/locales/server'

type Props = {
    params: {
        courseId: string
    }
}


const page = async({ params } : Props) => {

    const user = await currentUser()
    if (!user) return redirect('/')
    const course = await getCourse(params.courseId)
    const categories = await getCategories()
    if (!course) return redirect('/')


    const requiredFiels = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some((chapter) => chapter.isPublished)
    ]
    const totalFields = requiredFiels.length
    const completedFields = requiredFiels.filter(Boolean).length
    const completionText = `(${completedFields}/${totalFields})`

    const isCompleted = completedFields === totalFields

    const t = await getI18n()

    return (
        <>
            {!course.isPublished && (
                <Banner 
                    label={t('course_published')}
                />
            )}
            <div className='p-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-2'>
                        <h1 className="text-3xl font-bold">{t("course_setup")}</h1>
                        <span className='text-muted-foreground'>
                            {t("course_completion")} {completionText}
                        </span>
                    </div>
                    <CourseActions 
                        courseId={course.id}
                        isPublished={course.isPublished}
                        disabled={!isCompleted}
                    />
                </div>

                <div className='mt-14'>
                    <Tabs defaultValue="details" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="details">{t("course_tab_1")}</TabsTrigger>
                            <TabsTrigger value="content">{t("course_tab_2")}</TabsTrigger>
                            <TabsTrigger value="resources">{t("course_tab_3")}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details">
                            <Card>
                                <CardHeader>
                                <CardTitle>{t("course_tab_1")}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <TitleForm 
                                        initialData={course}
                                        courseId={course.id}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <DescriptionForm 
                                        initialData={course}
                                        courseId={course.id}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <PriceForm 
                                        initialData={course}
                                        courseId={course.id}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <CategoryForm
                                        initialData={course}
                                        courseId={course.id}
                                        options={categories.map((category) => ({
                                            label: category.name,
                                            value: category.id
                                        }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <ImageForm 
                                        initialData={course}
                                        courseId={course.id}
                                    />
                                </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="content">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("course_tab_2")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <ChaptersForm 
                                            initialData={course}
                                            courseId={course.id}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="resources">
                            <Card>
                                <CardHeader>
                                <CardTitle>{t("course_tab_3")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <div className="space-y-4">
                                    <AttachmentForm 
                                        initialData={course}
                                        courseId={course.id}
                                    />
                                </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default page