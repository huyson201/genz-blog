
'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
type Props = {
    children: React.ReactNode | React.ReactNode[]
}

export type Theme = 'light' | 'dark'

const Provider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='dark' themes={["dark", "light"]} >
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}

export default Provider