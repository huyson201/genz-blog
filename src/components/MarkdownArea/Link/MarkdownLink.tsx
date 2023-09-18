
import Link from 'next/link'
import React from 'react'

type Props = {
    children: any,
    href?: string,
    title?: string,
    className?: string
}

const MarkdownLink = ({ children, title, href, className }: Props) => {
    return (
        <Link className='text-blue' href={`${href}`}>{children || title}</Link>
    )
}

export default MarkdownLink