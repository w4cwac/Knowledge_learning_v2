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
import { titleSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateChapterTitle, updateCourseTitle } from '@/data'
import { useI18n } from '@/locales/client'

type Props = {
    initialData: {
        title: string
    }
    courseId: string
    chapterId: string
}


const ChapterTitleForm = ({ courseId, initialData, chapterId } : Props) => {

    const form =  useForm<z.infer<typeof titleSchema>>({
        resolver: zodResolver(titleSchema),
        defaultValues: initialData
    })
    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async(data: z.infer<typeof titleSchema>) => {
        try {
            const response = await updateChapterTitle(courseId, data, chapterId)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Failed to update course")
        }
    }
    const t = useI18n()
    
    return (
        <div className='mt-6 border bg-muted text-muted-foreground p-4'>
            <div className='font-medium flex items-center justify-between'>
                {t("chapter_title")}
                <Button 
                    variant={"ghost"}
                    onClick={toggleEditing}
                >
                    {
                        isEditing && <>{t("exit")}</>
                    }
                    {
                        !isEditing && (
                            <>
                                <Pencil className='h-4 w-4 mr-2'/>
                                {t("edit")}
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    <p className='mt-2 text-sm'>
                        {initialData.title}
                    </p>
                )
            }
            {
                isEditing && (
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
                            <div className='flex items-center gap-x-2'>
                                <Button
                                    type='submit'
                                    disabled={!isValid || isSubmitting}
                                >
                                    {isSubmitting ? <Loader2  className='w-4 h-4'/> : t("save")}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }
        </div>
    )
}

export default ChapterTitleForm