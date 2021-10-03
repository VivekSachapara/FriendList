import React from "react";
import Friend from "./Friend";
import Pagination from "./Pagination";
//Importing the dummy data list for the friends
import dummyData from "../common/content/dummyData";
import "../common/style.css";

/**
 * @class {Friends}
 * @extends {Component}
 */
class Friends extends React.Component {

    state = {
        friendList: [],
        inputValue: "",
        filteredList: [],
        noResultMessage: false,
        properWord: true,
        currentPage: 1,
        orderByDesc: true,
        deleteFriend: false,
        deleteFriendId: null
    }

    componentDidMount() {
        const { friendList, filteredList } = this.state;
        if (friendList.length === 0 && filteredList.length === 0) {
            const data = [...dummyData.content];
            this.setState({
                friendList: data,
                filteredList: data
            })
        }
    }

    /**
     * Function to capture event when user hits the enter key
     * @param {Event} event 
     */
    handleKeyPress = (event) => {
        const { friendList, properWord } = this.state;
        const value = event.target.value;
        if (event.key === "Enter") {
            if (value && value.length > 0 && properWord) {
                const desc = "is your friend";
                const content = {
                    id: friendList.length + 1,
                    name: value,
                    description: desc,
                    favourite: false,
                    deleted: false
                };
                this.setState({
                    friendList: [...friendList, content],
                    inputValue: "",
                    noResultMessage: false,
                    filteredList: [...friendList, content]
                })
            }
        }
    }

    /**
     * Function to hande the search input box
     * @param {Event} e 
     */
    searchInputChange = (e) => {
        const { friendList } = this.state;
        const value = e.target.value;
        let updatedArray = [];
        if (value && value.length > 0) {
            const regrex = /^[a-zA-Z\s]*$/;
            if (value.match(regrex)) {
                updatedArray = friendList.filter((elm) => {
                    return elm.name.toLowerCase().match(value.toLowerCase())
                })
                if (updatedArray.length > 0) {
                    this.setState({
                        inputValue: value,
                        properWord: true,
                        filteredList: updatedArray,
                        noResultMessage: false
                    })
                }
                else {
                    this.setState({
                        inputValue: value,
                        properWord: true,
                        filteredList: updatedArray,
                        noResultMessage: true
                    })
                }
            }
            else {
                this.setState({
                    inputValue: value,
                    properWord: false,
                    filteredList: updatedArray,
                    noResultMessage: true
                })
            }
        }
        else {
            updatedArray = [];
            this.setState({
                inputValue: value,
                noResultMessage: false,
                filteredList: friendList
            })
        }
    }

    /**
     * Function to handle the favourite click 
     * @param {Number} id 
     * @param {boolean} value 
     */
    handleFavouriteClick = (id, value) => {
        const { filteredList, friendList } = this.state;
        const updatedArray = friendList.map(elm => elm.id === id ?
            {
                ...elm,
                favourite: value
            }
            : elm
        )

        const updatedFilteredArray = filteredList.map((elm => elm.id === id ?
            {
                ...elm,
                favourite: value
            }
            :
            elm
        ))
        this.setState({
            filteredList: updatedFilteredArray,
            friendList: updatedArray
        })
    }

    /**
     * handle the delete button pressed
     * @param {Number} id 
     */
    deleteFriend = (id) => {
        this.setState({
            deleteFriend: true,
            deleteFriendId: id
        })
    }

    /**
     * Handle pagination keys
     * @param {Number} pageNumber 
     */
    handlePaginationClick = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }

    /**
     * Function to handle the sorting functionality
     */
    handleSort = () => {
        const { orderByDesc, friendList, filteredList } = this.state;
        let arrayFriendList = [];
        let arrayFilteredList = [];
        if (orderByDesc) {
            arrayFriendList = friendList.sort((x) => x.favourite ? -1 : 1);
            arrayFilteredList = filteredList.sort((x) => x.favourite ? -1 : 1);
        }
        else {
            arrayFriendList = friendList.sort((a, b) => a.id - b.id);
            arrayFilteredList = filteredList.sort((a, b) => a.id - b.id);
        }
        const favouriteTitle = document.querySelector(".favouriteTitle");
        favouriteTitle.style.background = orderByDesc ? "#d1ffea" : "none";
        this.setState({
            friendList: arrayFriendList,
            filteredList: arrayFilteredList,
            orderByDesc: !orderByDesc,
            currentPage: 1
        })
    }

    /**
     * Function to render the html part in case if user clicks on delete button
     * @returns {HTMLElement}
     */
    displayDeleteAlert = () => {
        const { filteredList, deleteFriendId } = this.state;
        const overlay = document.querySelector(".overlay");
        if (overlay) {
            overlay.style.display = "block";
        }
        const friend = filteredList.find((elm) => elm.id === deleteFriendId);
        return (
            <div className="deleteAlert">
                <div>Do you Want to remove {friend ? friend.name : "NA"} from your friend list?</div>
                <div className="buttonWrapper">
                    <button onClick={() => this.handleDeleteFriend(true)}>
                        Ok
                    </button>
                    <button onClick={() => this.handleDeleteFriend(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    /**
     * Handel the delete functionality of user
     * @param {Boolean} toBeDeleted 
     */
    handleDeleteFriend = (toBeDeleted) => {
        const { filteredList, friendList, deleteFriendId } = this.state;

        if (toBeDeleted) {
            const updatedArray = friendList.filter(elm => elm.id !== deleteFriendId);
            const updatedFilteredArray = filteredList.filter(elm => elm.id !== deleteFriendId);
            this.setState({
                friendList: updatedArray,
                filteredList: updatedFilteredArray,
                currentPage: 1,
                deleteFriend: false,
                deleteFriendId: null
            })
        }
        else {
            this.setState({
                deleteFriend: false,
                deleteFriendId: null
            })
        }
        const overlay = document.querySelector(".overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    render() {
        const { inputValue, filteredList, properWord, noResultMessage, currentPage, deleteFriend } = this.state;
        return (
            <div className="mainContainer">
                <div className="overlay"></div>
                <div className="friendList">
                    <div className="friendListWrapper">
                        <h3 className="title"> Friends List</h3>
                        <div>
                            <div className="searchInputWrapper">
                                <input type="text" placeholder="Enter Your Friend's Name" id="searchInput"
                                    onKeyPress={(event) => this.handleKeyPress(event)} value={inputValue} onChange={(e) => this.searchInputChange(e)}></input>
                            </div>
                            <span className="inputError"></span>
                        </div>
                        {
                            filteredList.length > 0 &&
                            <div className="titleWrapper">
                                <span className="nameTitle">Name</span>
                                <div className="sortBy" onClick={this.handleSort}>
                                    <div>Sort By: </div>
                                    <div className="favouriteTitle">favourite</div>
                                </div>
                            </div>
                        }
                        {
                            <React.Fragment>
                                <Friend content={filteredList} currentPage={currentPage} favouriteClick={(id, val) => this.handleFavouriteClick(id, val)} offset={4}
                                    noResultMessage={noResultMessage} properWord={properWord} deleteFriendClick={(id) => this.deleteFriend(id)}></Friend>
                            </React.Fragment>
                        }
                    </div>
                    {filteredList && filteredList.length > 4 && <Pagination currentPage={currentPage} paginationClick={(val) => this.handlePaginationClick(val)} totalCount={filteredList.length}></Pagination>}
                </div>
                {deleteFriend && this.displayDeleteAlert()}
            </div>
        )
    }
}

export default Friends;
