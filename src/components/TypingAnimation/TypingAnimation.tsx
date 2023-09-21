"use client"
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge';
type Props = {
    words: string[],
    className?: string
}

const TypingAnimation = ({ words, className }: Props) => {
    const wordRef = useRef<HTMLSpanElement | null>(null)
    useEffect(() => {

        let wordIndex = 0
        let charIndex = 0
        let isDelete = false
        const typeEffect = () => {
            if (!wordRef.current) return
            const word = words[wordIndex]
            const char = word.substring(0, charIndex)
            wordRef.current.textContent = char
            if (!isDelete && charIndex < word.length) {
                charIndex++
            }
            else if (isDelete && charIndex > 0) {
                charIndex--
            }
            else {
                wordIndex = isDelete ? wordIndex === words.length - 1 ? 0 : wordIndex + 1 : wordIndex
                isDelete = !isDelete
            }
        }
        const interval = setInterval(typeEffect, 200); // Adjust the typing speed here
        return () => clearInterval(interval);
    }, [words]);

    return (
        <div>
            <span ref={wordRef} className={twMerge(className)}>
                Designer
            </span>
            <span className='text-[29px] xs:text-[34px] sm:text-[44px] md:text-[60px] dark:text-white cursor-animate'>|</span>
        </div>
    );

}

export default TypingAnimation