import React from "react";

const Pagination = props => {
    const { currentPage, totalCount, paginationClick } = props;
    const noOfPages = Math.ceil(totalCount / 4);

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

    const handlePagination = (pageNumber) => {
        paginationClick(pageNumber);
    }

    const leftArrowClick = () => {
        if (currentPage - 1 >= 1) {
            paginationClick(currentPage - 1);

        }
    }
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