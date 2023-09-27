import { usePathname } from "next/navigation"
import React from "react"

const useCallbackUrl = () => {
    const pathname = usePathname()
    const callbackUrl = React.useMemo(() => {
        if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) return "/";
        return pathname
    }, [pathname])

    return callbackUrl
}


export default useCallbackUrl