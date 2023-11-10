import React, { useEffect, useState } from 'react';
import FooterForm from "./Footer/FooterForm";
import styles from "../AdsLayout/AdsLayout.module.scss"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enUS } from 'date-fns/locale';
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { apiUrl, PROFILE_INFORMATION, ACCOUNT_ID, ROLE, ACCESS_TOKEN } from "~/constants/constants";
import Search from '../Search';
import images from '~/assets/images';
import ChatModal from '~/components/Modal/ChatModal';
import axios from 'axios'

const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const role = localStorage.getItem(ROLE);
    const [isLoggedIn, setIsLoggedIn] = useState(!!profileInformation);
    //Lấy thời gian
    const formatTime = (date) => {
        return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
    };

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


    //show info
    const [showNotification, setShowNotification] = useState(false);
    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };
    const closeNotification = () => {
        setShowNotification(false);
    };
    const [notification, setNotification] = useState([])
    const [following, setFollowing] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const [resNotification, resFollowing] = await Promise.all([
                    axios.get(`${apiUrl}/user/notification`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }),
                    axios.get(`${apiUrl}/user/getfollowing`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                ])
                console.log(resFollowing.data)
                if (resNotification.data.success && resFollowing.data.success) {
                    setNotification(resNotification.data.notifications.slice(0, 5))
                    setFollowing(resFollowing.data.following.slice(0, 5))
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])

    // avatar
    const [showProfile, setShowProfile] = useState(false);
    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };
    const closeProfile = () => {
        setShowProfile(false);
    };



    //CHAT
    const [showMessage, setShowMessage] = useState(false);
    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };
    const closeMessage = () => {
        setShowMessage(false);
    };

    //modal chart
    const [showMessageModal, setShowMessageModal] = useState(false);

    //choose article or recipe
    const [activeTab, setActiveTab] = useState('credit-card');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
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
                                            <Link className="nav-link mx-2" to="/">
                                                Login
                                            </Link>
                                        </li>
                                    )}

                                    {/* Kiểm tra nếu đã đăng nhập, hiển thị icon thông báo, icon chat và avatar */}
                                    {isLoggedIn && (
                                        <>
                                            <li className={cx("nav-item")} onClick={toggleNotification}>
                                                <div className="nav-link mx-2 " >
                                                    <i className="bi bi-bell"></i>
                                                </div>
                                            </li>
                                            {showNotification && (
                                                <div className={cx("notification-popup")} >
                                                    <div className={cx('header-info')}>Notification</div>
                                                    <div className={cx('article')}>
                                                        <ul role="tablist" className={cx("nav", "nav-pills", "rounded", "nav-fill")} style={{ display: "flex", backgroundColor: " #f9fafd" }}>
                                                            <li className={cx("nav-item-li")}>
                                                                <button onClick={() => handleTabChange('credit-card')} className={` ${activeTab === 'credit-card' ? 'active' : ''}`} style={{ height: "40px", marginLeft: '-18px' }}>
                                                                    Article
                                                                </button>
                                                            </li>
                                                            <li className={cx("nav-item-li")} >
                                                                <button onClick={() => handleTabChange('paypal')} className={` ${activeTab === 'paypal' ? 'active' : ''}`} style={{ height: "40px" }}>
                                                                    Recipe
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="tab-content">
                                                        {notification.length > 0 && notification.map((notifcation) => (
                                                            <div id="credit-card" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active ' : ''}`}>
                                                                <li className="p-2 border-bottom" onClick={closeNotification}>
                                                                    <a href="#!" className="d-flex justify-content-between">
                                                                        <div className="d-flex flex-row" style={{ marginBottom: '-6px' }}>
                                                                            <div style={{ marginTop: "6px" }}>
                                                                                <img
                                                                                    src={images.minh}
                                                                                    alt="avatar" className="d-flex align-self-center me-3 rounded-circle" width="45" height='45' />
                                                                                <span className="badge bg-danger badge-dot"></span>
                                                                            </div>
                                                                            <div className="pt-1">
                                                                                <p className={cx("show-message")}> {notifcation.message}</p>
                                                                                <p className="small">{formatDistanceToNow(new Date(notifcation.date), { addSuffix: true, locale: enUS })}</p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            </div>
                                                        ))}
                                                        <div id="paypal" className={`tab-pane fade ${activeTab === 'paypal' ? 'show active ' : ''}`}>
                                                            thong bao cua recipe

                                                        </div>
                                                    </div>
                                                </div>

                                            )}
                                            <li className={cx("nav-item")} onClick={toggleMessage}>
                                                <div className="nav-link mx-2 " >
                                                    <i className="bi bi-chat-dots"></i>
                                                </div>
                                            </li>
                                            {showMessage && (
                                                <div className={cx("notification-popup")}>
                                                    <div className={cx('header-info')}>Message</div>
                                                    <div className={cx("input-group-chat")}>
                                                        <input type="search" className={cx('search-chat')} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                                    </div>
                                                    <li className="p-2 border-bottom" onClick={() => setShowMessageModal(true)} >
                                                        <div onClick={closeMessage}>
                                                            <a href="#!" className="d-flex justify-content-between" >
                                                                <div className="d-flex flex-row" style={{ marginBottom: '-6px' }}>
                                                                    <div style={{ marginTop: "6px" }}>
                                                                        <img
                                                                            src={images.minh}
                                                                            alt="avatar" className="d-flex align-self-center me-3 rounded-circle" width="45" height='45' />
                                                                        <span className="badge bg-danger badge-dot"></span>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="fw-bold mb-0">Ashley Olsen</p>
                                                                        <p className="small">Lorem ipsum dolor sit.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className={cx('time-chat', 'text-muted')}>Yesterday</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </div>
                                            )}
                                            <li className={cx("nav-item")} onClick={toggleProfile}>
                                                <div className={cx("nav-link", "mx-2", "avatar-container")}>
                                                    <img className={cx('avatar-header')} src={profileInformation.avatar} alt="" />
                                                </div>
                                            </li>
                                            {showProfile && (
                                                <div className={cx("notification-popup-profile")} onClick={closeProfile}>
                                                    <Link to="/profile" className={cx("d-flex", "justify-content-between", "nav-item", "border-bottom", "info")} >
                                                        <div className="d-flex flex-row" style={{ marginBottom: '-6px' }}>
                                                            <div style={{ marginTop: "6px" }}>
                                                                <img
                                                                    src={images.minh}
                                                                    alt="avatar" className="d-flex align-self-center me-3 rounded-circle" width="35" height='35' />
                                                                <span className="badge bg-danger badge-dot"></span>
                                                            </div>
                                                            <div className="pt-1" style={{ marginTop: '5px' }}>
                                                                <p className="fw-bold mb-0">{profileInformation.name}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className={cx("d-flex", "nav-item", "info1")} >
                                                        <div className={cx('icon')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                                                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c1.8 0 3.5-.2 5.3-.5c-76.3-55.1-99.8-141-103.1-200.2c-16.1-4.8-33.1-7.3-50.7-7.3H178.3zm308.8-78.3l-120 48C358 277.4 352 286.2 352 296c0 63.3 25.9 168.8 134.8 214.2c5.9 2.5 12.6 2.5 18.5 0C614.1 464.8 640 359.3 640 296c0-9.8-6-18.6-15.1-22.3l-120-48c-5.7-2.3-12.1-2.3-17.8 0zM591.4 312c-3.9 50.7-27.2 116.7-95.4 149.7V273.8L591.4 312z" />
                                                            </svg>
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className=" mb-0" style={{ marginLeft: '10px' }}>Change Password</p>
                                                        </div>
                                                    </div>
                                                    <div className={cx("d-flex", "nav-item", "info1")} onClick={logout} >
                                                        <div className={cx('icon')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                                                            </svg>
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className=" mb-0" style={{ marginLeft: '15px' }}>Logout</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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
            </div >
            {showMessageModal && <ChatModal setShowMessageModal={setShowMessageModal} />}
        </body >
    );
}

export default DefaultLayout;