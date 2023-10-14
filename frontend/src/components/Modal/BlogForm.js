////import từ thư viện bên ngoài
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
// import { io } from 'socket.io-client'
import images from '~/assets/images'
import styles from './BlogForm.module.scss'
import classNames from 'classnames/bind'
import Navigation from '../Layout/DefaultLayout/Header/Navigation'
// import DarkMode from "../modal/DarkMode"
// import Avt from "../../../image/avt.jpg"
import { Link } from 'react-router-dom'
// import img from "../../../image/anh123.jpg"
// import checkin from "../../../image/check-in.png"
// import event from "../../../image/calendar-date.png"
import DeleteBlog from "./DeleteBlog"
import CommentBlog from "./CommentBlog"
import CreateBlog from "./CreateBlog"
// import a1 from "../../../image/a1.jpg"
// import a2 from "../../../image/a2.jpg"
// import a3 from "../../../image/a3.jpg"
// import a4 from "../../../image/a4.jpg"
const cx = classNames.bind(styles)
const BlogForm = () => {
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    // const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt

    return (
        <>
            <div className={cx('post_status')}>
                <div className={cx('post_hearer')}>
                    <div className={cx('post_hearer_between')}>
                        <div className={cx('post_img_left')}>
                            <div className={cx('d_flex')}>
                                <Link to="#" className={cx('d_flex')}>
                                    <div className={cx('header_avatar')}>
                                        <img className={cx('circle_avt1')} src={images.Avt} />
                                    </div>
                                </Link>
                                <div className={cx('name_account')}>
                                    <p className={cx('name_user')}>
                                        <Link to="#" className={cx('post_name_account')}>John &nbsp;</Link>
                                        <span className={cx('share_album')}>
                                            share an
                                            <Link to="#"> album</Link>
                                        </span>
                                    </p>
                                    <p className={cx('date_time')}>
                                        11 hrs
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('post_share')}>
                            <div className={cx('post_setting')}>
                                <button className={cx('btn_setting')}>
                                    <div className={cx('dropdown')}>
                                        <button className={cx('dropdown_toggle')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                            </svg>
                                        </button>
                                        <div className={cx('dropdown_content')}>
                                            <Link to="#" onClick={() => setShowUpdateModal(true)}>Update</Link>
                                            <Link to="#" onClick={() => setShowDeleteModal(true)}>Delete</Link>
                                            <Link to="#">Accuse</Link>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('posts_body')}>
                    <p>
                        Rowan Sebastian Atkinson CBE is an English actor, comedian and screenwriter best known for his work on the sitcoms Blackadder and Mr. Bean
                    </p>
                    <div>
                        <div className={cx('body_img')}>
                            <div className={cx('show_img_6')}>
                                <img className={cx('img_img')} src={images.a3} />
                            </div>
                            <div className={cx('show_img_6')}>
                                <img className={cx('img_img')} src={images.a4} />
                            </div>
                            <div className={cx('show_img_4')}>
                                <img className={cx('img_img')} src={images.img} />
                            </div>
                            <div className={cx('show_img_4')}>
                                <img className={cx('img_img')} src={images.a1} />
                            </div>
                            <div className={cx('show_img_4')}>
                                <img className={cx('img_img')} src={images.a2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && <DeleteBlog setShowDeleteModal={setShowDeleteModal} />}
            {/* {showCommentBlogModal && <CommentBlog setShowCommentBlogModal={setShowCommentBlogModal} />} */}

        </>
    )
}

export default BlogForm
