"use client"

import { Button } from '@/components/ui/button'
import { stripeCheckout } from '@/data'
import { formatPrice } from '@/lib/format'
import { useI18n } from '@/locales/client'
import React from 'react'
import { toast } from 'sonner'


type Props = {
    courseId: string
    price: number
}


const CourseEnrollButton = ({ courseId, price } : Props) => {
    
    const t = useI18n()
    const [loading, setLoading] = React.useState(false)
    const onClick = async() => {
        try {
            setLoading(true)
            const response = await stripeCheckout(courseId)
            if (!response.url) {
                throw new Error("Failed to enroll")
            }
            window.location.assign(response.url)
        } catch (error) {
            toast.error("Failed to enroll")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button
            className='w-full md:w-auto'
            onClick={onClick}
            disabled={loading}
        >
            {t("enroll")} {formatPrice(price)}
        </Button>
    )
}

export default CourseEnrollButton