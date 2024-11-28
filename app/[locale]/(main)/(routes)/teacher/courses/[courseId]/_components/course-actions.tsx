"use client"

import ConfirmModal from "@/components/global/confirm-modal"
import { Button } from "@/components/ui/button"
import { deleteCourse, publishCourse, unpublishCourse } from "@/data"
import { useConfetti } from "@/hooks/use-confetti"
import { useI18n } from "@/locales/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"


type Props = {
    courseId: string
    disabled: boolean
    isPublished: boolean
}

export const CourseActions = ({ courseId, isPublished, disabled} : Props) => {

    const [isLoading, setisLoading] = React.useState(false)
    const router = useRouter()
    
    const onClick = async() => {
        try {
            setisLoading(true)
            if(isPublished) {
                await unpublishCourse(courseId)
            } else {
                await publishCourse(courseId)
            }
            router.refresh()
        } catch (error) {
            toast.error("Failed to update Course")
        } finally {
            setisLoading(false)
        }
    }
    const onDelete = async() => {
        try {
            setisLoading(true)
            await deleteCourse(courseId)
            router.refresh()
            router.push(`/teacher/courses`)
        } catch (error) {
            toast.error("Failed to delete Course")
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

export default CourseActions