// import Navigation from "./Header/Navigation";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./AdsLayout.module.scss"
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import images from '~/assets/images';
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN, ROLE, ACCOUNT_ID } from '~/constants/constants';

const cx = classNames.bind(styles)
function AdsLayout({ children }) {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const [isLoggedIn, setIsLoggedIn] = useState(!!profileInformation);
    //logout
    const navigate = useNavigate();
    const logout = (event) => {
        event.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(ACCOUNT_ID)
        localStorage.removeItem(ROLE)
        localStorage.removeItem(PROFILE_INFORMATION)
        navigate("/")
    }

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
    };
    useEffect(() => {
        const savedMode = JSON.parse(localStorage.getItem(localStorageKey));
        if (savedMode !== null) {
            setIsDarkMode(savedMode);
        }
    }, []);
    return (
        <body className={cx("body-wrapper", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
            <div
                id="wrapper"
                className={cx("wrapper", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                {/* Header  */}
                <div className={cx("header-ads")}>
                    <div className={cx("superNav", "border-bottom", "py-2", "bg-light", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                        <div className="container">
                            <div className="row">
                                <div className={cx("col-lg-6", "col-md-6", "col-sm-12", "col-xs-12", "centerOnMobile")}>
                                    {/* <select className="me-3 border-0">
                                        <option value="en-us">EN-US</option>
                                    </select> */}
                                    <span className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-3"><strong>info@somedomain.com</strong></span>
                                    <span className="me-3"><i className="fa-solid fa-phone me-1 text-warning"></i> <strong>1-800-123-1234</strong></span>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block d-md-block-d-sm-block d-xs-none text-end">
                                    <span className="me-3">
                                        <Link to="#" className={cx('nav_link')} onClick={handleModeChange}>
                                            {isDarkMode ? (
                                                <i className="bi bi-moon-fill"></i>
                                            ) : (
                                                <i className="bi bi-brightness-high-fill"></i>
                                            )}
                                        </Link>
                                    </span>
                                    <span className="me-3">
                                        <i className="fa-solid fa-file  text-muted me-2"></i><Link className="text-muted" to="#">Policy</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light shadow-sm,  { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
                        <div className="container">
                            <Link className="navbar-brand" to="#"><i className="fa-solid fa-shop me-2"></i> <strong className={cx('logo-text')}> GourmetFood</strong></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                                <div className="ms-auto d-none d-lg-block">
                                    <div className="input-group rounded">
                                        <input type="search" className={cx("form-control", "rounded")} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                        <span className={cx("input-group-text", "border-0")} id="search-addon">
                                            <i className="bi bi-search"></i>
                                        </span>
                                    </div>
                                </div>
                                <ul className="navbar-nav ms-auto ">
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 active" aria-current="page" to="/homepage">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 " to="/article">Article</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 " to="/dashboardAds">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 " to="/packageAds">Packages</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-auto " style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* Kiểm tra nếu chưa đăng nhập, hiển thị nút Login */}
                                    {!isLoggedIn && (
                                        <li className={cx("nav-item")}>
                                            <Link className="nav-link mx-2 text-uppercase" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                    )}

                                    {/* Kiểm tra nếu đã đăng nhập, hiển thị icon thông báo, icon chat và avatar */}
                                    {isLoggedIn && (
                                        <>
                                            <li className={cx("nav-item")}>
                                                <div className="nav-link mx-2 text-uppercase" >
                                                    <i className="bi bi-bell"></i>
                                                </div>
                                            </li>
                                            <li className={cx("nav-item")}>
                                                <div className="nav-link mx-2 text-uppercase" >
                                                    <i class="bi bi-chat-dots"></i>
                                                </div>
                                            </li>
                                            <li className={cx("nav-item")}>
                                                <div className={cx("nav-link", "mx-2", "avatar-container")}>
                                                    <Link to="/profileSponsor">
                                                        <img className={cx('avatar-header')} src={profileInformation.avatar} alt="" />
                                                    </Link>
                                                    <div className={cx("dropdown-content")}>
                                                        <Link to="/settings">Settings</Link>
                                                        <Link to="/change-password">Change Password</Link>
                                                        <Link onClick={logout}>Logout</Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className={cx('body-home', { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                    {children}
                </div>
            </div>
        </body>
    );
}

export default AdsLayout;