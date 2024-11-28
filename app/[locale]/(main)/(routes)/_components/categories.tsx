"use client"

import { Category } from '@prisma/client'
import React from 'react'
import { IconType } from 'react-icons'
import {
    FcEngineering,
    FcFilmReel,
    FcSportsMode,
    FcMusic,
    FcBusinessman,
    FcBriefcase,
    FcReading,
    FcGraduationCap,
} from 'react-icons/fc'
import CategoryItem from './category-item'
import { useI18n } from '@/locales/client'

type Props = {
    items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Engineering": FcEngineering,
    "Film": FcFilmReel,
    "Sports": FcSportsMode,
    "Business": FcBusinessman,
    "Business & Finance": FcBriefcase,
    "Reading": FcReading,
    "Education": FcGraduationCap,
    "Technology": FcEngineering,
    "Science": FcGraduationCap,
    "Health": FcSportsMode,
    "Art": FcMusic,
    "Fashion": FcBriefcase,
}

const Categories = ({ items } : Props) => {

    const t = useI18n()


    return (
        <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
            {
                items.map((item) => (
                    <CategoryItem
                        key={item.id}
                        label={t(item.name as keyof typeof t)}
                        icon={iconMap[item.name]}
                        value={item.id}
                    />
                ))
            }
        </div>
    )
}

export default Categories