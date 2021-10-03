import React, { useState } from "react";
import "../common/style.css";
import Friend from "./Friend";
import Pagination from "./Pagination";
import dummyData from "../common/content/dummyData";
import BlackImage from "../common/assets/black.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

class Friends extends React.Component {
    // const [friendList, setFriendList] = useState([...dummyData.content]);
    // const [inputValue, setInputValue] = useState("");
    // const [filteredList, setFilteredList] = useState([...dummyData.content]);
    // const [noResultMessage, setNoResultMessage] = useState(false);
    // const [properWord, setProperWord] = useState(true);

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

    //     const handleKeyPress = (event) => {
    //         if (event.key === "Enter") {
    //             setFriendList();
    //         }
    //     }

    //     const searchInputChange = (e) => {
    //         const value = e.target.value;
    //         setInputValue(value);
    //         let updatedArray = [];
    //         if (value && value.length > 0) {
    //             const regrex = /^[a-zA-Z]*$/;
    //             if (value.match(regrex)) {
    //                 updatedArray = [...friendList].filter((elm) => {
    //                     return elm.name.toLowerCase().match(value.toLowerCase())
    //                 })
    //                 setProperWord(true)
    //             }
    //             else {
    //                 setProperWord(false)
    //             }
    //             if (updatedArray.length === 0) {
    //                 setNoResultMessage(true);
    //             }
    //         }
    //         else {
    //             updatedArray = [];
    //             setNoResultMessage(false);
    //         }
    //         setFilteredList(updatedArray);
    //     }
    //    const handleFavouriteClick = (id) => {
    //     }
    //     const deleteFriend = (id) => {

    //     }
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

    componentDidUpdate() {
    }
    handleKeyPress = (event) => {
        const { friendList, properWord } = this.state;
        const value = event.target.value;
        if (event.key === "Enter") {
            // setFriendList();
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
    deleteFriend = (id, value) => {
        this.setState({
            deleteFriend: true,
            deleteFriendId: id
        })
    }

    handlePaginationClick = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }

    handleSort = () => {
        const { orderByDesc, friendList, filteredList } = this.state;

        if (orderByDesc) {
            const arrayFriendList = friendList.sort((x) => x.favourite ? -1 : 1);
            const arrayFilteredList = filteredList.sort((x) => x.favourite ? -1 : 1);
            this.setState({
                friendList: arrayFriendList,
                filteredList: arrayFilteredList,
                orderByDesc: false
            })
            const favouriteTitle = document.querySelector(".favouriteTitle");
            console.log(favouriteTitle)
            favouriteTitle.style.background = "#d1ffea";
        }
        else {
            const arrayFriendList = friendList.sort((x) => !x.favourite ? -1 : 1);
            const arrayFilteredList = filteredList.sort((x) => !x.favourite ? -1 : 1);
            this.setState({
                friendList: arrayFriendList,
                filteredList: arrayFilteredList,
                orderByDesc: true
            })
            const favouriteTitle = document.querySelector(".favouriteTitle");
            console.log(favouriteTitle)
            favouriteTitle.style.background = "none"
        }
    }

    displayDeleteAlert = () => {
        const {filteredList, deleteFriendId} = this.state;
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
        const { inputValue, filteredList, properWord, friendList, noResultMessage, currentPage, orderByDesc, deleteFriend } = this.state;
        console.log(deleteFriend, "df")
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
                        {/* {
                            filteredList.length > 0 &&
                            <div className="titleWrapper">
                                <span className="nameTitle">Name</span>
                                <div className="sortBy" onClick={this.handleSort}>
                                    <div>
                                        <div>Sort By</div>
                                        <div className="favouriteTitle">favourite</div>
                                    </div>
                                    <span className="arrowWrapper">
                                        {
                                            orderByDesc ?
                                                <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                                        }
                                    </span>
                                </div>
                            </div>
                        } */}
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
                            // renderFriendsList()
                            <React.Fragment>
                                <Friend content={filteredList} currentPage={currentPage} favouriteClick={(id, val) => this.handleFavouriteClick(id, val)} offset={4}
                                    noResultMessage={noResultMessage} properWord={properWord} deleteFriendClick={(id, val) => this.deleteFriend(id, val)}></Friend>
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