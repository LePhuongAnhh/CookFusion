
import React, { useEffect, useState } from 'react';
import styles from "../DefaultLayout/DefaultLayout.module.scss"
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/popper';

const cx = classNames.bind(styles)
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);
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
                    <input type="search" className={cx("form-control", "rounded")} placeholder="Search" aria-label="Search" aria-describedby="search-addon" style={{ width: "225px" }} />
                    <span className={cx("input-group-text", "border-0")} id="search-addon">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </Tippy>
        </>
    );
}

export default Search;