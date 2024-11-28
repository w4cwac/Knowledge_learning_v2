"use client";

import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'


type Props = {
    id: string,
    label: string,
    isCompleted: boolean,
    courseId: string,
    isLocked: boolean
}

const CourseSidebarChapter = ({ id, label, isCompleted, courseId, isLocked } : Props) => {
    
    const pathname = usePathname()
    const router = useRouter()
    const Icon = isLocked ? Lock : (
        isCompleted ? CheckCircle : PlayCircle
    )
    const isActive = pathname.includes(id)
    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`)
    }
    
    return (
        <button 
            className={cn(
                "flex items-center gap-x-2 text-muted-foreground text-sm font-[500] pl-6 transition-all hover:text-muted-foreground/60 hover:bg-muted/40",
                isActive && "text-muted-foreground bg-muted/40",
                isCompleted && "text-primary ",
                isCompleted && isActive && "bg-primary/10"

            )}
            onClick={onClick}
        >
            <div className={cn(
                'flex items-center gap-x-2 py-4',
            )}
            >
                <Icon 
                    size={22}
                    className={cn(
                        isActive && "text-muted-foreground",
                        isCompleted && "text-primary"
                    )}
                />
                {label}
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-muted-foreground h-full transition-all",
                isActive && "opacity-100",
                isCompleted && "border-primary"
            )}/>
        </button>
    )
}

export default CourseSidebarChapter