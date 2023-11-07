import React, { useEffect, useState } from 'react';
import FooterForm from "./Footer/FooterForm";
import styles from "../AdsLayout/AdsLayout.module.scss"
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { apiUrl, PROFILE_INFORMATION, ACCOUNT_ID, ROLE, ACCESS_TOKEN } from "~/constants/constants";
import Search from '../Search';

const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
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

    //darkmode
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

    // State để điều khiển việc hiển thị dropdown thông báo
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    // Function xử lý việc mở/đóng dropdown thông báo
    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };
    // Function để đóng dropdown thông báo khi click bất kỳ đâu bên ngoài dropdown
    const closeNotification = () => {
        setIsNotificationOpen(false);
    };
    useEffect(() => {
        document.addEventListener("click", closeNotification);
        return () => document.removeEventListener("click", closeNotification);
    }, []);

    return (
        <body>
            <div>
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
                            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button> */}

                            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                                <div className="ms-auto d-none d-lg-block" >
                                    <Search />
                                </div>

                                <ul className="navbar-nav ms-auto ">
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 active" aria-current="page" to="/homepage">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 " to="/article">Article</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 " to="/recipe">Recipe</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 " to="/planmeal">Plan Meal</Link>
                                    </li>
                                </ul>

                                <ul className="navbar-nav ms-auto " style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* Kiểm tra nếu chưa đăng nhập, hiển thị nút Login */}
                                    {!isLoggedIn && (
                                        <li className={cx("nav-item")}>
                                            <Link className="nav-link mx-2 text-uppercase" to="/">
                                                Login
                                            </Link>
                                        </li>
                                    )}

                                    {/* Kiểm tra nếu đã đăng nhập, hiển thị icon thông báo, icon chat và avatar */}
                                    {isLoggedIn && (
                                        <>
                                            <div className="nav-item">
                                                <div className="nav-link mx-2 text-uppercase" onClick={toggleNotification}>
                                                    <i className="bi bi-bell"></i>
                                                </div>
                                                {isNotificationOpen && (
                                                    <div className={cx("notification-dropdown")} onClick={(e) => e.stopPropagation()}>
                                                        <div className={cx("noti-gird")}> Hkoo </div>
                                                    </div>
                                                )}
                                            </div>
                                            <li className={cx("nav-item")}>
                                                <div className="nav-link mx-2 text-uppercase" >
                                                    <i class="bi bi-chat-dots"></i>
                                                </div>
                                            </li>
                                            <li className={cx("nav-item")}>
                                                <div className={cx("nav-link", "mx-2", "avatar-container")}>
                                                    <Link to="/profile">
                                                        <img className={cx('avatar-header')} src={profileInformation.avatar} alt="" />
                                                    </Link>
                                                    <div className={cx("dropdown-content")}>
                                                        <Link to="#">Settings</Link>
                                                        <Link to="#">Change Password</Link>
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
                <div>
                    {children}
                </div>
                {/* <FooterForm /> */}
            </div >
        </body >
    );
}

export default DefaultLayout;