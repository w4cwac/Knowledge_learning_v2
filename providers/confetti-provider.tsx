"use client"

import { useConfetti } from '@/hooks/use-confetti'
import React from 'react'
import ReactConfetti from 'react-confetti'

const ConfettiProvider = () => {
    const confetti = useConfetti()
    if(!confetti.isOpen) return null

    return (
        <ReactConfetti
            className='pointer-events-none z-[9999]'
            numberOfPieces={1000}
            recycle={false}
            onConfettiComplete={
                () => confetti.onClose()
            }
        />
    )
}

export default ConfettiProvider