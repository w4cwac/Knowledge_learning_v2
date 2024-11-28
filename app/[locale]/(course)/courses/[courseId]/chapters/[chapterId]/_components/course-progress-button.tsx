"use client"

import { Button } from '@/components/ui/button'
import { markChapterAsCompleted } from '@/data'
import { useConfetti } from '@/hooks/use-confetti'
import { useI18n } from '@/locales/client'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'



type Props = {
    chapterId: string
    courseId: string
    nextChapterId?: string
    isCompleted?: boolean
}
const CourseProgressButton = ({ chapterId, courseId, nextChapterId, isCompleted } : Props) => {
    

    const t = useI18n()
    const Icon = isCompleted ? XCircle : CheckCircle
    const router = useRouter()
    const confetti = useConfetti()
    const [loading, setLoading] = React.useState(false)
    const onClick = async() => {
        try {
            setLoading(true)

            await markChapterAsCompleted(chapterId, courseId, !isCompleted)
            if (!isCompleted && !nextChapterId) {
                confetti.onOpen()
            }
            if (nextChapterId && !isCompleted) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

            toast.success('Progress updated')
            router.refresh()
        } catch (error) {
            toast.error('An error occurred. Please try again later')
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button
            type='button'
            variant={isCompleted ? 'outline' : 'success'}
            className='w-full md:w-auto'
            onClick={onClick}
            disabled={loading}
        >
            {isCompleted ? t("complete") : t("not_complete")}
            <Icon className='ml-2 h-4 w-4' />
        </Button>
    )
}

export default CourseProgressButton