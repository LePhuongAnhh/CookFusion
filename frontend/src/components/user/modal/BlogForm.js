////import từ thư viện bên ngoài
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
// import { io } from 'socket.io-client'

import style from './BlogForm.module.css'
import Navigation from '../header/Navigation'
// import DarkMode from "../modal/DarkMode"
import Avt from "../../../image/avt.jpg"
import { Link } from 'react-router-dom'
import article2 from "../../../image/article2.webp"
import addfile from "../../../image/image.png"
import img from "../../../image/anh123.jpg"
import checkin from "../../../image/check-in.png"
import event from "../../../image/calendar-date.png"
import DeleteBlog from "../modal/DeleteBlog"
import CommentBlog from "../modal/CommentBlog"
import CreateBlog from "../modal/CreateBlog"

const BlogForm = () => {
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    // const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt

    return (
        <>
            <div className={style.post_status}>
                <div className={style.post_hearer}>
                    <div className={style.post_hearer_between}>
                        <div className={style.post_img_left}>
                            <div className={style.d_flex}>
                                <Link to="#" className={style.d_flex}>
                                    <div className={style.header_avatar}>
                                        <img className={style.circle_avt1} src={Avt} />
                                    </div>
                                </Link>
                                <div className={style.name_account}>
                                    <p className={style.name_user}>
                                        <Link to="#" className={style.post_name_account}>John &nbsp;</Link>
                                        <span className={style.share_album}>
                                            share an
                                            <Link to="#"> album</Link>
                                        </span>
                                    </p>
                                    <p className={style.date_time}>
                                        11 hrs
                                        •
                                        Hanoi, VietNam
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={style.post_share}>
                            <div className={style.post_setting}>
                                <button className={style.btn_setting}>
                                    <div className={style.dropdown}>
                                        <button className={style.dropdown_toggle}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                            </svg>
                                        </button>
                                        <div className={style.dropdown_content}>
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
                <div className={style.posts_body}>
                    <p>
                        Rowan Sebastian Atkinson CBE is an English actor, comedian and screenwriter best known for his work on the sitcoms Blackadder and Mr. Bean
                    </p>
                    <div>
                        <div className={style.body_img}>
                            <div className={style.show_img_6}>
                                <img className={style.img_img} src={article2} />
                            </div>
                            <div className={style.show_img_6}>
                                <img className={style.img_img} src={article2} />
                            </div>
                            <div className={style.show_img_4}>
                                <img className={style.img_img} src={img} />
                            </div>
                            <div className={style.show_img_4}>
                                <img className={style.img_img} src={img} />
                            </div>
                            <div className={style.show_img_4}>
                                <img className={style.img_img} src={img} />
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
