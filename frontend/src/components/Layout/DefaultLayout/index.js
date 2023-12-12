import React, { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enUS } from 'date-fns/locale';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { io } from 'socket.io-client'


//import trong thư viện
import { apiUrl, PROFILE_INFORMATION, ACCOUNT_ID, ROLE, ACCESS_TOKEN } from "~/constants/constants";
import classNames from 'classnames/bind'
import FooterForm from "./Footer/FooterForm";
import ChatModal from '~/components/Modal/ChatModal';
import styles from "./DefaultLayout.module.scss"
import Search from '../Search';
import images from '~/assets/images';
import ChangePassWord from '~/components/Modal/ChangePassword';

const socket = io('https://gourmetfoodie.onrender.com/', { transports: ['websocket'] })
const sjcl = require('sjcl');
const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const accountId = localStorage.getItem(ACCOUNT_ID);
    const role = localStorage.getItem(ROLE);
    const [isLoggedIn, setIsLoggedIn] = useState(!!profileInformation);
    const [showChangePassWordModal, setShowChangePassWordModal] = useState(false);
    const [userRole, setUserRole] = useState('');
    //Lấy thời gian

    //logout
    const navigate = useNavigate();
    const logout = (event) => {
        event.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(ACCOUNT_ID)
        localStorage.removeItem(ROLE)
        localStorage.removeItem(PROFILE_INFORMATION)
        navigate("/login")
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
    const headerClass = cx('header-ads', {
        'dark-mode': isDarkMode,
        'light-mode': !isDarkMode,
    });

    const bodyClass = cx('background-body', {
        'dark-mode': isDarkMode,
        'light-mode': !isDarkMode,
    });


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

    //SHOW CHAT
    const [showMessage, setShowMessage] = useState(false);
    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };
    const closeMessage = () => {
        setShowMessage(false);
    };

    //Logic
    const [chat, setChat] = useState([])
    const [otherUser, setOtherUSer] = useState([])
    const handleShowMessageModal = async (message, chating) => {
        try {
            if (!chating) setShowMessageModal(false)
            await axios.get(`${apiUrl}/message/seen/${message._id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const newlist = listMessage.map((messag) => {
                if (messag._id === message._id) {
                    return { ...messag, seen: true };
                }
                return messag;
            })
            setListMessage(newlist)
            setOtherUSer((message.sender[0]._id == accountId) ? message.receiver[0] : message.sender[0])
            var _id = (message.sender[0]._id == accountId) ? message.receiver[0]._id : message.sender[0]._id
            const res = await axios.get(`${apiUrl}/message/getmessage/${_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setChat(res.data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
        setShowMessageModal(true)
    }

    //modal chart
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [listMessage, setListMessage] = useState([])
    const [listNotifications, setListNotifications] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const [message, notifications] = await Promise.all([
                    axios.get(`${apiUrl}/message/getall`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }),
                    axios.get(`${apiUrl}/user/notification`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                ])

                if (message.data.success && notifications.data.success) {
                    setListMessage(message.data.data)
                    setListNotifications(notifications.data.notifications.sort((a, b) => new Date(b.date) - new Date(a.date)))
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
        socket.on('notification', (notification) => {
            console.log(notification)
            if (accountId == notification.userId) {
                //push new notification
                setListNotifications((prevList) => [notification, ...prevList])
            }
        })
        return () => {
            socket.off('notification')
        }
    }, [setListMessage])

    //choose article or recipe
    const [activeTab, setActiveTab] = useState('credit-card');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    //chia role
    const userMenu = [
        { path: '/', label: 'Home' },
        { path: '/article', label: 'Article' },
        { path: '/recipe', label: 'Recipe' },
        { path: '/planmeal', label: 'Plan Meal' },
    ];

    const sponsorMenu = [
        { path: '/', label: 'Home' },
        { path: '/article', label: 'Article' },
        { path: '/dashboardAds', label: 'Dashboard' },
        { path: '/packageAds', label: 'Packages' },
    ];

    //for mobile
    const menuRoleUser = [
        {
            label: 'Home', path: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
        },
        {
            label: 'Article', path: '/article', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-feather" viewBox="0 0 16 16">
                <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.765 3.765 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1c-1.95 1.686-3.168 3.724-3.758 5.423-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88.017.04.035.082.056.122A68.362 68.362 0 0 0 .08 15.198a.528.528 0 0 0 .157.72.504.504 0 0 0 .705-.16 67.606 67.606 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.528.528 0 0 0 0-.739l-.729-.744 1.311.209a.504.504 0 0 0 .443-.15c.222-.23.444-.46.663-.684.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.524.524 0 0 0-.112-.172ZM3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196a.526.526 0 0 0-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.282 1.282 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a6.85 6.85 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524-1.581-.25Zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a7.97 7.97 0 0 1 1.564-.173Z" />
            </svg>
        },
        {
            label: 'Recipe', path: '/recipe', icon:
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor" ><path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>

        },
        {
            label: 'Plan Meal', path: '/planmeal', icon: <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="currentColor">
                <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
            </svg>
        },
    ];
    const menuRoleSponsor = [
        {
            label: 'Home', path: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
        },
        {
            label: 'Article', path: '/article', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-feather" viewBox="0 0 16 16">
                <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.765 3.765 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1c-1.95 1.686-3.168 3.724-3.758 5.423-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88.017.04.035.082.056.122A68.362 68.362 0 0 0 .08 15.198a.528.528 0 0 0 .157.72.504.504 0 0 0 .705-.16 67.606 67.606 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.528.528 0 0 0 0-.739l-.729-.744 1.311.209a.504.504 0 0 0 .443-.15c.222-.23.444-.46.663-.684.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.524.524 0 0 0-.112-.172ZM3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196a.526.526 0 0 0-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.282 1.282 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a6.85 6.85 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524-1.581-.25Zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a7.97 7.97 0 0 1 1.564-.173Z" />
            </svg>
        },
        {
            label: 'Dashboard', path: '/dashboardAds', icon:
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" /></svg>
        },
        {
            label: 'Packages', path: '/packageAds', icon: <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="currentColor">
                <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" /></svg>
        },
    ];

    const allowedRoles = ['653b77c56139d7a2604cedb9', '653b77c46139d7a2604cedb7'];
    const menuRole = allowedRoles.includes(role) ? (role === '653b77c46139d7a2604cedb7' ? menuRoleSponsor : menuRoleUser) : [];
    const menu = allowedRoles.includes(role) ? (role === '653b77c46139d7a2604cedb7' ? sponsorMenu : userMenu) : [];
    const getProfileLink = (role) => {
        return role === '653b77c46139d7a2604cedb7' ? `/profileSponsor/${accountId}` : `/profile/${accountId}`;
    };

    return (
        <body>
            <div>
                <div className={cx("header-ads")}>
                    {/* //BÊN TRÊN */}
                    <div className={cx("superNav", "border-bottom", "py-2", "bg-light", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                        <div className={cx("container")}>
                            <div className="row">
                                <div className={cx("col-lg-6", "col-md-6", "col-sm-12", "col-xs-12", "centerOnMobile")}>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block d-md-block-d-sm-block d-xs-none text-end">
                                    <span className="me-3">
                                        <Link to="#" className={cx('nav_link')} onClick={handleModeChange}>
                                            {/* {isDarkMode ? (
                                                <i className="bi bi-moon-fill"></i>
                                            ) : (
                                                <i className="bi bi-brightness-high-fill"></i>
                                            )} */}
                                        </Link>
                                    </span>
                                    <span className="me-3">
                                        <i className="fa-solid fa-file  text-muted me-2"></i><Link className="text-muted" to="#"></Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BÊN DƯỚI  */}
                    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light shadow-sm,  { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
                        <div className={cx("container")}>
                            {/* LOGO  */}

                            {/* MENU MOBILE  */}
                            <div className={cx('menu-mobile')}>
                                <label htmlFor="navInput">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </label>
                            </div>
                            <Link className="navbar-brand" to="#">
                                <strong className={cx('logo-text')}> GourmetFood</strong>
                            </Link>

                            {/* SEARCH + MENU + INFO  */}
                            <div className={cx("navbar-collapse")} id="navbarNavDropdown">
                                {/* SEARCH */}
                                <div className={cx("ms-auto", "search-action")} >
                                    <Search />
                                </div>
                                {/* MENU  */}
                                <ul className={cx("center-nav", "ms-auto")}>
                                    {menu.map((item, index) => (
                                        <li className={cx("nav-item")} key={index}>
                                            <Link className={`nav-link mx-2 ${index === 0 ? 'active' : ''}`} to={item.path}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                {/* NOTIFICATION + PROFILE  */}
                                <ul className={cx("center-nav", "ms-auto ")} style={{ display: 'flex', alignItems: 'center' }}>

                                    {/* SEARCH MOBILE  */}
                                    <li className={cx("nav-item-show", 'search-mobile')} >
                                        <div className={cx("notification")} >
                                            <div style={{ fontSize: "21px", margin: " 6px 0 0 7px" }} className="bi bi-search"></div>
                                        </div>
                                    </li>


                                    {!isLoggedIn ? (
                                        <>
                                            <li className="nav-item">
                                                <a className="nav-link mx-2 active" href="/">
                                                    Home
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link mx-2 active" href="/recipe">
                                                    Recipe
                                                </a>
                                            </li>
                                            <li className={cx("nav-item")}>
                                                <Link className="nav-link mx-2" to="/login">
                                                    Login
                                                </Link>
                                            </li>

                                        </>
                                        // ) : userRole === '653b77c46139d7a2604cedb7' ? (
                                        //     <>
                                        //         <li className="nav-item">
                                        //             <a className="nav-link mx-2 active" href="/">
                                        //                 Home
                                        //             </a>
                                        //         </li>
                                        //         <li className="nav-item">
                                        //             <Link className="nav-link mx-2" to="/login">
                                        //                 Login
                                        //             </Link>
                                        //         </li>
                                        //     </>
                                        // ) : userRole === '653b77c56139d7a2604cedb9' ? (
                                        //     <>
                                        //         <li className={cx("nav-item")}>
                                        //             <Link className="nav-link mx-2" to="/login">
                                        //                 Login
                                        //             </Link>
                                        //         </li>
                                        //         <li className="nav-item">
                                        //             <a className="nav-link mx-2 active" href="/">
                                        //                 Home
                                        //             </a>
                                        //         </li>
                                        //         <li className="nav-item">
                                        //             <a className="nav-link mx-2 active" href="/recipe">
                                        //                 Recipe
                                        //             </a>
                                        //         </li>
                                        //     </>
                                    ) : null}



                                    {isLoggedIn && (
                                        <>
                                            <li className={cx("nav-item-show")} onClick={toggleNotification}>
                                                <div className={cx("notification")} >
                                                    <div style={{ fontSize: "21px", margin: " 6px 0 0 7px" }} className="bi bi-bell"></div>
                                                    <span className={cx("badge")}>
                                                        <p className={cx('count-number')}>  {listNotifications.length > 9 ? '9+' : listNotifications.length}</p>
                                                    </span>
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
                                                                                    src={profileInformation.avatar}
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

                                                    </div>
                                                </div>

                                            )}
                                            <li className={cx("nav-item-show")} onClick={toggleMessage}>
                                                <div className={cx("notification")}>
                                                    <div style={{ fontSize: "21px", margin: "6px 0 0 7px" }} className="bi bi-chat-dots"></div>
                                                    {listMessage.filter((mess) => !mess.seen).length > 0 && (
                                                        <span className={cx("badge")}>
                                                            <p className={cx('count-number')}>
                                                                {listMessage.filter((mess) => !mess.seen).length > 9 ? '9+' : listMessage.filter((mess) => !mess.seen).length}
                                                            </p>
                                                        </span>
                                                    )}
                                                </div>
                                            </li>

                                            {showMessage && (
                                                <div className={cx("notification-popup")}>
                                                    <div className={cx('header-info')}>Message</div>
                                                    <div className={cx("input-group-chat")}>
                                                        <input type="search" className={cx('search-chat')} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                                    </div>
                                                    {listMessage.length > 0 && listMessage.map((message) => (
                                                        <li className={`p-2 border-bottom ${message.receiver[0]._id == accountId && message.seen == false ? "bg-info" : ""}`} onClick={() => handleShowMessageModal(message)} >
                                                            <div onClick={closeMessage} >
                                                                <a href="#!" className="d-flex justify-content-between">
                                                                    <div className="d-flex flex-row" style={{ marginBottom: '-6px' }}>
                                                                        <div style={{ marginTop: "6px" }}>
                                                                            <img
                                                                                src={(message.receiver[0]._id == accountId) ? message.sender[0].avatar : message.receiver[0].avatar}
                                                                                alt="avatar" className="d-flex align-self-center me-3 rounded-circle" width="45" height='45' />
                                                                            <span className="badge bg-danger badge-dot"></span>
                                                                        </div>
                                                                        <div className="pt-1">
                                                                            <p className="fw-bold mb-0">{(message.receiver[0]._id == accountId) ? message.sender[0].name : message.receiver[0].name}</p>
                                                                            <p className="small">{sjcl.decrypt(message.sender[0]._id + "" + message.receiver[0]._id, message.content)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className={cx('time-chat', 'text-muted')}>{message.time.substring(0, 10)}</p>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </div>
                                            )}
                                            <li className={cx("nav-item-show")} onClick={toggleProfile}>
                                                <div className={cx("nav-link", "mx-2", "avatar-container")}>
                                                    <img className={cx('avatar-header')} src={profileInformation.avatar} alt="" />
                                                </div>
                                            </li>
                                            {showProfile && (
                                                <div className={cx("notification-popup-profile")} onClick={closeProfile}>
                                                    <Link to={getProfileLink(role)} className={cx("d-flex", "justify-content-between", "nav-item", "border-bottom", "info")}>
                                                        <div className="d-flex flex-row" style={{ marginBottom: '-6px' }}>
                                                            <div style={{ marginTop: "6px" }}>
                                                                <img
                                                                    src={profileInformation.avatar}
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
                                                            <p className=" mb-0" style={{ marginLeft: '10px' }} onClick={() => setShowChangePassWordModal(true)}  >Change Password</p>
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
                {/* BODY  */}
                <div className={cx('background-body')}>
                    {children}
                </div>
            </div >

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
                            <Link to={isLoggedIn ? getProfileLink(role) : '/login'}>
                                <div className={cx('logo-respon')}>
                                    {isLoggedIn ? (
                                        <>
                                            <img src={profileInformation.avatar} alt="Profile Avatar" /> &nbsp;
                                            <div className={cx('text_image')}>
                                                <span>{profileInformation.name}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <span>Login</span>
                                    )}
                                </div>
                            </Link>

                            {/* for iad  */}
                            <label htmlFor="navInput" className={cx('sidebarClose')}>
                            </label>
                            <hr className={cx('line')}></hr>
                            {/* ****** */}
                            {menuRole.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.path} className={cx('active')}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>

            {showMessageModal && <ChatModal setShowMessageModal={setShowMessageModal}
                chat={chat} receiver={otherUser} setListMessage={setListMessage} handleShowMessageModal={handleShowMessageModal} />}
            {showChangePassWordModal && < ChangePassWord setShowChangePassWordModal={setShowChangePassWordModal} />}
        </body >
    );
}

export default DefaultLayout;