
'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { SearchModalProvider } from '@/contexts/SearchModalContext'
type Props = {
    children: React.ReactNode | React.ReactNode[]
}

export type Theme = 'light' | 'dark'

const Provider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='dark' themes={["dark", "light"]} >
                <SWRConfig value={{ revalidateOnFocus: false, errorRetryCount: 2 }}>
                    <SearchModalProvider>
                        {children}
                    </SearchModalProvider>
                </SWRConfig>
            </ThemeProvider>
        </SessionProvider>
    )
}

export default Provider