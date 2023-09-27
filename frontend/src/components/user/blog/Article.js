////import từ thư viện bên ngoài
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
// import { io } from 'socket.io-client'

import style from './Article.module.css'
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
import BlogForm from "../modal/BlogForm"


const Article = () => {
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt
    return (
        <body>
            <div className={style.article_form}>
                <Navigation />
                <div className={style.article_container}>
                    {/* nav  - left */}
                    <nav className={style.article_navbar}>
                        <div className={style.navbar_collapse}>
                            <div className={style.navbar_vertical}>
                                <ul className={style.f_colum}>
                                    <li className={style.nav_item}>
                                        <Link to="#" className={style.nav_home}>
                                            <div className={style.agile_item}>
                                                <span className={style.link_home_icon}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16">
                                                        <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z" />
                                                        <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z" />
                                                    </svg>
                                                </span>
                                                <Link to="#" className={style.link_home_text}>For you</Link>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={style.nav_item}>
                                        <Link to="#" className={style.nav_home}>
                                            <div className={style.agile_item}>
                                                <span className={style.link_home_icon}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-heart-fill" viewBox="0 0 16 16">
                                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                                    </svg>
                                                </span>
                                                <span className={style.link_home_text}>Chat</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={style.nav_item}>
                                        <Link to="#" className={style.nav_home}>
                                            <div className={style.agile_item}>
                                                <span className={style.link_home_icon}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                    </svg>
                                                </span>
                                                <span className={style.link_home_text}>Following</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className={style.nav_item}>
                                        <div className={style.nav_item_gird}>
                                            <div className={style.nav_user}> User</div>
                                            <div className={style.nav_line}>
                                                <hr className={style.hr_line}></hr>
                                            </div>
                                        </div>
                                    </li>
                                    {/* <DarkMode /> */}
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* content  */}
                    <div className={style.article_content}>
                        <div className={style.article_gird}>
                            {/* CENTER */}
                            <div className={style.article_gird_center}>
                                {/* ceate post  */}
                                <div className={style.post_status}>
                                    <div className={style.post_hearer}>
                                        <div className={style.header_item}>
                                            <div className={style.header_avatar}>
                                                <img className={style.circle_avt} src={Avt} />
                                            </div>
                                            <div className={style.post_create}>
                                                <h5 className={style.create_post}>Create Post</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={style.post_body} >
                                        <form >
                                            <textarea rows="3" placeholder='What do you want to talk about?' className={style.textarea_post} onClick={() => setShowDeleteModal(true)} >
                                            </textarea>
                                            <div className={style.post_image} onClick={() => setShowCreateBlogModal(true)}>
                                                <div className={style.post_img_left} >
                                                    <button className={style.btn_img}  >
                                                        <img src={addfile} />
                                                        <span className={style.post_img}>Image</span>
                                                    </button>
                                                    <button className={style.btn_img}>
                                                        <img src={event} />
                                                        <span className={style.post_img}>Event</span>
                                                    </button>
                                                    <button className={style.btn_img}>
                                                        <img src={checkin} />
                                                        <span className={style.post_img}>Check in</span>
                                                    </button>
                                                </div>
                                                <div className={style.post_share}>
                                                    <div className={style.post_public}>
                                                        <button className={style.drop_public}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
                                                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <button className={style.btn_post_share}>Share</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* Bai dang  */}
                                <div className={style.post_status}>
                                    <BlogForm />
                                    <div className={style.posts_footer}>
                                        <div className={style.total_like}>
                                            <Link to="/homepage" className={style.count_like}>
                                                342
                                                likes
                                            </Link>
                                        </div>
                                        <div className={style.emotion}>
                                            <div className={style.emotion_item}>
                                                <div className={style.emotion_gird}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                    </svg>
                                                    <span className={style.like_icon}>Like</span>
                                                </div>
                                            </div>
                                            <div className={style.emotion_item}>
                                                <div className={style.emotion_gird} onClick={() => setShowCommentBlogModal(true)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-heart-fill" viewBox="0 0 16 16">
                                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                                    </svg>
                                                    <span className={style.like_icon}  >Comment</span>
                                                </div>
                                            </div>
                                            <div className={style.emotion_item}>
                                                <div className={style.emotion_gird}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                                                    </svg>
                                                    <span className={style.like_icon}>Share</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className={style.read_comment}>
                                                <Link to="#">
                                                    <div className={style.avatar_comment}>
                                                        <img className={style.circle_avt} src={Avt} />
                                                    </div>
                                                </Link>
                                                <div className={style.read_cmt}>
                                                    <p className={style.content_cmt}>
                                                        <Link className={style.name_account_cmt}>
                                                            John
                                                        </Link>
                                                        <span className={style.view_cmt}>
                                                            She starred as Jane Porter, Tanya Vanderpoel in for which nominated for a Teen Choice Award, and many other awards.
                                                        </span>
                                                    </p>
                                                    <div className={style.reply_comment}>
                                                        <Link to="#"> Like  </Link> •
                                                        <Link to="#"> Reply  </Link>• 3hs
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.read_comment}>
                                                <Link to="#">
                                                    <div className={style.avatar_comment}>
                                                        <img className={style.circle_avt} src={Avt} />
                                                    </div>
                                                </Link>
                                                <div className={style.read_cmt}>
                                                    <p className={style.content_cmt}>
                                                        <Link className={style.name_account_cmt}>
                                                            John
                                                        </Link>
                                                        <span className={style.view_cmt}>
                                                            Jessalyn Sarah Gilsig is a Canadian-American actress known for her roles in television series, e.g., as Lauren Davis in Boston Public, Gina Russo in Nip/Tuck, Terri Schuester in Glee, and as Siggy Haraldson on the History Channel series Vikings. 🏆
                                                        </span>
                                                    </p>
                                                    <div className={style.reply_comment}>
                                                        <Link to="#"> Like  </Link> •
                                                        <Link to="#"> Reply  </Link>• 3hs
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className={style.gird_right}>
                                <div className={style.right_info}>
                                    <div className={style.right_info_card}>
                                        <div className={style.show_info}>
                                            <img src={Avt} />
                                            <div className={style.show_name}>
                                                <Link to="#" className={style.name_account_cmt}> Alice </Link>
                                                has followed you
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.right_info}>
                                    <div className={style.header_add_follow} >
                                        <h5 className={style.header_add_fl}>Add to you feed</h5>
                                    </div>
                                    <div className={style.right_follow}>
                                        <div className={style.show_info}>
                                            <Link to="#">
                                                <div className={style.avt_follow}>
                                                    <img className={style.circle_avt} src={Avt} />
                                                </div>
                                            </Link>
                                            <div className={style.show_name}>
                                                <h6>
                                                    <Link to="#">Helen</Link>
                                                </h6>
                                                <button className={style.btn_follow}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg>
                                                    <span className={style.follow}>Follow</span>
                                                </button>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                        <div className={style.show_info}>
                                            <Link to="#">
                                                <div className={style.avt_follow}>
                                                    <img className={style.circle_avt} src={Avt} />
                                                </div>
                                            </Link>
                                            <div className={style.show_name}>
                                                <h6>
                                                    <Link to="#">Helen</Link>
                                                </h6>
                                                <button className={style.btn_follow}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg>
                                                    <span className={style.follow}>Follow</span>
                                                </button>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                        <div className={style.show_info}>
                                            <Link to="#">
                                                <div className={style.avt_follow}>
                                                    <img className={style.circle_avt} src={Avt} />
                                                </div>
                                            </Link>
                                            <div className={style.show_name}>
                                                <h6>
                                                    <Link to="#">Helen</Link>
                                                </h6>
                                                <button className={style.btn_follow}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg>
                                                    <span className={style.follow}>Follow</span>
                                                </button>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                        <div className={style.show_info}>
                                            <Link to="#">
                                                <div className={style.avt_follow}>
                                                    <img className={style.circle_avt} src={Avt} />
                                                </div>
                                            </Link>
                                            <div className={style.show_name}>
                                                <h6>
                                                    <Link to="#">Helen</Link>
                                                </h6>
                                                <button className={style.btn_follow}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg>
                                                    <span className={style.follow}>Follow</span>
                                                </button>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                        <div className={style.show_info}>
                                            <Link to="#">
                                                <div className={style.avt_follow}>
                                                    <img className={style.circle_avt} src={Avt} />
                                                </div>
                                            </Link>
                                            <div className={style.show_name}>
                                                <h6>
                                                    <Link to="#">Helen</Link>
                                                </h6>
                                                <button className={style.btn_follow}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg>
                                                    <span className={style.follow}>Follow</span>
                                                </button>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                        <div className={style.show_info}>
                                            <Link to="#">
                                                <div className={style.avt_follow}>
                                                    <img className={style.circle_avt} src={Avt} />
                                                </div>
                                            </Link>
                                            <div className={style.show_name}>
                                                <h6>
                                                    <Link to="#">Helen</Link>
                                                </h6>
                                                <button className={style.btn_follow}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg>
                                                    <span className={style.follow}>Follow</span>
                                                </button>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.right_bottom}>
                                    <div className={style.top_advertisement}>
                                        <h5 className={style.header_add_fl}>You may interested</h5>
                                    </div>
                                    <div className={style.center_adver}>
                                        <div className={style.show_info}>
                                            <div className={style.package_adver}>
                                                <span className={style.package}>Pac</span>
                                                <span className={style.type_adver}>1</span>
                                            </div>
                                            <div className={style.info_adver}>
                                                <h6 className={style.name_adver}>
                                                    <Link to="#">
                                                        <span className={style.name_package}>Monthly packages</span>
                                                    </Link>
                                                </h6>
                                                <p className={style.follow}>Quang cao gia han 1 thang</p>
                                                <p className={style.info_adver2}>600 view /month</p>
                                                <p className={style.info_adver2}>600 view /month</p>
                                                <p className={style.info_adver3}>Tăng 5.000 likes </p>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                        {/* //type2  */}
                                        <div className={style.show_info}>
                                            <div className={style.package_adver}>
                                                <span className={style.package}>Pac</span>
                                                <span className={style.type_adver}>2</span>
                                            </div>
                                            <div className={style.info_adver}>
                                                <h6 className={style.name_adver}>
                                                    <Link to="#">
                                                        <span className={style.name_package}>Monthly packages</span>
                                                    </Link>
                                                </h6>
                                                <p className={style.follow}>Quang cao 1 thang</p>
                                                <p className={style.info_adver2}>1500 view /month</p>
                                                <p className={style.info_adver2}>600 view /month</p>
                                                <p className={style.info_adver3}>Tăng 5.000 likes </p>
                                                <div className={style.border_line}></div>
                                            </div>
                                        </div>
                                        {/* type  */}
                                        <div className={style.show_info}>
                                            <div className={style.package_adver}>
                                                <span className={style.package}>Pac</span>
                                                <span className={style.type_adver}>3</span>
                                            </div>
                                            <div className={style.info_adver}>
                                                <h6 className={style.name_adver}>
                                                    <Link to="#">
                                                        <span className={style.name_package}>Monthly packages</span>
                                                    </Link>
                                                </h6>
                                                <p className={style.follow}>Quang cao 1 thang</p>
                                                <p className={style.info_adver2}>600 view /month</p>
                                                <p className={style.info_adver2}>600 view /month</p>
                                                <p className={style.info_adver3}>Tăng 5.000 likes </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.right_footer}>
                                        <Link to="#" className={style.all_adver}>All Advertisement</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && <DeleteBlog setShowDeleteModal={setShowDeleteModal} />}
            {showCommentBlogModal && <CommentBlog setShowCommentBlogModal={setShowCommentBlogModal} />}
            {showCreateBlogModal && <CreateBlog setShowCreateBlogModal={setShowCreateBlogModal} />}

        </body>
    )
}

export default Article