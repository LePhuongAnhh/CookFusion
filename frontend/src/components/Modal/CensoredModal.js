import React, { useState, useEffect } from "react"
import styles from './BlogForm.module.scss'
import classNames from 'classnames/bind'
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants"
import { Link } from 'react-router-dom'
import images from '~/assets/images'

const cx = classNames.bind(styles)
const CensoredModal = ({ setShowCensoredModal }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>John's Article</h1>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowCensoredModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={cx('post_status')}>
                    <div className={cx('post_hearer')}>
                        <div className={cx('post_hearer_between')}>
                            <div className={cx('post_img_left')}>
                                <div className={cx('d_flex')}>
                                    <Link to="#" className={cx('d_flex')}>
                                        <div className={cx('header_avatar')}>
                                            <img
                                                className={cx('circle_avt1')}
                                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vojjyljLC2ZHahToRN1w6Ll-1H1CQVrTXg&usqp=CAU' alt="avatar"
                                            // src={article.userUpload[0].avatar}
                                            />
                                            {/* {
                                                        article.userUpload[0].avatar === null ? (<img src={article.userUpload[0].Avatar} className={cx('circle_avt1')} />) : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vojjyljLC2ZHahToRN1w6Ll-1H1CQVrTXg&usqp=CAU' alt="avatar" className={cx('circle_avt1')} />
                                                    } */}
                                        </div>
                                    </Link>
                                    <div className={cx('name_account')}>
                                        <p className={cx('name_user')}>
                                            <Link to="#" className={cx('post_name_account')}>Name&nbsp;</Link>
                                            <span className={cx('share_album')}>
                                                share post Title
                                            </span>
                                        </p>
                                        <p className={cx('date_time')}>
                                            timeUpload
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('posts_body')}>
                        <p>
                            day la cho d moi nguoi hincontn cua minh ln nh, chan ua
                            {/* {article.content}
                                            <p style={{ color: "blue" }}>{article.hashtags}</p> */}
                        </p>
                        <div>
                            <div className={cx('body_img')}>
                                <div className={cx('show_img_6')}>
                                    <div>
                                        {/* {article.files[0] && article.files[0].files.map((fileInfor, index) => {
                                                            return <img key={index} src={fileInfor.url} alt={`Image ${index}`} className={cx('img_img')} />
                                                        })
                                                        } */}
                                        <img
                                            src={images.Avt}
                                            alt='image' className={cx('img_img')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('posts_footer')}>
                    <div className={cx('total_like')}>
                        <Link to="#" className={cx('count_like')}>
                            {/* {article.states.length} */}
                            <span> loves  </span>
                        </Link>
                        <Link to="#" className={cx('count_like')}>
                            {/* {article.comment.length}  */}
                            <span>   comments </span>
                        </Link>
                    </div>
                </div>
                <div className={cx('action')}>
                    <div className={cx('action-accept')}>
                        Accept
                    </div>
                    <div className={cx('action-cancle')}>
                        Cancel
                    </div>
                </div>
            </div >
        </div >


    )
}

export default CensoredModal