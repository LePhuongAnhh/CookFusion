import React, { useEffect, useState } from 'react';
import styles from "../DefaultLayout/DefaultLayout.module.scss"
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/popper';
import { io } from 'socket.io-client'
import {
    PROFILE_INFORMATION
} from "~/constants/constants"

const socket = io('http://localhost:9996/', { transports: ['websocket'] })
const cx = classNames.bind(styles)
function Search() {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    if (profileInformation) var userId = profileInformation._id
    else var userId = new Date().toString()
    const [searchResult, setSearchResult] = useState([]);
    const [listHistory, setListHistory] = useState([]);    //lưu trữ lịch sử và hottrend
    const [keyword, setKeyword] = useState("");
    const MAX_HISTORY_ITEMS = 5;
    const MAX_RESULTS_PER_CATEGORY = 3;

    //ẩn history khi bắt đầu input
    const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

    const [isSearchInputEmpty, setIsSearchInputEmpty] = useState(true);
    const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

    const handleSearchResultClick = () => {
        setIsSearchResultsVisible(false);
    };

    //Cập nhật sự kiện onChange của ô tìm kiếm để cập nhật trạng thái isSearchInputEmpty
    const onChange = (e) => {
        setKeyword(e.target.value);
        setIsSearchInputEmpty(e.target.value.trim() === "");
        handleSearch(e.target.value, false);

    }
    // Điều chỉnh sự kiện onBlur của ô tìm kiếm để ẩn kết quả khi người dùng rời khỏi ô tìm kiếm:
    const onBlur = () => {
        setIsSearchInputFocused(false);
        setIsSearchInputEmpty(true);
    }

    //gọi hàm handleGetHistory
    useEffect(() => {
        handleGetHistory();
    }, []);
    //Cập nhật hàm handleGetHistory để cập nhật state historyAndTrend khi nhận được dữ liệu từ
    const handleGetHistory = () => {
        const req = { _id: userId };
        socket.emit('getHistory', req);
    };
    const handleSearch = (value, isEnd) => {
        setKeyword(value)
        const req = { keyword: value, _id: userId, isEnd: isEnd, isHashtag: false }
        if (value.trim().charAt(0) === '#') req.isHashtag = true
        socket.emit('search', req)
    }
    useEffect(() => {
        socket.on('history', (data) => {
            console.log(data)
            if (data.success && data.data.history.length > 0 && data.data._id == userId) {
                setListHistory(data.data)
                // data.data.trend / history / hashtag
                console.log(data.data)
            }
        })
        socket.on('search', (data) => {
            if (data.success && data.data._id == userId) {
                setSearchResult(data.data)
                // data.data.users / articles/ recipes/ hashtags
                console.log(data.data)
            }
        })
        return () => {
            socket.off('history')
            socket.off('search')
        }
    }, [searchResult]);
    return (
        <>
            <Tippy
                interactive
                placement='bottom-start'
                // visible={searchResult.length > 0 || Object.keys(listHistory).length > 0}
                // visible={isSearchInputFocused && !isSearchInputEmpty && (searchResult.length > 0 || Object.keys(listHistory).length > 0)}
                visible={isSearchInputFocused && (searchResult.length > 0 || Object.keys(listHistory).length > 0)}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="1"{...attrs}>
                        <PopperWrapper style={{ marginLeft: "0px" }}>
                            {/* <h4 className={cx('search-title')}>Account                                                    </h4> */}
                            {listHistory.history && (
                                <>
                                    {/* Hiển thị lịch sử tìm kiếm */}
                                    <h5 className={cx('title-history')}></h5>
                                    {listHistory.history.slice(0, MAX_HISTORY_ITEMS).map((item) => (
                                        <div className={cx('show-history')} key={item._id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                            </svg>
                                            &nbsp;
                                            {item.keyword}</div>
                                    ))}
                                </>
                            )}
                            {listHistory.trend && (
                                <>
                                    {/* Hiển thị hot trend */}
                                    {/* <h5>Hot Trend</h5> */}
                                    {listHistory.trend.map((item) => (
                                        <div className={cx('show-history', 'font-text')} key={item._id}>
                                            <svg style={{ color: "red" }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                                            </svg> &nbsp;{item.keyword}</div>
                                    ))}
                                </>
                            )}
                            {listHistory.hashtag && (
                                <>
                                    {listHistory.hashtag.map((item) => (
                                        <div className={cx('show-history', 'font-text')} key={item._id}>
                                            <svg style={{ color: "red" }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                                            </svg> &nbsp;{item.keyword}
                                        </div>
                                    ))}
                                </>
                            )}

                            {searchResult.articles && (
                                <>
                                    <h5></h5>
                                    {searchResult.articles.slice(0, MAX_RESULTS_PER_CATEGORY).map((article) => (
                                        <div className={cx('show-history')} key={article._id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg> &nbsp;{article.name}</div>
                                    ))}
                                </>
                            )}
                            {searchResult.recipes && (
                                <>
                                    <h5></h5>
                                    {searchResult.recipes.slice(0, MAX_RESULTS_PER_CATEGORY).map((recipe) => (
                                        <div className={cx('show-history')} key={recipe._id} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg> &nbsp;
                                            {recipe.name}</div>
                                    ))}
                                </>
                            )}
                            {searchResult.hashtags && (
                                <>
                                    <h5></h5>
                                    {searchResult.hashtags.slice(0, MAX_RESULTS_PER_CATEGORY).map((hashtag) => (
                                        <div className={cx('show-history')} key={hashtag._id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>&nbsp;
                                            {hashtag.name}</div>
                                    ))}
                                </>
                            )}
                            {searchResult.users && (
                                <>
                                    <h5 className={cx('title-history')}>Other</h5>
                                    {searchResult.users.slice(0, MAX_RESULTS_PER_CATEGORY).map((user) => (
                                        <Link to={`/profile/${user._id}`} key={user._id} className={cx('wrapper')} onClick={handleSearchResultClick}>
                                            <img className={cx('avatar')} src=' {user.avatar}' />
                                            <div className={cx('info')}>
                                                <h4 className={cx('name')}>
                                                    <span> {user.name}</span>
                                                </h4>
                                                {/* <span className={cx('username')}> {user.username}</span> */}
                                            </div>
                                        </Link>
                                    ))}
                                </>
                            )}

                        </PopperWrapper>
                    </div >
                )
                }
            >
                <div className="input-group rounded">
                    <input type="search" className={cx("form-control", "rounded")} value={keyword}
                        onClick={() => handleGetHistory()}
                        onChange={(e) => handleSearch(e.target.value, false)}
                        onBlur={() => setIsSearchInputFocused(false)}
                        onFocus={() => {
                            setIsSearchInputFocused(true);
                            handleGetHistory();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(keyword, true);
                            }
                        }} placeholder="Search" aria-label="Search" aria-describedby="search-addon" style={{ width: "225px" }} />
                    <span className={cx("input-group-text", "border-0")} id="search-addon">
                        <Link><i className="bi bi-search" onClick={() => handleSearch(keyword, true)}></i></Link>
                    </span>
                </div>
            </Tippy >
        </>
    );
}

export default Search;