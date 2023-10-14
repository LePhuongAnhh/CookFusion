import React, { useState, useEffect } from "react"
import styles from './CommentBlog.module.scss'
import classNames from 'classnames/bind'
import BlogForm from "./BlogForm"
import images from '~/assets/images'

// import Avt from "../../../image/avt.jpg"
import { Link } from 'react-router-dom'
// import article2 from "../../../image/article2.webp"
// import addfile from "../../../image/image.png"
// import img from "../../../image/anh123.jpg"
// import checkin from "../../../image/check-in.png"
// import event from "../../../image/calendar-date.png"
import DeleteBlog from "./DeleteBlog"

const cx = classNames.bind(styles)
const CommentBlog = ({ setShowCommentBlogModal }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    // const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt

    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>John's Article</h1>
                        <div className={cx('exit_cmt_modal} onClick={() => setShowCommentBlogModal(false)')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={cx('post_status')}>
                    <BlogForm />
                    <div className={cx('posts_footer')}>
                        <div className={cx('total_like')}>
                            <Link to="/homepage" className={cx('count_like')}>
                                342
                                likes
                            </Link>
                        </div>
                        <div className={cx('emotion')}>
                            <div className={cx('emotion_item')}>
                                <div className={cx('emotion_gird')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg>
                                    <span className={cx('like_icon')}>Like</span>
                                </div>
                            </div>
                            <div className={cx('emotion_item')}>
                                <div className={cx('emotion_gird} onClick={() => setShowCommentBlogModal(true)')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-heart-fill" viewBox="0 0 16 16">
                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                    </svg>
                                    <span className={cx('like_icon')}  >Comment</span>
                                </div>
                            </div>
                            <div className={cx('emotion_item')}>
                                <div className={cx('emotion_gird')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                                    </svg>
                                    <span className={cx('like_icon')}>Share</span>
                                </div>
                            </div>
                        </div>
                        <form>
                            <div className={cx('write_comment')}>
                                <div className={cx('cmt_avt')}>
                                    <div className={cx('avatar_comment')}>
                                        <img className={cx('circle_avt')} src={images.Avt} />
                                    </div>
                                </div>
                                <input placeholder="Write a comment ..." type='text' className={cx('input_cmt')}></input>
                            </div>
                        </form>

                        <div>
                            <div className={cx('read_comment')}>
                                <Link to="#">
                                    <div className={cx('avatar_comment')}>
                                        <img className={cx('circle_avt')} src={images.Avt} />
                                    </div>
                                </Link>
                                <div className={cx('read_cmt')}>
                                    <p className={cx('content_cmt')}>
                                        <Link className={cx('name_account_cmt')}>
                                            John
                                        </Link>
                                        <span className={cx('view_cmt')}>
                                            She starred as Jane Porter, Tanya Vanderpoel in for which nominated for a Teen Choice Award, and many other awards.
                                        </span>
                                    </p>
                                    <div className={cx('reply_comment')}>
                                        <Link to="#"> Like  </Link> •
                                        <Link to="#"> Reply  </Link>• 3hs
                                    </div>
                                </div>
                            </div>
                            <div className={cx('read_comment')}>
                                <Link to="#">
                                    <div className={cx('avatar_comment')}>
                                        <img className={cx('circle_avt')} src={images.Avt} />
                                    </div>
                                </Link>
                                <div className={cx('read_cmt')}>
                                    <p className={cx('content_cmt')}>
                                        <Link className={cx('name_account_cmt')}>
                                            John
                                        </Link>
                                        <span className={cx('view_cmt')}>
                                            Jessalyn Sarah Gilsig is a Canadian-American actress known for her roles in television series, e.g., as Lauren Davis in Boston Public, Gina Russo in Nip/Tuck, Terri Schuester in Glee, and as Siggy Haraldson on the History Channel series Vikings. 🏆
                                        </span>
                                    </p>
                                    <div className={cx('reply_comment')}>
                                        <Link to="#"> Like  </Link> •
                                        <Link to="#"> Reply  </Link>• 3hs
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div>
                    <div className={cx('createIdeaFooter')}>
                        <form>
                            <div className={cx('write_comment')}>
                                <div className={cx('cmt_avt')}>
                                    <div className={cx('avatar_comment')}>
                                        <img className={cx('circle_avt} src={Avt} />
                                    </div>
                                </div>
                                <input placeholder="Write a comment ..." type='text' className={cx('input_cmt')}></input>
                            </div>
                        </form>
                    </div>
                </div> */}
            </div>

            {showDeleteModal && <DeleteBlog setShowDeleteModal={setShowDeleteModal} />}
            {/* {showCommentBlogModal && <CommentBlog setShowCommentBlogModal={setShowCommentBlogModal} />} */}
        </div>

    )
}

export default CommentBlog