
'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

type Props = {
    children: React.ReactNode | React.ReactNode[]
}

export type Theme = 'light' | 'dark'

const Provider = ({ children }: Props) => {
    return (
        <ThemeProvider attribute='class' defaultTheme='dark' themes={["dark", "light"]} >
            {children}
        </ThemeProvider>
    )
}

export default Provider