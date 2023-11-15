
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
function Search() {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    if (profileInformation) var userId = profileInformation._id
    else var userId = new Date().toString()
    const [searchResult, setSearchResult] = useState([]);
    const [listHistory, setListHistory] = useState([])
    const [keyword, setKeyword] = useState("")
    const handleGetHistory = () => {
        const req = { _id: userId }
        socket.emit('getHistory', req)
    }
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
            // console.log('result'.data)
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
                visible={searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="1"{...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Account                                                    </h4>
                            <AccountItem />
                            <AccountItem />
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