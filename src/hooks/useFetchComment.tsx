import commentService from '@/services/comment.service'
import { Comment } from '@/types/type'
import { removeDuplicateObj } from '@/utils/removeDuplicateObj'
import { useEffect, useState } from 'react'


function useFetchComment(postId: string, page: number) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Comment[]>([])
    const [error, setError] = useState<any>([])
    const [hasMore, setHasMore] = useState(true)

    // const removeDuplicate = (data: Comment[]) => {
    //     const seen = new Set();
    //     return data.filter(value => {
    //         const id = value._id
    //         if (!seen.has(id)) {
    //             seen.add(id)
    //             return true
    //         }

    //         return false
    //     })
    // }
    useEffect(() => {
        setLoading(true)
        const abortController = new AbortController()
        commentService.getComments(postId, { page, limit: 5, signal: abortController.signal })
            .then(res => {
                setData((prevData) => removeDuplicateObj([...prevData, ...res.docs]))
                setHasMore(res.nextPage !== null)
            })
            .catch(error => {
                if (error instanceof DOMException) return
                setError(error.message)
            })
            .finally(() => setLoading(false))

        return () => abortController.abort()

    }, [page, , postId])

    return { data, hasMore, error, loading, setData }

}

export default useFetchComment
