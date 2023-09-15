import { useEffect, useState } from "react"

interface PaginationData {
    next: number | null,
    prev: number | null,
    leftRange: number[],
    rightRange: number[],
    currentPage: number,
    showDot: boolean
}




const usePagination = (totalPage: number, currentPage: number) => {
    const [data, setData] = useState<PaginationData>()
    useEffect(() => {
        if (currentPage > totalPage) return
        let limitLeftRange = 3
        let limitRightRange = 1
        let dotCount = 1
        let showDot = true
        let totalShow = limitLeftRange + limitRightRange + dotCount
        const nextPage = currentPage < totalPage ? currentPage + 1 : null
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        let leftRange: number[] = []
        let rightRange: number[] = []
        const rightLimit = totalPage - (currentPage + 1) < limitRightRange ? totalPage - (currentPage + 1) : limitRightRange

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

        if (currentPage + 1 >= totalPage - 1) {
            if (showDot === true) {
                showDot = false
                limitLeftRange += 1
            }
            leftRange.push(1)
            limitLeftRange -= 1
            const startIndex = currentPage === totalPage ? currentPage - limitLeftRange : currentPage - (limitLeftRange - 1);
            const endIndex = currentPage === totalPage ? currentPage : currentPage + 1

            for (let i = startIndex; i <= endIndex; i++) {
                leftRange.push(i)
            }


        } else if (currentPage < limitLeftRange) {
            if (!showDot) {
                showDot = true
            }

            for (let i = 1; i <= limitLeftRange; i++) {
                leftRange.push(i)
            }
        }
        else {
            if (!showDot) {
                showDot = true
            }
            leftRange.push(1)
            limitLeftRange -= 1

            const startIndex = currentPage - (limitLeftRange - 1 - 1)
            const endIndex = currentPage + 1
            for (let i = startIndex; i <= endIndex; i++) {
                leftRange.push(i)
            }
        }


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