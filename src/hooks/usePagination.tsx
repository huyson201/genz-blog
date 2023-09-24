import { useEffect, useMemo, useState } from "react"

interface PaginationData {
    next: number | null,
    prev: number | null,
    leftRange: number[],
    rightRange: number[],
    currentPage: number,
    showDot: boolean
}


const Dot = "..."

const usePagination = (totalPage: number, currentPage: number, siblingCount = 1) => {


    const range = (start: number, end: number) => {
        const length = end - start + 1
        return Array.from({ length }).map((_, index) => index + start)
    }


    const pageRange = useMemo(() => {
        const nextPage = currentPage < totalPage ? currentPage + 1 : null
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

        /*
        * *  currentPage + firstPage + lastPage + 2 dot = 5
        */
        const totalPageNumbers = siblingCount * 2 + 5

        // case 1: totalPageNumber >= totalPage => show all page [1....totalPage]  
        if (totalPageNumbers - 2 >= totalPage) {
            return {
                nextPage,
                prevPage,
                pages: range(1, totalPage)
            }

        }

        const firstPageIndex = 1
        const lastPageIndex = totalPage

        // * leftSiblingIndex min = 1, max = currentPage - siblingCount
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        // * rightSiblingIndex max = totalPage, min = currentPage + siblingCount
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage)



        // * lastIndex + dot = 2 => totalPage - 2
        const shouldShowRightDots = rightSiblingIndex < totalPage - 2

        // * firstIndex + dot => 1 + 1 = 2
        const shouldShowLeftDots = leftSiblingIndex > 2

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return {
                nextPage,
                prevPage,
                pages: [...leftRange, Dot, lastPageIndex]
            }
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPage - rightItemCount + 1,
                totalPage
            );
            return {
                nextPage,
                prevPage,
                pages: [firstPageIndex, Dot, ...rightRange]
            }

        }

        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return {
            nextPage,
            prevPage,
            pages: [firstPageIndex, Dot, ...middleRange, Dot, lastPageIndex]
        }


    }, [totalPage, currentPage, siblingCount])

    return pageRange
}

export default usePagination