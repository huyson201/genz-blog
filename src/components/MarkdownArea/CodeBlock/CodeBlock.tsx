"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import React, { useEffect, useMemo, useState } from 'react'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoIosCopy } from 'react-icons/io'
import { FaPaste } from 'react-icons/fa'
import toast from 'react-hot-toast';
import { programmingLanguages } from './language';
import { useTheme } from 'next-themes';
type Props = {
    children: any,
    className: string
}

const CodeBlock = ({ children, className = "" }: Props) => {
    const { theme } = useTheme()
    const [copied, setCopied] = useState(false)
    const [mounted, setMounted] = useState(false)

    const language = useMemo(() => {
        const lang = className.replace('lang-', '')
        const mapLang = programmingLanguages[lang]
        if (mapLang) return mapLang.toLowerCase()
        return lang
    }, [className])


    useEffect(() => {
        if (!copied) return
        const id = setTimeout(() => {
            setCopied(false)
        }, 1000);
        return () => clearTimeout(id)
    }, [copied])

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleCopy = () => {
        setCopied(true)
        toast.success("Copied code to clipboard")
    }
    if (!mounted) return null

    return (
        <div className='highlight-wrapper overflow-hidden rounded-md relative bg-transparent'>
            <CopyToClipboard text={children}
                onCopy={handleCopy}>
                <button className='absolute top-2 text-xl text-on_light_text_white dark:text-on_dark_text_white right-2'>
                    {copied ? <FaPaste /> : <IoIosCopy />}
                </button>
            </CopyToClipboard>
            <SyntaxHighlighter useInlineStyles customStyle={{ paddingTop: 32 }} showLineNumbers language={language} style={theme === 'dark' ? atomOneDark : atomOneLight}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeBlock