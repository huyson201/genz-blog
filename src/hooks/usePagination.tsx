import { useEffect, useState } from "react"

interface PaginationData {
    next: number | null,
    prev: number | null,
    leftRange: number[],
    rightRange: number[],
    currentPage: number,
    showDot: boolean
}

const limitLeftRange = 3
const limitRightRange = 1
const dotCount = 1


const usePagination = (totalPage: number, currentPage: number) => {
    const [data, setData] = useState<PaginationData>()
    useEffect(() => {
        let showDot = true
        let totalShow = limitLeftRange + limitRightRange + dotCount
        const nextPage = currentPage < totalPage ? currentPage + 1 : null
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        let leftRange: number[] = []
        let rightRange: number[] = []

        if (totalPage <= totalShow) {
            if (showDot) {
                showDot = false
                totalShow -= dotCount
            }

            for (let i = 1; i <= totalPage; i++) {
                leftRange.push(i)
            }
            setData({
                next: nextPage,
                prev: prevPage,
                leftRange,
                rightRange,
                currentPage,
                showDot
            })

            return
        }

        if (currentPage >= totalPage - limitRightRange - dotCount) {
            leftRange.push(1)
            if (showDot === true) {
                showDot = false
                totalShow -= dotCount
            }
            for (let i = (totalPage - totalShow) + 1; i <= totalPage; i++) {
                leftRange.push(i)
            }

            const rightLimit = totalPage - (currentPage + 1 + dotCount) < limitRightRange ? totalPage - (currentPage + 1 + dotCount) : limitRightRange

            for (let i = totalPage; i > totalPage - rightLimit; i--) {
                rightRange.push(i)
            }

            setData({
                next: nextPage,
                prev: prevPage,
                leftRange,
                rightRange,
                currentPage,
                showDot
            })

            return

        }

        if (currentPage < limitLeftRange) {
            if (!showDot) {
                showDot = true
                totalShow += dotCount
            }

            for (let i = 1; i <= limitLeftRange; i++) {
                leftRange.push(i)
            }
        }
        else {
            if (!showDot) {
                showDot = true
                totalShow += dotCount
            }
            leftRange.push(1)
            for (let i = currentPage; i < currentPage + limitLeftRange - 1; i++) {
                leftRange.push(i)
            }
        }

        const rightLimit = totalPage - (currentPage + 1) < limitRightRange ? totalPage - (currentPage + 1) : limitRightRange

        for (let i = totalPage; i > totalPage - rightLimit; i--) {
            rightRange.push(i)
        }

        setData({
            next: nextPage,
            prev: prevPage,
            leftRange,
            rightRange,
            currentPage,
            showDot
        })



    }, [totalPage, currentPage])
    return data
}

export default usePagination