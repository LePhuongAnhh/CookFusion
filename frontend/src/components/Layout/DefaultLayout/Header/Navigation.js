import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import 'tippy.js/dist/tippy.css';

import styles from './Navigation.module.scss'
import classNames from 'classnames/bind'
import images from '~/assets/images'
import {
    apiUrl,
    ACCESS_TOKEN,
    ACCOUNT_ID,
    ROLE,
    PROFILE_INFORMATION,
    USERNAME
} from "../../../../constants/constants.js"
import ShowInfor from '../../AdminLayout/Header/ShowInfor';

const cx = classNames.bind(styles)
function Navigation() {
    const navigate = useNavigate();
    const logout = (event) => {
        event.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(ACCOUNT_ID)
        localStorage.removeItem(ROLE)
        localStorage.removeItem(PROFILE_INFORMATION)
        navigate("/")
    }

    const [searchResult, setSearchResult] = useState([]);
    return (
        <>
            <header className={cx('site_navbar')}>
                <div className={cx('header_container')}>
                    <div class={cx('row_header')}>
                        <div class={cx('header_item_left')}>
                            <div className={cx('gird_left')}>
                                <Link to="/homepage" className={cx('text_black')}>
                                    <img className={cx('text_primary')} src={images.logo} />
                                    <span>
                                        <img className={cx('avt_title_name')} src={images.Title_web} />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        {/* responsive  */}
                        <button className={cx("button-menu-mobile")}>
                            <label htmlFor="navInput">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </label>
                        </button>

                        <div className={cx('header_item_center')}>
                            <nav className={cx('site_navigation')}>
                                <ul className={cx('site_menu')} >
                                    <li>
                                        <div className={cx('text_item1')}>
                                            <Link to="/article" className={cx('nav_link')}>
                                                <span className={cx('text_item')}>Article</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={cx('text_item1')}>
                                            <Link to="/recipe" className={cx('nav_link')}>
                                                <span className={cx('text_item')}>Recipe</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={cx('text_item1')}>
                                            <Link to="/planmeal" className={cx('nav_link')}>
                                                <span className={cx('text_item')}>Plan Meal</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={cx('text_item1')}>
                                            <Link to="#" className={cx('nav_link')}>
                                                <span className={cx('text_item')}>Sponsor</span>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class={cx('header_item_right')}>
                            <div className={cx('gird_right')}>
                                <div className={cx('nav_link_right')}>
                                    <li className={cx('notification_list')}>
                                        {/* thông báo  */}
                                        <ShowInfor />
                                    </li >
                                </div>
                                <div className={cx('nav_link_right')}>
                                    <Link onClick={logout}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <input
                hidden
                className={cx('navbarInput')}
                type="checkbox"
                name=""
                id="navInput"
            />
            {/* sidebar responsive  */}
            <label htmlFor="navInput" className={cx("overlaySidebar")}></label>
            <div className={cx('left_side_menu')}>
                <div className={cx('slimscroll_menu')}>
                    <div id="sidebar-menu" className={cx('sidebar_menu')}>
                        <ul className={cx('metismenu')}>
                            <li className={cx('logo-respon')}>
                                <Link to="/homepage" className={cx('text_image')}>
                                    <span>GournFood</span>
                                </Link>
                            </li>
                            {/* for iad  */}
                            <label htmlFor="navInput" className={cx('sidebarClose')}>
                            </label>
                            <hr className={cx('line')}></hr>
                            {/* ****** */}
                            <li>
                                <Link to="#" className={cx('active')}>
                                    <i class="bi bi-terminal-dash"></i>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={cx('active')}>
                                    <i class="bi bi-terminal-dash"></i>
                                    <span>Article</span>
                                </Link>
                            </li>
                            <li >
                                <Link to="#" className={cx('active')}>
                                    <i className="bi bi-gear"></i>
                                    <span>Recipe </span>
                                    {/* <span className={cx('menu_arrow')}></span> */}
                                </Link>
                            </li>
                            <li >
                                <Link to="#" className={cx('active')}>
                                    <i className="bi bi-gear"></i>
                                    <span>Sponsor </span>
                                    {/* <span className={cx('menu_arrow')}></span> */}
                                </Link>
                            </li>
                            <li >
                                <Link to="#" className={cx('active')}>
                                    <i className="bi bi-gear"></i>
                                    <span>Plan Meal </span>
                                    {/* <span className={cx('menu_arrow')}></span> */}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation


