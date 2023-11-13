
// import React, { useEffect, useState } from 'react';
// import styles from "../DefaultLayout/DefaultLayout.module.scss"
// import classNames from 'classnames/bind'
// import { Link } from 'react-router-dom'
// import { useNavigate } from "react-router-dom"
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
// import AccountItem from '~/components/AccountItem';
// import { Wrapper as PopperWrapper } from '~/components/popper';

// const cx = classNames.bind(styles)
// function Search() {
//     const [searchResult, setSearchResult] = useState([]);
//     useEffect(() => {
//         setTimeout(() => {
//             setSearchResult([]);
//         }, 0);
//     }, []);
//     return (
//         <>
//             <Tippy
//                 interactive
//                 visible={searchResult.length > 0}
//                 render={(attrs) => (
//                     <div className={cx('search-result')} tabIndex="1"{...attrs}>
//                         <PopperWrapper>
//                             <h4 className={cx('search-title')}>Account                                                    </h4>
//                             <AccountItem />
//                             <AccountItem />
//                         </PopperWrapper>
//                     </div>
//                 )}
//             >
//                 <div className="input-group rounded">
//                     <input type="search" className={cx("form-control", "rounded")} placeholder="Search" aria-label="Search" aria-describedby="search-addon" style={{ width: "225px" }} />
//                     <span className={cx("input-group-text", "border-0")} id="search-addon">
//                         <i className="bi bi-search"></i>
//                     </span>
//                 </div>
//             </Tippy>
//         </>
//     );
// }

// export default Search;


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

const SearchHistory = ({ history, handleSearch }) => (
    <div className={cx('search-history')}>
        <h4 className={cx('history-title')}>Search History</h4>
        {history.map((item) => (
            <div key={item._id} className={cx('history-item')}>
                <span onClick={() => handleSearch(item.keyword, true)}>{item.keyword}</span>
            </div>
        ))}
    </div>
);

const SearchResultItem = ({ item, handleClick }) => (
    <div className={cx('search-result-item')} onClick={() => handleClick(item)}>
        {item.type === 'user' && <span>User: {item.name}</span>}
        {item.type === 'recipe' && <span>Recipe: {item.title}</span>}
        {item.type === 'article' && <span>Article: {item.title}</span>}
        {item.type === 'hashtag' && <span>Hashtag: {item.hashtag}</span>}
    </div>
);
function Search() {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    if (profileInformation) var userId = profileInformation._id
    else var userId = new Date().toString()

    const [searchResult, setSearchResult] = useState([]);
    const [listHistory, setListHistory] = useState([])
    const [keyword, setKeyword] = useState("")
    const [showHistory, setShowHistory] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

    const handleGetHistory = () => {
        const req = { _id: userId }
        socket.emit('getHistory', req)
        setShowHistory(true);
    }

    const handleSearch = (value, isEnd) => {
        setKeyword(value)
        const req = { keyword: value, _id: userId, isEnd: isEnd, isHashtag: false }
        if (value.trim().charAt(0) === '#') req.isHashtag = true
        socket.emit('search', req)
    }
    const handleItemClick = (item) => {
        console.log('Item Clicked:', item);
    };

    useEffect(() => {
        socket.on('history', (data) => {
            if (data.data._id == userId) {
                setListHistory(data.data)
                setSearchHistory(data.data.history);
            }
        })
        socket.on('search', (data) => {
            if (data.data._id == userId) {
                setSearchResult(data.data)
            }
        })
        return () => {
            socket.off('history')
            socket.off('search')
        }
    }, [searchResult, userId]);

    return (
        <>
            <Tippy
                interactive
                visible={searchResult.length > 0 || showHistory}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Account</h4>
                            {showHistory && <SearchHistory history={searchHistory} handleSearch={handleSearch} />}
                            {Array.isArray(searchResult) && searchResult.slice(0, 6).map((item) => (
                                <SearchResultItem key={item._id} item={item} handleClick={handleItemClick} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className="input-group rounded">
                    <input type="search" className={cx("form-control", "rounded")} value={keyword}
                        onClick={() => handleGetHistory()}
                        onChange={(e) => handleSearch(e.target.value, false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(keyword, true);
                            }
                        }} placeholder="Search" aria-label="Search" aria-describedby="search-addon" style={{ width: "225px" }} />
                    <span className={cx("input-group-text", "border-0")} id="search-addon">
                        <Link><i className="bi bi-search" onClick={() => handleSearch(keyword, true)}></i></Link>
                    </span>
                </div>
            </Tippy>
        </>
    );
}

export default Search;