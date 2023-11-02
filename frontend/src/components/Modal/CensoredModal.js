import React, { useState, useEffect } from "react"
import styles from './CommentBlog.module.scss'
import classNames from 'classnames/bind'
import BlogForm from "./BlogForm"
import images from '~/assets/images'
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants"
import { Link } from 'react-router-dom'
import DeleteBlog from "./DeleteBlog"

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
                    <li >
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
                                    CONTENT
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
                                                <img alt='image' className={cx('img_img')} />
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
                            <div className={cx('emotion')}>
                                <div className={cx('emotion_item')}>
                                    {/* {article.states && (
                                                (article.states.find(state => state.Account_id === authorIdToDisplay)) ? (
                                                    article.states.map((state) => (
                                                        state.Account_id == authorIdToDisplay && (
                                                            <div className={cx('emotion_gird')} onClick={() => handleUnState(state)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                                </svg>
                                                                <span className={cx('like_icon')}>Love</span>
                                                            </div>
                                                        )
                                                    ))
                                                ) : <div className={cx('emotion_gird')} onClick={() => handleAddState(article._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                    </svg>
                                                    <span className={cx('like_icon')}>Love</span>
                                                </div>
                                            )} */}
                                    <div className={cx('emotion_gird')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                        <span className={cx('like_icon')}>Love</span>
                                    </div>

                                </div>
                                <div className={cx('emotion_item')}>
                                    <div className={cx('emotion_gird')}>
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
                        </div>
                    </li>
                </div>

                <div style={{ cursor: "pointer" }}>
                    <div>
                        Accept
                    </div>
                    <div>
                        Cancel
                    </div>
                </div>



            </div >
        </div >


    )
}

export default CensoredModal