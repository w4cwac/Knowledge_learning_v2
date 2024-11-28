"use client"

import ConfirmModal from "@/components/global/confirm-modal"
import { Button } from "@/components/ui/button"
import { deleteChapter, publishChapter, unpublishChapter } from "@/data"
import { useI18n } from "@/locales/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"


type Props = {
    chapterId: string
    courseId: string
    disabled: boolean
    isPublished: boolean
}

export const ChapterActions = ({ chapterId, courseId, isPublished, disabled} : Props) => {

    const [isLoading, setisLoading] = React.useState(false)
    const router = useRouter()

    const onClick = async() => {
        try {
            setisLoading(true)
            if(isPublished) {
                await unpublishChapter(courseId, chapterId)
            } else {
                await publishChapter(courseId, chapterId)
            }
            router.refresh()
        } catch (error) {
            toast.error("Failed to update chapter")
        } finally {
            setisLoading(false)
        }
    }
    const onDelete = async() => {
        try {
            setisLoading(true)
            await deleteChapter(courseId, chapterId)
            router.refresh()
            router.push(`/teacher/courses/${courseId}`)
        } catch (error) {
            toast.error("Failed to delete chapter")
        } finally {
            setisLoading(false)
        }
    }
    const t = useI18n()

    
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant={"outline"}
                size={"sm"}
            >
                {isPublished ? t("unpublished") : t("published")}
            </Button>
            <ConfirmModal
                onConfirm={onDelete}
            >
                <Button
                    size={"sm"}
                    disabled={isLoading}
                >
                    <Trash  className='h-4 w-4'/>
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default ChapterActions