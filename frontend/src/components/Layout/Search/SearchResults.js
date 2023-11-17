import React, { useEffect, useState } from 'react';
import styles from "./SearchResult.module.scss"
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles)
function SearchResults() {
    //CHUYEN CAC TAB
    const [activeTab, setActiveTab] = useState('account');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    return (
        <>
            <div className={cx('')}>
                <div className={cx('search-content')}>
                    <div className={cx("card-header")}>
                        <span>header </span>
                    </div>

                    <div className={cx('row-right')}>
                        <div className="card-body">
                            <div className={cx('header-right')}>
                                <ul role="tablist" className="nav rounded mb-3">
                                    <li className={cx("nav-item", { 'active': activeTab === 'account' })}>
                                        <div onClick={() => handleTabChange('account')}>
                                            Account
                                        </div>
                                    </li>
                                    <li className={cx("nav-item", { 'active': activeTab === 'article' })} style={{ marginLeft: "40px" }}>
                                        <div onClick={() => handleTabChange('article')}>
                                            Article
                                        </div>
                                    </li>
                                    <li className={cx("nav-item", { 'active': activeTab === 'recipe' })} style={{ marginLeft: "40px" }}>
                                        <div onClick={() => handleTabChange('recipe')}>
                                            Recipe
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div id="account" className={`tab-pane fade ${activeTab === 'account' ? 'show active pt-3' : ''}`}>
                                    Account
                                </div>
                                <div id="article" className={`tab-pane fade ${activeTab === 'article' ? 'show active pt-3' : ''}`}>
                                    Article
                                </div>
                                <div id="recipe" className={`tab-pane fade ${activeTab === 'recipe' ? 'show active pt-3' : ''}`}>
                                    Recipe
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default SearchResults;