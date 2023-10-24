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
    const navigate = useNavigate()
    const [currentIdeas, setCurrentIdeas] = useState([])
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt
    const [events, setEvents] = useState([])

    //Lấy thời gian
    const formatTime = (date) => {
        return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
    };
    //lấy thông tin bài viết
    const [post, setPost] = useState([]);
    useEffect(() => {
        axios.get(`${apiUrl}/article/getdata`)
            .then((response) => {
                if (response.data.success) {
                    setPost(response.data.post);
                    console.log('data bai bang ne:', response)
                    alert('lay dc khong')
                } else {
                    console.error('Lỗi khi lấy thông tin bài viết:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi gửi yêu cầu:', error);
            });
    }, []);
    
    const createNewArticle = (data) => {
        console.log('check data in service', data)
    }
    const updateNewArticle = (data) => {
        console.log('get data update post', data)
    }


    return (
        <>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16">
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
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

                                    <div className={cx('follower')}>
                                        <h2>Following </h2>
                                        <div className={cx('show_info1')}>
                                            <Link to="#">
                                                <div className={cx('avt_follow')}>
                                                    <img className={cx('circle_avt')} src={images.Avt} />
                                                </div>
                                            </Link>
                                            <div className={cx('show_name')}>
                                                <h6>
                                                    <Link to="#">Minn</Link>
                                                </h6>
                                                <div className={cx('btn_follow1')}>
                                                    <span className={cx('follow')}>minlu.thi</span>
                                                </div>                                                                                    </div>
                                        </div>
                                    </div>
                                </ul>
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
                                                <img className={cx('circle_avt')} src={images.Avt} />
                                            </div>
                                            <div className={cx('post_create')}>
                                                <h5 className={cx('create_post')}>Name Account</h5>
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
                                <div className={cx('post_status')}>
                                    <li>
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
                                                                        share post
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
                                                                        <Link to="#" onClick={() => setShowUpdateBlogModal(true)}>Update</Link>
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('posts_footer')}>
                                            <div className={cx('total_like')}>
                                                <Link to="#" className={cx('count_like')}>
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
                                                    <div className={cx('emotion_gird')} onClick={() => setShowCommentBlogModal(true)}>
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
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </div>


                            {/* RIGHT */}
                            <div className={cx('gird_right')}>
                                <div className={cx('right_info')}>
                                    <div className={cx('right_info_card')}>
                                        <div className={cx('show_info')}>
                                            <img src={images.Avt} />
                                            <div className={cx('show_name')}>
                                                <Link to="#" className={cx('name_account_cmt')}> Alice </Link>
                                                has followed you
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('right_info')}>
                                    <div className={cx('header_add_follow')} >
                                        <h5 className={cx('header_add_fl')}>Add to you feed</h5>
                                    </div>
                                    <div className={cx('right_follow')}>
                                        <div className={cx('show_info')}>
                                            <Link to="#">
                                                <div className={cx('avt_follow')}>
                                                    <img className={cx('circle_avt')} src={images.Avt} />
                                                </div>
                                            </Link>
                                            <div className={cx('show_name')}>
                                                <h6>
                                                    <Link to="#">Helen</Link>
                                                </h6>
                                                <button className={cx('btn_follow')}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                                    </svg>
                                                    <span className={cx('follow')}>Follow</span>
                                                </button>
                                                <div className={cx('border_line')}></div>
                                            </div>
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
        </>
    )
}

export default Article