"use client"
import React, { useState } from 'react'
export interface CommentContextType {
    isOpen?: boolean
    close: () => void
    open: () => void
}
const MobileNavContext = React.createContext<CommentContextType | null>(null)
export const useMobileNav = () => React.useContext(MobileNavContext)

export const MobileNavContextProvider = ({ children }: { children: any }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }
    return (
        <MobileNavContext.Provider value={{ isOpen, open, close }}>
            {children}
        </MobileNavContext.Provider>
    )

}