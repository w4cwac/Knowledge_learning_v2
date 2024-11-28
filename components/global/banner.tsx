import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import React from 'react'



const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-destructive text-destructive-foreground",
        success: "bg-green-200 text-green-800",
      }
    },
    defaultVariants: {
      variant: "warning"
    }
  }
)


interface BannerProps extends VariantProps<typeof bannerVariants> {
  label : string
}


const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle
}

const Banner = ({ label, variant } : BannerProps) => {
    
    const Icon = iconMap[variant || 'warning']

    return (
      <div className={cn(
        bannerVariants({ variant }),
      )}>
        <Icon className='mr-2 h-4 w-4'/>
        {label}
      </div>
    )
}

export default Banner