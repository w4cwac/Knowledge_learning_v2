"use client"


import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { chapterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LayoutList, Loader2, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course } from '@prisma/client'
import { updateChaptersOrder, updateCourseChapters } from '@/data'
import ChapterList from './chapter-list'
import { useI18n } from '@/locales/client'

type Props = {
    initialData: Course & { chapters: Chapter[] }
    courseId: string
}


const ChaptersForm = ({ courseId, initialData } : Props) => {

    const form =  useForm<z.infer<typeof chapterSchema>>({
        resolver: zodResolver(chapterSchema),
        defaultValues: {
            title: ''
        }
    })
    const router = useRouter()
    const [isCreating, setIsCreating] = React.useState(false)
    const [isUpdating, setIsUpdating] = React.useState(false)
    const toggCreating = () => setIsCreating((prev) => !prev)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async(data: z.infer<typeof chapterSchema>) => {
        try {
            const response = await updateCourseChapters(courseId, data)
            toggCreating()
            router.refresh()
            toast.success("Chapter created")
        } catch (error) {
            toast.error("Failed to update course")
        }
    }

    const onReorder = async(updateData: {id: string; position: number}[]) => {
        try {
            setIsUpdating(true)
            const response = await updateChaptersOrder(courseId, updateData)
            router.refresh()
            toast.success("Chapter reordered")
        } catch (error) {
            toast.error("Failed to update course")
        } finally {
            setIsUpdating(false)
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }
    const t = useI18n()

    return (
        <div className='mt-6 border bg-muted text-muted-foreground p-4 relative'>
            {
                isUpdating && (
                    <div className='absolute h-full w-full bg-muted-foreground/30 top-0 right-0 rounded-md flex items-center justify-center'>
                        <Loader2 className='w-5 h-5 animate-spin text-primary'/>
                    </div>
                )
            }
            <div className='font-medium flex items-center justify-between'>
                {t("course_chapters")}
                <Button 
                    variant={"ghost"}
                    onClick={toggCreating}
                >
                    {
                        isCreating && <>{t("exit")}</>
                    }
                    {
                        !isCreating && (
                            <>
                                <PlusCircle className='h-4 w-4 mr-2'/>
                                {t("add_chapter")}
                            </>
                        )
                    }
                </Button>
            </div>
            {
                isCreating && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 mt-4'
                        >
                            <FormField 
                                control={form.control}
                                name='title'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                disabled={isSubmitting}
                                                placeholder={t("enter_title")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <Button
                                type='submit'
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? <Loader2  className='w-4 h-4'/> : t("create")}
                            </Button>
                           
                        </form>
                    </Form>
                )
            }
            {
                !isCreating && (
                    <div className={cn(
                        "text-sm mt-2",
                        !initialData.chapters.length && 'text-muted-foreground/50 italic'
                    )}>
                        {!initialData.chapters.length && t("no_chapters")}
                        <ChapterList
                            onEdit={onEdit}
                            onReorder={onReorder}
                            items={initialData.chapters || []}
                        />
                    </div>
                )
            }
            {
                !isCreating && (
                    <p className='text-xs text-muted-foreground mt-4'>
                        {t("drag_and_drop_to_reorder")}
                    </p>
                )
            }
        </div>
    )
}

export default ChaptersForm