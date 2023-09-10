import { usePathname } from "next/navigation"
import React from "react"

const useCallbackUrl = () => {
    const pathname = usePathname()
    const callbackUrl = React.useMemo(() => {
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) return null;
        return pathname
    }, [pathname])

    return callbackUrl
}


export default useCallbackUrl