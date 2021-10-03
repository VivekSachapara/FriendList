import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faTrashAlt as solidTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar as lightStar, faTrashAlt as lightTrash } from "@fortawesome/free-regular-svg-icons";
import React from "react";

const Friend = props => {
    const { content, noResultMessage, properWord, favouriteClick, deleteFriendClick, currentPage, offset } = props;
    const startIndex = (currentPage - 1) * offset;
    const data = content.slice(startIndex, currentPage * offset); 

    const handleFavouriteClick = (id, value) => {
        if (id) {
            favouriteClick(id, !value)
        }
    }
    const deleteFriend = (id, value) => {
        if (id) {
            deleteFriendClick(id, !value)
        }
    }
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
                                            <div className="deleteWrapper" onClick={() => deleteFriend(elm.id, elm.deleted)}>
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
                <div>Only alphabets are allowed</div> :
                <div>No result found (Press Enter to add to friend list)</div>
:
                showFriendList()
            }
        </>
    )
}

export default Friend;