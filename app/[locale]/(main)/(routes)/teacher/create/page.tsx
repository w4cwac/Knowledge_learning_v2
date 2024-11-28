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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { creatCourseSchema } from '@/schemas'
import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { createCourse } from '@/data'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/locales/client'

const page = () => {

    const router = useRouter()
    const form = useForm<z.infer<typeof creatCourseSchema>>({
        resolver: zodResolver(creatCourseSchema),
        defaultValues: {
            title: '',
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async(data: z.infer<typeof creatCourseSchema>) => {
        try {
            const response = await createCourse(data)
            toast.success('Course created')
            router.push(`/teacher/courses/${response.id}`)
        } catch (error) {
            toast.error('An error occurred')
        }
    }
    
    const t = useI18n()
    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'>{t("course_name")}</h1>
                <p className='text-sm text-muted-foreground'>
                    {t("course_name_description")}
                </p>
                <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-8 mt-8'
                        >
                            <FormField 
                                control={form.control}
                                name='title'    
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("course_title")}</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isSubmitting}
                                                {...field}
                                                placeholder={t("course_title_placeholder")}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("course_title_description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center gap-x-2'>
                                <Link href="/">
                                    <Button
                                        type='button'
                                        variant={"ghost"}
                                    >
                                        {t("exit")}
                                    </Button>
                                </Link>
                                <Button
                                    type='submit'
                                    disabled={!isValid || isSubmitting}
                                >
                                    {t("continue")}
                                </Button>
                            </div>
                        </form>
                </Form>
            </div>
        </div>
    )
}

export default page