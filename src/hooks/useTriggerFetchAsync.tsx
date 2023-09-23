import { useState } from "react"

const useTriggerFetchAsync = <T extends any[], U>(callback: (...args: T) => U | Promise<U>) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>()
    const [data, setData] = useState<U>()

    const handler = (...args: T): U | Promise<U> => {
        setLoading(true)
        const res = callback(...args)
        if (res instanceof Promise) {
            res.then(data => {
                setData(data)
            }).catch(error => setError(error)).finally(() => setLoading(false))
        }
        else {
            setLoading(false)
        }

        return res
    }

    return { trigger: handler, loading, error, data }
}

export default useTriggerFetchAsync


