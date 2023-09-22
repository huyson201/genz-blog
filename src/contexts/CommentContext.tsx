"use client"
import React, { useState } from 'react'
export interface CommentContextType {
    reply: string | null,
    updateId: string | null,
    setReply: (value: string | null) => void
    setUpdate: (value: string | null) => void
}
const CommentContext = React.createContext<CommentContextType | null>(null)
export const useComment = () => React.useContext(CommentContext)

export const CommentContextProvider = ({ children }: { children: any }) => {
    const [reply, setReply] = useState<string | null>(null)
    const [updateId, setUpdateId] = useState<string | null>(null)
    const setReplyState = (value: string | null) => {
        setReply(value)
    }
    const setUpdateState = (value: string | null) => {
        setUpdateId(value)
    }
    return (
        <CommentContext.Provider value={{ reply, updateId, setUpdate: setUpdateState, setReply: setReplyState }}>
            {children}
        </CommentContext.Provider>
    )

}