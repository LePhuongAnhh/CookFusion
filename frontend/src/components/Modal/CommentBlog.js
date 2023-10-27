import React, { useState, useEffect } from "react"
import styles from './CommentBlog.module.scss'
import classNames from 'classnames/bind'
import BlogForm from "./BlogForm"
import images from '~/assets/images'
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants"

import { Link } from 'react-router-dom'
import DeleteBlog from "./DeleteBlog"

const cx = classNames.bind(styles)
const CommentBlog = ({ setShowCommentBlogModal }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const [showUpdateModal, setShowUpdateModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    // const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt

    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>John's Article</h1>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowCommentBlogModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={cx('post_status')}>
                    <BlogForm />
                    <div className={cx('posts_footer')}>
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