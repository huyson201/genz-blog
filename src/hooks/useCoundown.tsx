import { useEffect, useRef, useState } from "react"

const useCountdown = (initValue: number) => {
    const idRef = useRef<NodeJS.Timeout>()
    const [time, setTime] = useState(initValue)
    const [isStart, setIsStart] = useState(false)

    useEffect(() => {
        if (!isStart) {
            clearInterval(idRef.current)
            return
        }
        const handleCountdown = () => {
            console.log("countdown")
            setTime(prev => {
                if (prev - 1 === 0) setIsStart(false)
                return prev - 1
            })
        }
        idRef.current = setInterval(handleCountdown, 1000)

        return () => clearInterval(idRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStart, initValue])

    const start = () => {
        setIsStart(true)
    }

    const stop = () => {
        setIsStart(false)
    }

    const restart = () => {
        setTime(initValue)
        setIsStart(true)

    }

    return { start, stop, restart, time }
}

export default useCountdown