import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faTrashAlt as solidTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar as lightStar, faTrashAlt as lightTrash } from "@fortawesome/free-regular-svg-icons";

/**
 * Function to display list of friend
 * @param {Object} props 
 * @returns 
 */
const Friend = props => {
    const { content, noResultMessage, properWord, favouriteClick, deleteFriendClick, currentPage, offset } = props;
    const startIndex = (currentPage - 1) * offset;
    const data = content.slice(startIndex, currentPage * offset);

    /**
     * Function to handle favourite click
     * @param {Number} id 
     * @param {boolean} value 
     */
    const handleFavouriteClick = (id, value) => {
        if (id) {
            favouriteClick(id, !value)
        }
    }

    /**
     * Function to delete friend
     * @param {Number} id 
     */
    const deleteFriend = (id) => {
        if (id) {
            deleteFriendClick(id)
        }
    }

    /**
     * Function to render the list of friends
     * @returns {HTMLElement}
     */
    const showFriendList = () => {
        return (
            <>
                {
                    data.map((elm) => {
                        return (
                            <React.Fragment key={elm.id}>
                                <div className="friendWrapper">
                                    <div className="nameWrapper">
                                        <div className="name">{elm.name}</div>
                                        <div className="desc">{elm.description}</div>
                                    </div>
                                    <div className="iconWrapper">
                                        <div className="favourite">
                                            <div className="favouriteWrapper" onClick={() => handleFavouriteClick(elm.id, elm.favourite)}>
                                                <FontAwesomeIcon
                                                    icon={elm.favourite ? solidStar : lightStar}
                                                ></FontAwesomeIcon>
                                            </div>
                                        </div>
                                        <div className="delete">
                                            <div className="deleteWrapper" onClick={() => deleteFriend(elm.id)}>
                                                <FontAwesomeIcon
                                                    icon={elm.deleted ? solidTrash : lightTrash}
                                                ></FontAwesomeIcon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </>
        )
    }
    return (
        <>
            {
                noResultMessage ? !properWord ?
                    <div className="errorMessage" dangerouslySetInnerHTML={{ __html: `<sup>*</sup>Only alphabets are allowed` }}></div> :
                    <div className="noResultMessage">No result found (Press Enter to add to friend list)</div>
                    :
                    showFriendList()
            }
        </>
    )
}

export default Friend;
