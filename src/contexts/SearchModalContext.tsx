
import React, { useState } from 'react'

interface SearchModalType {
    isOpen: boolean,
    close: () => void,
    open: () => void
}

const SearchModalContext = React.createContext<SearchModalType | null>(null)
export const useSearchModal = () => React.useContext(SearchModalContext)

export const SearchModalProvider = ({ children }: { children: any }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <SearchModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
            {children}
        </SearchModalContext.Provider>
    )
}