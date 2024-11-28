"use client";

import React from 'react'
import { Progress } from '../ui/progress'
import { cn } from '@/lib/utils'
import { useI18n } from '@/locales/client'


type Props = {
    value: number
    variant?: 'success' | 'default',
    size?: "default" | "sm"
}

const colorByVariant = {
    default: "text-muted-foreground",
    success: "text-primary"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

const CourseProgress = async({ variant, value, size } : Props) => {
    
    const t = useI18n()
    return (
        <div>
            <Progress 
                className='h-2'
                value={value}
                variant={variant}
            />
            <p className={cn(
                "font-medium mt-2",
                colorByVariant[variant || "default"],
                sizeByVariant[ size || "default"]
            )}>
                {Math.round(value)}% {t('completed')}
            </p>
        </div>
    )
}

export default CourseProgress