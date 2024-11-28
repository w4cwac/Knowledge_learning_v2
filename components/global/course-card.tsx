"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import IconBadge from './icon-badge'
import { BookOpen } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import CourseProgress from './course-progress'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { cp } from 'fs';
import { useI18n } from '@/locales/client';


type Props = {
    id: string,
    title: string,
    imageUrl: string,
    chaptersLength: number,
    price: number,
    progress?: number | null,
    category: string
}


const   CourseCard = ({ id, title, imageUrl, chaptersLength, price, progress, category } : Props) => {

    const t = useI18n()
    
    return (
        <Link 
            href={`/courses/${id}`}
        >
            
            <Card className='border-none shadow-none'>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='w-full aspect-video round overflow-hidden mb-6 border'>
                        <Image
                            alt={title}
                            className="object-cover w-full h-full"
                            height="200"
                            src={imageUrl}
                            width="350"
                        />
                    </div>
                    <Badge>
                        {t(category as keyof typeof t)}
                    </Badge>
                    <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
                        <div className='flex items-center gap-x-1 text-muted-foreground'>
                            <span>
                                {chaptersLength} {chaptersLength === 1 ? t("chapter") : t("chapters")}
                            </span>
                        </div>
                    </div>
                    {
                        progress ? (
                            <CourseProgress 
                                value={progress}
                                variant={progress === 100 ? 'success' : 'default'}
                            />
                        ) : (
                            <div className='text-md md:text-sm font-medium text-muted-foreground'>
                                {formatPrice(price)}
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        </Link>
    )
}

export default CourseCard