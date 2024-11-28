"use client";

import React from 'react'
import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  


const SwitchLang = () => {
    const locale = useCurrentLocale()
    const changeLocale = useChangeLocale()
    return (
        <Select value={locale} onValueChange={changeLocale}>
            <SelectTrigger className="w-20 sm:w-[100px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="es">ES</SelectItem>
            </SelectContent>
        </Select>

    )

}

export default SwitchLang