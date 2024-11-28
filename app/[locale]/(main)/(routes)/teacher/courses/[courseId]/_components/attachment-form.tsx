"use client"


import React from 'react'
import { Button } from "@/components/ui/button"
import { attachmentSchema } from '@/schemas'
import { z } from 'zod'
import { File, Loader2, PlusCircle, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { deleteCourseAttachment, updateCourseAttachment } from '@/data'
import Image from 'next/image'
import FileUpload from '@/components/global/file-upload'
import { Attachment, Course } from '@prisma/client'
import { useI18n } from '@/locales/client'

type Props = {
    initialData: Course & { attachments: Attachment[] }
    courseId: string
}


const AttachmentForm = ({ courseId, initialData } : Props) => {


    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const onSubmit = async(data: z.infer<typeof attachmentSchema>) => {
        try {
            const response = await updateCourseAttachment(courseId, data)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Failed to update course")
        }
    }

    const onDelete = async(id: string) => {
        try {
            setDeleteId(id)
            const response = await deleteCourseAttachment(courseId,id )
            router.refresh()
        } catch (error) {
            toast.error("Failed to delete attachment")
        } finally {
            setDeleteId(null)
        }
    }

    const t = useI18n()

    return (
        <div className='mt-6 border bg-muted text-muted-foreground p-4'>
            <div className='font-medium flex items-center justify-between'>
                {t("course_attachments")}
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
                                <Upload className='h-4 w-4 mr-2'/>
                                {t("add_attachment")}
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    <>
                        {initialData.attachments.length === 0 && (
                            <div className='text-muted-foreground mt-2 italic'>
                                {t("no_attachments")}
                            </div>
                        )}
                        {initialData.attachments.length > 0 && (
                            <div className='space-y-2'>
                                {initialData.attachments.map((attachment) => (
                                    <div key={attachment.id} className='flex items-center w-full p-3 rounded-md border-foreground text-foreground bg-primary/50'>
                                        <File className='h-4 w-4 mr-2 flex-shrink-0'/>
                                        <p className='text-xs line-clamp-1'>
                                            {attachment.url}
                                        </p>
                                        {
                                            deleteId === attachment.id && (
                                                <div>
                                                    <Loader2 className='h-4 w-4 animate-spin'/>
                                                </div>
                                            )
                                        }
                                        {
                                            deleteId !== attachment.id && (
                                                <button
                                                    className='ml-auto hover:opacity-75 transition'
                                                    onClick={() => onDelete(attachment.id)}
                                                >
                                                    <X className='h-4 w-4'/>
                                                </button>
                                            )
                                        }
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )
            }
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseAttachment"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({'url': url})
                                }
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default AttachmentForm