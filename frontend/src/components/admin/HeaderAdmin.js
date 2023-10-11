import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import style from "./HeaderAdmin.module.css"
import Title_web from "../../image/name_page.png"

import phanh from "../../image/phanh.jpg"

function HeaderAdmin() {
    return (
        <body>
            <div id="wrapper">
                {/* Topbar Start */}
                <div className={style.navbar_custom}>
                    <ul className={style.list_unstyled}>
                        <li className={style.notification_list}>
                            <a className={style.nav_link} data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <i className="bi bi-bell"></i>
                                <span className={style.badge}>9</span>
                            </a>
                            <div className={style.dropdown_menu_right}>
                                {/* item */}
                                <div className={style.dropdown_item}>
                                    <h5 className="m-0">
                                        <span className={style.float_right}>
                                            <a href="" className={style.text_dark}>
                                                <small>Clear All</small>
                                            </a>
                                        </span>Notification
                                    </h5>
                                </div>
                                <div className={style.noti_scroll}>
                                    {/* item */}
                                    <a href="#" className={style.notify_item}>
                                        <div className={style.notify_icon}><i className="mdi mdi-comment-account-outline"></i></div>
                                        <p className={style.notify_details}>Caleb Flakelar commented on Admin<small className={style.text_muted}>1 min ago</small></p>
                                    </a>

                                    {/* item */}
                                    <a href="#" className={style.notify_item}>
                                        <div className={style.notify_icon}><i className="mdi mdi-account-plus"></i></div>
                                        <p className={style.notify_details}>New user registered.<small className={style.text_muted}>5 hours ago</small></p>
                                    </a>

                                    {/* item */}
                                    <a href="#" className={style.notify_item}>
                                        <div className={style.notify_icon}><i className="mdi mdi-heart"></i></div>
                                        <p className={style.notify_details}>Carlos Crouch liked <b>Admin</b><small className={style.text_muted}>3 days ago</small></p>
                                    </a>

                                    {/* item */}
                                    <a href="#" className={style.notify_item}>
                                        <div className={style.notify_icon}><i className="mdi mdi-comment-account-outline"></i></div>
                                        <p className={style.notify_details}>Caleb Flakelar commented on Admin<small className="text-muted">4 days ago</small></p>
                                    </a>

                                    {/* item */}
                                    <a href="#" className={style.notify_item}>
                                        <div className={style.notify_icon}><i className="mdi mdi-account-plus"></i></div>
                                        <p className={style.notify_details}>New user registered.<small className="text-muted">7 days ago</small></p>
                                    </a>

                                    {/* item */}
                                    <a href="#" className={style.notify_item}>
                                        <div className={style.notify_icon}><i className="mdi mdi-heart"></i></div>
                                        <p className={style.notify_details}>Carlos Crouch liked <b>Admin</b><small className={style.text_muted}>13 days ago</small></p>
                                    </a>
                                </div>

                                {/* item */}
                                <a href="#" className={style.view_all}>
                                    View all
                                    <i className="fi-arrow-right"></i>
                                </a>

                            </div>
                        </li>
                        <li className={style.notification_list_show}>
                            <a className={style.nav_link_dropdown_toggle} data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <img src={phanh} alt="user-image" className={style.rounded_circle} />
                                <span className={style.ml_1}>Samuel <i className="bi bi-chevron-compact-down"></i> </span>
                            </a>
                            <div className={style.dropdown_menu_right_profile}>
                            </div>
                        </li>
                        <li className={style.notification_list}>
                            <a href="#" className={style.nav_link}>
                                <i className="bi bi-gear"></i>
                            </a>
                        </li>


                    </ul >
                    {/* LOGO  */}
                    < div className={style.logo_box} >
                        <a href="#" className={style.logo_center}>
                            <span className={style.logo_lg}>
                                <img src={Title_web} alt="" height="16" />
                                {/* /              <!-- <span className="logo-lg-text-light">UBold</span> --> */}
                            </span>
                            {/* <span className={style.logo_sm}>
                                <img src={phanh} alt="" height="28" />
                                /   </span> */}
                        </a>
                    </ div>

                    <ul className={style.list_unstyled_search}>
                        <li>
                            <button className={style.button_menu_mobile}>
                                <i className="bi bi-list-ul"></i>
                            </button>
                        </li>

                        <li className={style.d_none}>
                            <form className={style.app_search}>
                                <div className={style.app_search_box}>
                                    <div className={style.input_group}>
                                        <input type="text" className={style.form_control} placeholder="Search..." />
                                        <div className={style.input_group_append}>
                                            <button className={style.btn} type="submit">
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </li>

                    </ul>
                </div >
                {/* end Topbar */}

                {/* Left Sidebar Start */}
                <div className={style.left_side_menu}>
                    <div className={style.slimscroll_menu}>
                        <div id="sidebar-menu" className={style.sidebar_menu}>
                            <ul className={style.metismenu}>
                                <li className={style.menu_title}>Navigation</li>
                                <li>
                                    <a href="#" className={style.active}>
                                        <i class="bi bi-gear"></i>
                                        {/* <span className={style.badge_danger}>3</span> */}
                                        <span> Dashboard </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="bi bi-gear"></i>
                                        <span> Account Setting </span>
                                        <span className={style.menu_arrow}></span>
                                    </a>
                                    {/* <ul className={style.nav_second_level} aria-expanded="false">
                                        <li><a href="icons-materialdesign.html">Material Design</a></li>
                                        <li><a href="icons-dripicons.html">Dripicons</a></li>
                                        <li><a href="icons-fontawesome.html">Font awesome</a></li>
                                        <li><a href="icons-feather.html">Feather Icons</a></li>
                                    </ul> */}
                                </li>
                                <li className={style.menu_title}>More</li>
                                <li>
                                    <a href="#">
                                        <i class="bi bi-gear"></i>
                                        <span> Maps </span>
                                        <span className={style.menu_arrow}></span>
                                    </a>
                                    {/* <ul className={style.nav_second_level} aria-expanded="false">
                                        <li><a href="maps-google.html">Google Maps</a></li>
                                        <li><a href="maps-vector.html">Vector Maps</a></li>
                                        <li><a href="maps-mapael.html">Mapael Maps</a></li>
                                    </ul> */}
                                </li>


                                <li>
                                    <a href="#">
                                        <i class="bi bi-gear"></i>
                                        <span> Calendar </span>
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className={style.clearfix}></div>
                </div>
            </div>
        </body >
    )
}
export default HeaderAdmin