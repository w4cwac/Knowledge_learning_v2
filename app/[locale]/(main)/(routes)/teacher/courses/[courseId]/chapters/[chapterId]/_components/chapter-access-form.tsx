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
import { isFreeSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateChapterDescription, updateChapterisFree, updateCourseDescription, updateCourseTitle } from '@/data'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course } from '@prisma/client'
import Tiptap from '@/components/global/tiptap'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { useI18n } from '@/locales/client'

type Props = {
    initialData: Chapter
    courseId: string
    chapterId: string
}


const ChapterAccessForm = ({ courseId, initialData, chapterId } : Props) => {

    const form =  useForm<z.infer<typeof isFreeSchema>>({
        resolver: zodResolver(isFreeSchema),
        defaultValues: {
            isFree: initialData.isFree
        }
    })
    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async(data: z.infer<typeof isFreeSchema>) => {
        try {
            const response = await updateChapterisFree(courseId, data, chapterId)
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
                {t("chapter_access")}
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
                        !initialData.isFree && 'text-muted-foreground/50 italic'
                    )}>
                        {initialData.isFree ? 
                        <>
                            {t("free_for_preview")}
                        </>
                        :
                        <>
                            {t("not_free_for_preview")}
                        </>}
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
                                name='isFree'    
                                render={({ field }) => (
                                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                        <FormControl>
                                            <Switch 
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <div className='space-y-1 leading-none'>
                                            {t("preview_description")}
                                        </div>
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

export default ChapterAccessForm