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
import { categorySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateCourseCategory, updateCourseDescription, updateCourseTitle } from '@/data'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
import { Combobox } from '@/components/ui/combobox'
import { useI18n } from '@/locales/client'

type Props = {
    initialData: Course
    courseId: string
    options: { label: string; value: string }[]
}


const CategoryForm = ({ courseId, initialData, options } : Props) => {

    const form =  useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            categoryId: initialData.categoryId || ''
        }
    })
    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)
    const selectedOption = options.find((option) => option.value === initialData.categoryId)

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async(data: z.infer<typeof categorySchema>) => {
        try {
            const response = await updateCourseCategory(courseId, data)
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
                {t("course_category")}
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
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && 'text-muted-foreground/50 italic'
                    )}>
                        {selectedOption?.label || t("no_category")}
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
                                name='categoryId'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Combobox
                                                options={options}
                                                {...field}
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

export default CategoryForm