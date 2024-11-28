"use client"


import React from 'react'
import { Button } from "@/components/ui/button"
import { imageSchema } from '@/schemas'
import { z } from 'zod'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateCourseImage } from '@/data'
import Image from 'next/image'
import FileUpload from '@/components/global/file-upload'
import { Course } from '@prisma/client'
import { useI18n } from '@/locales/client'

type Props = {
    initialData: Course
    courseId: string
}


const ImageForm = ({ courseId, initialData } : Props) => {


    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)


    const onSubmit = async(data: z.infer<typeof imageSchema>) => {
        try {
            const response = await updateCourseImage(courseId, data)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Failed to update course")
        }
    }

    const t = useI18n()
    
    return (
        <div className='mt-6 border-dashed bg-muted text-muted-foreground p-4'>
            <div className='font-medium flex items-center justify-between'>
                {t("course_image")}
                <Button 
                    variant={"ghost"}
                    onClick={toggleEditing}
                >
                    {
                        isEditing && <>{t("exit")}</>
                    }
                    {
                        !isEditing && !initialData.imageUrl && (
                            <>
                                <PlusCircle className='h-4 w-4 mr-2'/>
                                {t("add_image")}
                            </>
                        )
                    }
                    {
                        !isEditing && initialData.imageUrl && (
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
                    !initialData.imageUrl ? (
                        <div className='flex items-center justify-center h-60 bg-muted rounded-md'>
                            <ImageIcon className='h-12 w-12 text-muted-foreground'/>
                        </div>
                    ) : (
                        <div className='relative aspect-video mt-2 h-48'>
                            <Image 
                                src={initialData.imageUrl}
                                alt='Course image'
                                fill
                                className='object-cover rounded-md'
                            />
                        </div>
                    )
                )
            }
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseImage"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({'imageUrl': url})
                                }
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default ImageForm