"use client"
import React from 'react'
import Markdown from 'markdown-to-jsx'
import { Head1, Head2, Head3, Head4, Head5, Head6 } from './HeadTitle/HeadTitle'
import CodeBlock from './CodeBlock/CodeBlock'
import MarkdownLink from './Link/MarkdownLink'
import BlockQuote from './BlockQuote/BlockQuote'
import Paragraph from './Paragraph/Paragraph'



type Props = {
    children: string
}

const MarkdownArea = ({ children }: Props) => {

    return (

        <div className=' text-base text-[#708ab0] dark:text-on_dark_text_gray'>
            <Markdown
                options={{
                    overrides: {
                        h1: { component: Head1 },
                        h2: { component: Head2 },
                        h3: { component: Head3 },
                        h4: { component: Head4 },
                        h5: { component: Head5 },
                        h6: { component: Head6 },
                        code: { component: CodeBlock },
                        a: { component: MarkdownLink },
                        blockquote: { component: BlockQuote },
                        p: { component: Paragraph },
                        pre: {
                            component: ({ children }) => {
                                if (React.isValidElement(children)) {
                                    const props = children.props as { children: string, className: string }
                                    const newProps = { children: props.children, className: props.className, inline: false }
                                    return React.cloneElement(children, newProps)
                                }
                                return <pre >{children}</pre>
                            }
                        }

                    }
                }}>
                {children}
            </Markdown>

        </div>
    )
}

export default MarkdownArea