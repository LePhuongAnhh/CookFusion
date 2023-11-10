////import từ thư viện bên ngoài
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enUS } from 'date-fns/locale';
import { Link } from "react-router-dom";
//import trong thư viện
import images from '~/assets/images'
import {
    apiUrl,
    PROFILE_INFORMATION,
    ACCESS_TOKEN
}
    from "../../../constants/constants"
import styles from './Article.module.scss'
import classNames from 'classnames/bind'
import DeleteBlog from "../../../components/Modal/DeleteBlog"
import CommentBlog from "../../../components/Modal/CommentBlog"
import CreateBlog from "../../../components/Modal/CreateBlog"
import BlogForm from "../../../components/Modal/BlogForm"
import UpdateBlog from "~/components/Modal/UpdateBlog";

const cx = classNames.bind(styles)
const Article = (props) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const navigate = useNavigate()
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt

    //Lấy thời gian
    const formatTime = (date) => {
        return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
    };
    const createNewArticle = (data) => {
        console.log('check data in service', data)
    }
    const updateNewArticle = (data) => {
        console.log('get data update post', data)
    }
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
    return (
        <div className={cx('article_form')}>
            <div className={cx('article_container')}>
                {/* nav  - left */}
                <nav className={cx('article_navbar')}>
                    <div className={cx('navbar_collapse')}>
                        <div className={cx('navbar_vertical')}>
                            <ul className={cx('f_colum')}>
                                <li className={cx('nav_item')}>
                                    <Link to="#" className={cx('nav_home')}>
                                        <div className={cx('agile_item')}>
                                            <span className={cx('link_home_icon')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-heart-fill" viewBox="0 0 16 16">
                                                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z" />
                                                    <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z" />
                                                </svg>
                                            </span>
                                            <Link to="#" className={cx('link_home_text')}>Home</Link>
                                        </div>
                                    </Link>
                                </li>
                                <li className={cx('nav_item')}>
                                    <Link to="#" className={cx('nav_home')}>
                                        <div className={cx('agile_item')}>
                                            <span className={cx('link_home_icon')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </span>
                                            <span className={cx('link_home_text')}>For you</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={cx('nav_item')}>
                                    <div className={cx('nav_item_gird')}>
                                        <div className={cx('nav_user')}> User</div>
                                        <div className={cx('nav_line')}>
                                            <hr className={cx('hr_line')}></hr>
                                        </div>
                                    </div>
                                </li>


                                {/* //nguoi follow */}
                                <div className={cx('follower')}>
                                    <div className={cx('follow-box')}>
                                        <h2>Following </h2>
                                        {following.length > 0 && following.map((following) => (
                                            <div className={cx('show_info1')}>
                                                <Link to="#">
                                                    <div className={cx('avt_follow')}>
                                                        <img className={cx('circle_avt')} src={following.followingAvatar} />
                                                    </div>
                                                </Link>
                                                <div className={cx('show_name')}>
                                                    <h6>
                                                        <Link to="#">{following.following_id}</Link>
                                                    </h6>
                                                    <div className={cx('btn_follow1')}>
                                                        <span className={cx('follow')}>{following.followingName}</span>
                                                    </div>                                                                                    </div>
                                            </div>
                                        ))}


                                    </div>
                                </div>

                                {/* gọi ý follow  */}

                            </ul>
                        </div>
                    </div>
                </nav>
                {/* //nav left responsive  */}
                <nav className={cx("nav-mobile")}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-auto" style={{ position: 'fixed' }}>
                                <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
                                    <Link to="#" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                                        <i className="bi-bootstrap fs-1"></i>
                                    </Link>
                                    <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                                        <li className="nav-item">
                                            <Link to="/article" className="nav-link py-3 px-2 link-hover" title="" data-bs-toggle="tooltip" data-bs-placement="right" style={{ color: ' #292e32' }}  >
                                                <i className="bi-house fs-1"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/article" className="nav-link py-3 px-2 link-hover" title="" data-bs-toggle="tooltip" data-bs-placement="right" style={{ color: ' #292e32', }}>
                                                <i className="bi-speedometer2 fs-1"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" style={{ color: ' #292e32', }}>
                                                <i className="bi-table fs-1"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Follower" style={{ color: ' #292e32', }}>
                                                <i className="bi-heart fs-1"></i>
                                            </Link>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>


                {/* content  */}
                <div className={cx('article_content')}>
                    <div className={cx('article_gird')}>
                        {/* CENTER */}
                        <div className={cx('article_gird_center')}>
                            {/* ceate post  */}
                            <div className={cx('post_status')}>
                                <div className={cx('post_hearer')}>
                                    <div className={cx('header_item')}>
                                        <div className={cx('header_avatar')}>
                                            <img className={cx('circle_avt')} src={profileInformation.avatar} />
                                        </div>
                                        <div className={cx('post_create')}>
                                            <h5 className={cx('create_post')}>{profileInformation.name}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('post_body')} >
                                    <form onClick={() => setShowCreateBlogModal(true)}>
                                        <textarea rows="2" placeholder='What do you want to talk about?' className={cx('textarea_post')} >
                                        </textarea>
                                    </form>
                                </div>
                            </div>
                            {/* Bai dang  */}
                            <div className={cx('post-status')}>
                                <BlogForm />
                            </div>
                        </div>


                        {/* RIGHT */}
                        <div className={cx('gird_right')}>
                            <div className={cx('right_info')}>
                                <div className={cx('header_annous')} >
                                    <h5 className={cx('header_add_fl')}>Announs</h5>
                                </div>
                                <div className={cx('right_follow')}>
                                    <div className={cx('show_info')}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {showUpdateBlogModal && < UpdateBlog setShowUpdateBlogModal={setShowUpdateBlogModal} updateNewArticle={updateNewArticle} />}
            {showDeleteModal && <DeleteBlog setShowDeleteModal={setShowDeleteModal} />}
            {showCommentBlogModal && <CommentBlog setShowCommentBlogModal={setShowCommentBlogModal} />}

            {showCreateBlogModal && <CreateBlog createNewArticle={createNewArticle} setShowCreateBlogModal={setShowCreateBlogModal} />}
        </div>

    )
}

export default Article