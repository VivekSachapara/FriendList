import React from "react";

/**
 * Function to render the pagination
 * @param {*} props 
 * @returns {HTMLElement}
 */
const Pagination = props => {
    const { currentPage, totalCount, paginationClick } = props;
    const noOfPages = Math.ceil(totalCount / 4);

    /**
     * 
     * @param {Number} currentPage 
     * @param {Number} noOfPages 
     * @returns 
     */
    const makePaginationContent = (currentPage, noOfPages) => {
        const initiater = 1, identifier = [1], paginationContent = [];
        let l;
        if (noOfPages <= 1) {
            return identifier;
        }
        for (let i = currentPage - initiater; i <= currentPage + initiater; i++) {
            if (i < noOfPages && i > 1) {
                identifier.push(i);
            }
        }
        identifier.push(noOfPages);
        for (const i of identifier) {
            if (l) {
                if (i - l === 2) {
                    paginationContent.push(l + 1);
                } else if (i - l !== 1) {
                    paginationContent.push("...");
                }
            }
            paginationContent.push(i);
            l = i;
        }
        return paginationContent;
    }

    /**
     * Function to handle the page number click
     * @param {Number} pageNumber 
     */
    const handlePagination = (pageNumber) => {
        paginationClick(pageNumber);
    }

    /**
     * Function to cpature the left pagination arrow click
     */
    const leftArrowClick = () => {
        if (currentPage - 1 >= 1) {
            paginationClick(currentPage - 1);
        }
    }

    /**
     * Function to cpature the left pagination arrow click
     */
    const rightArrowClick = () => {
        if (currentPage + 1 <= noOfPages) {
            paginationClick(currentPage + 1);
        }
    }

    return (
        <div className="pagiationWrapper">
            <span onClick={() => leftArrowClick()}>&laquo;</span>
            {makePaginationContent(currentPage, noOfPages).map((elm) => (
                elm === "..." ?
                    <React.Fragment key={elm}>
                        <span>{elm}</span>
                    </React.Fragment>
                    :
                    <React.Fragment key={elm}>
                        <span className={elm === currentPage ? "active" : "pointer"} onClick={() => handlePagination(elm)}>{elm}</span>
                    </React.Fragment>
            )
            )}
            <span onClick={() => rightArrowClick()}>&raquo;</span>
        </div>
    )
}
export default Pagination;
