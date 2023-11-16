import HeaderAdmin from "./Header/HeaderAdmin";
import FooterAdmin from "./Footer/FooterAdmin";
import classNames from 'classnames/bind'
import styles from "./AdminLayout.module.scss"

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import { apiUrl, ACCESS_TOKEN, PROFILE_INFORMATION, ACCOUNT_ID, ROLE } from '~/constants/constants';
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import ShowInfor from './Header/ShowInfor';
import images from '~/assets/images'

const cx = classNames.bind(styles)

function AdminLayout({ children }) {

    const navigate = useNavigate();
    const logout = (event) => {
        event.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(ACCOUNT_ID)
        localStorage.removeItem(ROLE)
        localStorage.removeItem(PROFILE_INFORMATION)
        navigate("/")
    }
    const { t, i18n } = useTranslation();

    // dropdown account
    const [isDropdownOpenAccount, setIsDropdownOpenAccount] = useState(false);
    const toggleDropdownAccount = () => {
        setIsDropdownOpenAccount(!isDropdownOpenAccount);
    };

    // dropdown post
    const [isDropdownOpenPost, setIsDropdownOpenPost] = useState(false);
    const toggleDropdownPost = () => {
        setIsDropdownOpenPost(!isDropdownOpenPost);
    };

    // Set initial dark mode from localStorage or default to false
    const localStorageKey = 'darkMode';
    const initialMode = JSON.parse(localStorage.getItem(localStorageKey)) || false;
    const [isDarkMode, setIsDarkMode] = useState(initialMode);
    const saveToLocalStorage = (value) => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    };

    const handleModeChange = () => {
        setIsDarkMode(!isDarkMode);
        saveToLocalStorage(!isDarkMode);
        // Any additional actions upon changing dark mode
    };

    useEffect(() => {
        const savedMode = JSON.parse(localStorage.getItem(localStorageKey));
        if (savedMode !== null) {
            setIsDarkMode(savedMode);
        }
    }, []);

    return (
        <div id="wrapper" className={cx("wrapper", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
            <div  >
                <div className={cx('navbar_custom', { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                    <ul className={cx('list_unstyled')}>
                        {/* chuyển màu  */}
                        <li className={cx('notification_list')}>
                            <Link to="#" className={cx('nav_link')} onClick={handleModeChange}>
                                {isDarkMode ? (
                                    <i className="bi bi-moon-fill"></i> // Icon Moon (Chế độ tối)
                                ) : (
                                    <i className="bi bi-brightness-high-fill"></i> // Icon Sun (Chế độ sáng)
                                )}
                            </Link>
                        </li>

                        <li className={cx('notification_list')}>
                            {/* thông báo  */}
                            <ShowInfor />
                        </li >
                        <li className={cx('notification_list')}>
                            <li onClick={logout} className={cx('notification_list')}>
                                <Link to="#" className={cx('nav_link')}>
                                    <i class="bi bi-door-closed"></i>
                                </Link>
                            </li>
                        </li>
                        <li className={cx('notification_list')}>
                            <a className={cx('nav_link_dropdown_toggle')} data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <img src={images.phanh} alt="user-image" className={cx('rounded_circle')} />
                                <span className={cx('ml_1')}>Phanh
                                </span>
                            </a>
                        </li>
                    </ul >
                    {/* LOGO  */}
                    < div className={cx('logo_box')} >
                        <Link to="#" className={cx('logo_center')}>
                            <span className={cx('logo_lg')}>
                                {/* <img className={cx("main-logo")} src={images.logoAdmin} alt="logo" />
                                <img className={cx("second-logo")} src={images.secondLogo} alt="logo" /> */}
                                GourmetFood
                            </span>
                        </Link>
                    </ div >
                    {/* search */}
                    <ul className={cx('list_unstyled_search')}>
                        {/* for ipad  */}
                        <li>
                            <button className={cx("button-menu-mobile")}>
                                <label htmlFor="navInput">
                                    <i class="bi bi-list"></i>
                                </label>
                            </button>
                        </li>
                    </ul>
                </div >
                <input
                    hidden
                    className={cx('navbarInput')}
                    type="checkbox"
                    name=""
                    id="navInput"
                />

                {/* Left Sidebar Start */}
                <label htmlFor="navInput" className={cx("overlaySidebar")}></label>
                <div className={cx('left_side_menu', { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                    <div className={cx('slimscroll_menu')}>
                        <div id="sidebar-menu" className={cx('sidebar_menu')}>
                            <ul className={cx('metismenu')}>
                                <li className={cx('menu_title')}>Navigation</li>
                                {/* for iad  */}
                                <label htmlFor="navInput" className={cx('sidebarClose')}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi bi-x"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </label>
                                <div className={cx('sidebarListAvt')}>
                                    <img
                                        src={images.Avt}
                                        width="50"
                                        height="50"
                                        className={cx('sidebarAvt')}
                                    />
                                    <label>Phanh</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                                    </svg>
                                </div>
                                <hr className={cx('line')}></hr>
                                {/* ****** */}
                                <li  >
                                    <Link to="/dashboard" className={cx('active')}>
                                        <i class="bi bi-terminal-dash"></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li >
                                    <Link to="/profileAdmin" className={cx('active')}>
                                        <i className="bi bi-gear"></i>
                                        <span>Account Setting </span>
                                        <span className={cx('menu_arrow')}></span>
                                    </Link>
                                </li>
                                <li className={cx('menu_title')}>More</li>
                                <li  >
                                    <Link to="/accountmanagement" className={cx('active')} onClick={toggleDropdownAccount}>
                                        <i class="bi bi-people"></i>
                                        <span>Account</span>
                                        <div className={cx("icon-dropdown")}>
                                            <i className={`${isDropdownOpenAccount ? 'bi bi-chevron-down' : 'bi bi-chevron-right'}`}></i>
                                        </div>
                                    </Link>
                                    {isDropdownOpenAccount && (
                                        <ul className={cx("dropdown-content")}>
                                            <li>
                                                <Link to="/userManagement">User</Link>
                                            </li>
                                            <li>
                                                <Link to="/sponsormanagement">Sponsor</Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li >
                                    <Link to="/articlemanagement" className={cx('active')}>
                                        <i className="bi bi-gear"></i>
                                        <span>Article </span>
                                        <span className={cx('menu_arrow')}></span>
                                    </Link>
                                </li>
                                <li  >
                                    <Link to="/recipemanagement" className={cx('active')} onClick={toggleDropdownAccount}>
                                        <i class="bi bi-people"></i>
                                        <span>Recipe</span>
                                        <div className={cx("icon-dropdown")}>
                                            <i className={`${isDropdownOpenAccount ? 'bi bi-chevron-down' : 'bi bi-chevron-right'}`}></i>
                                        </div>
                                    </Link>
                                    {isDropdownOpenAccount && (
                                        <ul className={cx("dropdown-content")}>
                                            <li>
                                                <Link to="/category">Category</Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li >
                                    <Link to="/planmealmanagement" className={cx('active')}>
                                        <i class="bi bi-gear"></i>
                                        <span>Plan Meal </span>
                                    </Link>
                                </li>
                                <li >
                                    <Link to="/packageAdsMagagement" className={cx('active')}>
                                        <i class="bi bi-gear"></i>
                                        <span>Package Ads </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("content_page", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                <div className={cx("content")}>
                    <div className={cx("content_fluid")}>
                        {children}
                    </div>
                </div>
                <FooterAdmin />
            </div>
        </div>
    );
}

export default AdminLayout