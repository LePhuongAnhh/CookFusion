import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "./HeaderAdmin.module.scss"
import classNames from 'classnames/bind'
import styled from 'styled-components';
import images from '~/assets/images'

const cx = classNames.bind(styles)
function HeaderAdmin() {
    //show thông báo
    // Tạo đối tượng chứa CSS
    const [isNotificationVisible, setNotificationVisibility] = useState(false);
    //hàm sử lí sự kiện 
    const handleNotificationClick = () => {
        setNotificationVisibility(!isNotificationVisible);
    };

    // dropdown dashboard
    const [isDropdownOpenDashBoard, setIsDropdownOpenDashBoard] = useState(false);
    const toggleDropdownDashBoard = () => {
        setIsDropdownOpenDashBoard(!isDropdownOpenDashBoard);
    };

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
    return (
        <>
            <div className={cx('navbar_custom')}>
                <ul className={cx('list_unstyled')}>
                    <li className={cx('notification_list')}>
                        <Link to="#" className={cx('nav_link')}>
                            <i className="bi bi-brightness-high-fill"></i>
                        </Link>
                    </li>
                    <li className={cx('notification_list')}>
                        {/* thông báo  */}
                        <Link className={cx('notification-icon')} onClick={handleNotificationClick}>
                            <i className="bi bi-bell"></i>
                            <span className={cx('badge')}>9</span>
                        </Link>
                        {/* show thông báo  */}
                        {isNotificationVisible && (
                            <div className={cx('notificationPopup')}>
                                {/* title  */}
                                <div className={cx("dropdown-item", "noti-title")}>
                                    <h5 className={cx("m-0")}>
                                        <span className={cx("float-right")}>
                                            <Link to="" className={cx("text-dark")}>
                                                <small>Clear All</small>
                                            </Link>
                                        </span>Notification
                                    </h5>
                                </div>
                                <div className={cx("show-info")}>
                                    <div className={cx("slimscroll", "noti-scroll")}>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")} >
                                                <img src={images.Avt} />
                                            </div>
                                            <p className={cx("notify-details")}>Caleb Flakelar commented on Admin
                                                <small className={cx("text-muted")}>1 min ago</small>
                                            </p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            <p className={cx("notify-details")}>New user registered.<small className={cx("text-muted")}>5 hours ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            <p className={cx("notify-details")}>Carlos Crouch liked <b>Admin</b><small className={cx("text-muted")}>3 days ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            < p className={cx("notify-details")} > Caleb Flakelar commented on Admin <small small className={cx("text-muted")} > 4 days ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            <p className={cx("notify-details")}>New user registered.<small className={cx("text-muted")}>5 hours ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            <p className={cx("notify-details")}>Carlos Crouch liked <b>Admin</b><small className={"text-muted"}>3 days ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            < p className={cx("notify-details")} > Caleb Flakelar commented on Admin <small small className="text-muted" > 4 days ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            <p className={cx("notify-details")}>New user registered.<small className="text-muted">5 hours ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            <p className={cx("notify-details")}>Carlos Crouch liked <b>Admin</b><small className="text-muted">3 days ago</small></p>
                                        </Link>
                                        <Link to="" className={cx("dropdown-item", "notify-item")}>
                                            <div className={cx("notify-icon")}>
                                                <img src={images.Avt} />
                                            </div>
                                            < p className={cx("notify-details")} > Caleb Flakelar commented on Admin <small small className="text-muted" > 4 days ago</small></p>
                                        </Link>

                                    </div >
                                </div >
                            </div >
                        )
                        }
                    </li >

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
                            <img src={images.logoAdmin} alt="" height="16" />
                        </span>
                    </Link>
                </ div >
                {/* search */}
                <ul className={cx('list_unstyled_search')}>
                    <li className={cx('d_none')}>
                        <form className={cx('app_search')}>
                            <div className={cx('app_search_box')}>
                                <div className={cx('input_group')}>
                                    <input type="text" className={cx('form_control')} placeholder="Search..." />
                                    <div className={cx('input_group_append')}>
                                        <button className={cx('btn')} type="submit">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </li>

                </ul>
            </div >

            {/* Left Sidebar Start */}
            <div className={cx('left_side_menu')}>
                <div className={cx('slimscroll_menu')}>
                    <div id="sidebar-menu" className={cx('sidebar_menu')}>
                        <ul className={cx('metismenu')}>
                            <li className={cx('menu_title')}>Navigation</li>
                            <li >
                                <Link to="#" className={cx('active')} onClick={toggleDropdownDashBoard}>
                                    <i class="bi bi-terminal-dash"></i>
                                    <span>Dashboard</span>
                                    <div className={cx("icon-dropdown")}>
                                        <i className={`${isDropdownOpenDashBoard ? 'bi bi-chevron-down' : 'bi bi-chevron-right'}`}></i>
                                    </div>
                                </Link>
                                {isDropdownOpenDashBoard && (
                                    <ul className={cx("dropdown-content")}>
                                        <li>
                                            <Link to="#">Recipe</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Post</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Planner</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Sponsor</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link to="/profileAdmin">
                                    <i className="bi bi-gear"></i>
                                    <span>Account Setting </span>
                                    <span className={cx('menu_arrow')}></span>
                                </Link>
                            </li>
                            <li className={cx('menu_title')}>More</li>
                            <li >
                                <Link to="#" className={cx('active')} onClick={toggleDropdownAccount}>
                                    <i class="bi bi-people"></i>
                                    <span>Account</span>
                                    <div className={cx("icon-dropdown")}>
                                        <i className={`${isDropdownOpenAccount ? 'bi bi-chevron-down' : 'bi bi-chevron-right'}`}></i>
                                    </div>
                                </Link>
                                {isDropdownOpenAccount && (
                                    <ul className={cx("dropdown-content")}>
                                        <li>
                                            <Link to="#">User</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Sponsor</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li >
                                <Link to="#" className={cx('active')} onClick={toggleDropdownPost}>
                                    <i class="bi bi-people"></i>
                                    <span>Post</span>
                                    <div className={cx("icon-dropdown")}>
                                        <i className={`${isDropdownOpenPost ? 'bi bi-chevron-down' : 'bi bi-chevron-right'}`}></i>
                                    </div>
                                </Link>
                                {isDropdownOpenPost && (
                                    <ul className={cx("dropdown-content")}>
                                        <li>
                                            <Link to="#">Article</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Recipe</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link to="/categorymanagement">
                                    <i class="bi bi-gear"></i>
                                    <span>Category </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i class="bi bi-gear"></i>
                                    <span>Plan Meal </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('clearfix')}></div>
            </div>
        </>
    )
}
export default HeaderAdmin