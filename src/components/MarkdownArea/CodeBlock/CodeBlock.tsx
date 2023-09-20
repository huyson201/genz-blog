"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import React, { useEffect, useMemo, useState } from 'react'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoIosCopy } from 'react-icons/io'
import { FaPaste } from 'react-icons/fa'
import toast from 'react-hot-toast';
import { programmingLanguages } from './language';

interface Props {
    children: any,
    className: string,
    inline?: boolean
}

const CodeBlock = ({ children, className, inline = true, ...props }: Props) => {
    const [copied, setCopied] = useState(false)
    const language = useMemo(() => {
        if (!className) return "text"
        const lang = className.replace("lang-", "")

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

    const handleCopy = () => {
        setCopied(true)
        toast.success("Copied code to clipboard")
    }

    if (inline) {
        return <code>
            <span className='bg-[#f1f3f5] dark:bg-gray-800 text-[#cd1d8d]'>{children}</span>
        </code>
    }

    return (
        <div className='highlight-wrapper my-4 overflow-hidden rounded-md relative bg-transparent'>
            <CopyToClipboard text={children}
                onCopy={handleCopy}>
                <button className='absolute top-2 text-xl text-on_light_text_white dark:text-on_dark_text_white right-2'>
                    {copied ? <FaPaste /> : <IoIosCopy />}
                </button>
            </CopyToClipboard>
            <div className='hidden dark:block'>
                <SyntaxHighlighter useInlineStyles customStyle={{ paddingTop: 32, paddingBottom: 16 }} showLineNumbers language={language} style={atomOneDark}>
                    {children}
                </SyntaxHighlighter>
            </div>
            <div className='dark:hidden block'>
                <SyntaxHighlighter useInlineStyles customStyle={{ paddingTop: 32, paddingBottom: 16 }} showLineNumbers language={language} style={atomOneLight}>
                    {children}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default CodeBlock