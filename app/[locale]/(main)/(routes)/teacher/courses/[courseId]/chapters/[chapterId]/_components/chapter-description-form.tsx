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
import { descriptionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateChapterDescription, updateCourseDescription, updateCourseTitle } from '@/data'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course } from '@prisma/client'
import Tiptap from '@/components/global/tiptap'
import { useI18n } from '@/locales/client'

type Props = {
    initialData: Chapter
    courseId: string
    chapterId: string
}


const ChapterDescriptionForm = ({ courseId, initialData, chapterId } : Props) => {

    const form =  useForm<z.infer<typeof descriptionSchema>>({
        resolver: zodResolver(descriptionSchema),
        defaultValues: {
            description: initialData.description || ''
        }
    })
    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async(data: z.infer<typeof descriptionSchema>) => {
        try {
            const response = await updateChapterDescription(courseId, data, chapterId)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Failed to update chapter description")
        }
    }
    const t = useI18n()
    
    return (
        <div className='mt-6 border bg-muted text-muted-foreground p-4'>
            <div className='font-medium flex items-center justify-between'>
                {t("chapter_description")}
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
                    <div className={cn(
                        "text-sm mt-2",
                        !initialData.description && 'text-muted-foreground/50 italic'
                    )}>
                        {!initialData.description && t("not_set")}
                        {initialData.description && 
                            <div 
                                dangerouslySetInnerHTML={{ __html: initialData.description }}
                            />}
                    </div>
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
                                name='description'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Tiptap
                                                val={field.value}
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

export default ChapterDescriptionForm