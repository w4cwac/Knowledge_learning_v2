import IconBadge from '@/components/global/icon-badge'
import { getChapter } from '@/data'
import { ArrowLeft, Eye, LayoutDashboard, PenSquare, Video } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import ChapterTitleForm from './_components/title-form'
import ChapterDescriptionForm from './_components/chapter-description-form'
import ChapterAccessForm from './_components/chapter-access-form'
import ChapterVideoForm from './_components/chapter-video-form'
import Banner from '@/components/global/banner'
import ChapterActions from './_components/chapter-actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { getI18n } from '@/locales/server'


type Props = {
    params: {
        courseId: string
        chapterId: string
    }
}


const page = async({ params } : Props) => {


    const chapter = await getChapter(params.chapterId, params.courseId)
    if (!chapter) return redirect('/')

    const requiredFiels = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ]

    const totalFields = requiredFiels.length
    const completedFields = requiredFiels.filter(Boolean).length
    const completionText = `(${completedFields}/${totalFields})`

    const isCompleted = totalFields === completedFields
    const t = await getI18n()
        
    return (
        <>
            {!chapter.isPublished && (
                <Banner 
                    variant={'warning'}
                    label={t("banner_warning")}
                />
            )}
            <div className='p-6'>
                <div className='flex items-center justify-between'>
                    <div className='w-full'>
                        <Link 
                            href={`/teacher/courses/${params.courseId}`}
                            className='flex items-center text-sm hover:opacity-75 transition mb-6'
                        >
                            <ArrowLeft className='h-4 w-4 mr-2'/>
                            {t('back_to_course')}
                        </Link>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex flex-col gap-y-2'>
                                <h1 className='text-3xl font-bold'>
                                    {t("chapter_creation")}
                                </h1>
                                <span className='text-muted-foreground text-sm'>
                                    {t("course_completion")} {completionText}
                                </span>
                            </div>
                            <ChapterActions 
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isPublished={chapter.isPublished}
                                disabled={!isCompleted}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
                    <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <PenSquare className="mr-2" />
                            {t("customize_chapter")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <ChapterTitleForm 
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                        <div className="space-y-2">
                            <ChapterDescriptionForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                        <div className="space-y-2">
                            <ChapterAccessForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId} 
                            />
                        </div>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Video className="mr-2" />
                            {t("video_content")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ChapterVideoForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default page