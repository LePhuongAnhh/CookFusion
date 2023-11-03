import styles from './ShowInfo.module.scss'
import images from '~/assets/images'
import classNames from 'classnames/bind'
import axios from 'axios'
import {
    apiUrl,
    ACCESS_TOKEN,
} from "../../../../constants/constants.js"
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles)
function ShowInfor() {
    //show thông báo
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [isNotificationVisible, setNotificationVisibility] = useState(false);
    const handleNotificationClick = () => {
        setNotificationVisibility(!isNotificationVisible);
    };
    const [notification, setNotification] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/notification`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(response.data)
                if (response.data.success) {
                    setNotification(response.data.notifications)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <>
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
                                {notification.length > 0 && notification.map((notification)=>(
                                     <Link to="" className={cx("dropdown-item", "notify-item")}>
                                     <div className={cx("notify-icon")} >
                                         <img src={images.Avt} />
                                     </div>
                                     <p className={cx("notify-details")}>{notification.message}
                                         <small className={cx("text-muted")}>{notification.date}</small>
                                     </p>
                                 </Link>
                                ))}
                               
                                {/* <Link to="" className={cx("dropdown-item", "notify-item")}>
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
                                </Link> */}
                            </div >
                        </div >
                    </div >
                )
                }
            </li>
        </>
    );
}

export default ShowInfor;