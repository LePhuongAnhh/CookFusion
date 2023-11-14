////import từ thư viện bên ngoài
import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import {
    apiUrl,
    ACCESS_TOKEN,
    PROFILE_INFORMATION
} from "~/constants/constants"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enUS } from 'date-fns/locale';
// import { io } from 'socket.io-client'
import images from '~/assets/images'
import styles from './BlogForm.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import DeleteBlog from "./DeleteBlog"
import CommentBlog from "./CommentBlog"
import UpdateBlog from "./UpdateBlog";
import { io } from 'socket.io-client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { set } from "date-fns";
import Loading from "../Layout/Loading";

const socket = io('http://localhost:9996/', { transports: ['websocket'] })

const cx = classNames.bind(styles)
const BlogForm = ({ }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const userId = profileInformation._id
    const authorIdToDisplay = profileInformation._id
    const location = useLocation();

    // Sử dụng hàm này khi người dùng click vào icon comment
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false)
    //setting comment
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    const formatTime = (date) => {
        return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
    };

    //DELETE IDEA
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [articleIdToDelete, setArticleIdToDelete] = useState(null);
    const handleDeleteIconClick = (articleId) => {
        setArticleIdToDelete(articleId);
        setShowDeleteModal(true);
    };
    const [changeArticle, setChangeArticle] = useState(null)


    const handleAddState = (_id) => {
        const state = { Article_id: _id, state: 'heart', Account_id: authorIdToDisplay }
        setChangeArticle(_id)
        socket.emit('setheart', state)
    }
    const handleUnState = (state) => {
        setChangeArticle(state.Article_id)
        socket.emit('setheart', state)
    }
    const handleReport = async (_id) => {
        try {
            await axios.get(`${apiUrl}/report/article/${_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearchHashtag = async (hashtag) => {
        await fetchData(hashtag)
    }

    const fetchData = async (hashtag) => {
        try {
            if (hashtag) {
                const uri = `${apiUrl}/article/getlistwithhashtag/${encodeURIComponent(hashtag)}`
                var response = await axios.get(uri, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            } else {
                var response = await axios.get(`${apiUrl}/article/getlistforglobal`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            }
            setChangeArticle(null);

            if (response) {
                const articlesData = response.data.data.map(article => {

                    const timeUpload = formatTime(new Date(article.timeUpload)); // Định dạng thời gian tải lên của bài viết thông qua hàm formatTime
                    const content = article.content;
                    const regex = /#[^\s#]+/g;
                    const hashtags = article.hashtag.match(regex) || [];
                    if (hashtags.length > 0) console.log(hashtags)
                    const articleId = article._id;
                    const comments = article.comments || [];
                    return { ...article, timeUpload, hashtags, articleId, comments }; // Sao chép vào một đối tượng mới và thêm thuộc tính articleId
                });
                // Lọc bài viết dựa trên trang hiện tại
                const isProfilePage = location.pathname === '/profile';
                const filtered = isProfilePage
                    ? articlesData.filter(article => article.userUpload._id === profileInformation._id)
                    : articlesData;
                // Sắp xếp bài viết theo thứ tự ngược lại
                const sortedArticles = filtered.slice().sort((a, b) => new Date(b.timeUpload) - new Date(a.timeUpload));
                const reversedArticles = sortedArticles.reverse();
                setFilteredArticles(reversedArticles);

            }
            console.log('Dữ liệu bài đăng: ', response.data.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const [filteredArticles, setFilteredArticles] = useState([]); // Thêm state để lưu bài viết đã lọc
    useEffect(() => {

        fetchData();
        socket.on('error', (message) => {
            return
        })
        socket.on('addheart', (state) => {
            setChangeArticle(true)
        })
        socket.on('deleteheart', (state) => {
            setChangeArticle(true)
        })
        return () => {
            socket.off('error')
            socket.off('addheart')
            socket.off('deleteheart')
        }
    }, [changeArticle]);


    //detail
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleCommentClick = (article) => {
        setSelectedArticle(article);
        setShowCommentBlogModal(true);
    };

    //ADD COMMENT
    const [articleIdForComment, setArticleIdForComment] = useState(null);
    const [commentData, setCommentData] = useState({
        comment: '',
        userId: userId,
        Article_id: null,
    });

    const handleChangeComment = (e) => {
        const { name, value } = e.target;
        if (name === 'comment') {
            setArticleIdForComment(e.target.form.elements['_id'].value);
            setCommentData({ ...commentData, [name]: value, Article_id: e.target.form.elements['_id'].value });
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('comment', commentData.comment);
            formData.append('Article_id', articleIdForComment);
            formData.append('userId', userId);

            const response = await axios.post(`${apiUrl}/comment/addComment`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.data.success) {
                const newComment = {
                    _id: response.data.data._id,
                    comment: response.data.data.comment,
                    userId: response.data.data.userId,
                    Article_id: response.data.data.Article_id,
                };
                // Tìm bài viết trong danh sách và thêm comment mới vào nó
                setFilteredArticles(prevArticles => {
                    return prevArticles.map(article => {
                        if (article._id === articleIdForComment) {
                            // Thêm mới comment vào danh sách comments của bài viết
                            const updatedComments = [newComment, ...article.comments];
                            // Trả về bài viết đã cập nhật
                            return {
                                ...article,
                                comments: updatedComments,
                            };
                        }
                        return article;
                    });
                });

                // Reset dữ liệu comment form
                setCommentData({
                    comment: '',
                    userId: userId,
                    Article_id: null,
                });
            }

        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    if (filteredArticles.length === 0) {
        return <p className={cx('loading')}> <Loading /></p>;
    }

    return (
        <>
            <div className={cx('post_status')}>
                {filteredArticles.map((article) => (
                    <li key={article._id}>
                        <div className={cx('post_status')}>
                            <div className={cx('post_hearer')}>
                                <div className={cx('post_hearer_between')}>
                                    <div className={cx('post_img_left')}>
                                        <div className={cx('d_flex')}>
                                            <Link to="#" className={cx('d_flex')}>
                                                <div className={cx('header_avatar')}>
                                                    <img
                                                        className={cx('circle_avt1')}
                                                        src={article.userUpload[0].avatar}
                                                    />
                                                </div>
                                            </Link>
                                            <div className={cx('name_account')}>
                                                <p className={cx('name_user')}>
                                                    <Link to="#" className={cx('post_name_account')}>{article.userUpload[0].name}&nbsp;</Link>
                                                    <span className={cx('share_album')}>
                                                        share post {article.title}
                                                    </span>
                                                </p>
                                                <p className={cx('date_time')}>
                                                    {article.timeUpload}
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
                                                    {(article.userUpload[0]._id === profileInformation._id) ? (
                                                        <div className={cx('dropdown_content')}>
                                                            <Link to="#" onClick={() => setShowUpdateBlogModal(true)}>Update</Link>
                                                            <Link to="#" onClick={() => handleDeleteIconClick(article._id)}>Delete</Link>
                                                        </div>
                                                    ) : <div className={cx('dropdown_content')}>
                                                        <Link to="#" onClick={() => handleReport(article._id)}>Report</Link>
                                                    </div>
                                                    }
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('posts_body')}>
                                <p>
                                    {article.content}
                                    <div>
                                        {
                                            article.hashtags.length > 0 && article.hashtags.map((hashtag) => (
                                                <a style={{ color: "blue" }} onClick={() => handleSearchHashtag(hashtag)}>{hashtag}</a>
                                            ))

                                        }
                                    </div>
                                </p>

                                <div className={cx('body_img')}>
                                    <div className={cx('show_img_6')}>
                                        <Slider {...sliderSettings}>
                                            {article.files[0] && article.files[0].files.map((fileInfor, index) => {
                                                if (fileInfor.isImage == false) {
                                                    // Hiển thị video
                                                    return (
                                                        <video key={index} controls className={cx('video_video')}>
                                                            <source src={fileInfor.url} type={fileInfor.type} />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    );
                                                } else if (fileInfor && fileInfor.url) {
                                                    // Hiển thị ảnh
                                                    return (
                                                        <div key={index}>
                                                            <div className={cx('image-container')}>
                                                                <img src={fileInfor.url} alt={`Image ${index}`} className={cx('img_img')} />
                                                                {index > 0 && ( // Hiển thị button quay lại ảnh trước đó nếu không phải ảnh đầu tiên
                                                                    <button className={cx('prev-button')} onClick={() => this.slider.slickPrev()}>
                                                                        <i class="bi bi-chevron-compact-left"></i>
                                                                    </button>
                                                                )}
                                                                {index < article.files[0].files.length - 1 && ( // Hiển thị button chuyển đến ảnh tiếp theo nếu không phải ảnh cuối cùng
                                                                    <button className={cx('next-button')} onClick={() => this.slider.slickNext()}>
                                                                        <i class="bi bi-chevron-compact-right"></i>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('posts_footer')}>
                            <div className={cx('total_like')}>
                                <Link to="#" className={cx('count_like')}>
                                    {article.states.length} <span> loves  </span>
                                </Link>
                                <Link to="#" className={cx('count_like')}>
                                    {article.comment.length} <span>   comments </span>
                                </Link>
                            </div>
                            <div className={cx('emotion')}>
                                <div className={cx('emotion_item')}>
                                    {article.states && (
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
                                    )}


                                </div>
                                <div className={cx('emotion_item')}>
                                    <div className={cx('emotion_gird')} onClick={() => handleCommentClick(article)}>
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
                                {
                                    article.comment && article.comment.map((comment, index) => (
                                        index < 3 &&
                                        (
                                            <div className={cx('read_comment')}>
                                                <Link to="#">
                                                    <div className={cx('avatar_comment')}>
                                                        <img className={cx('circle_avt')} src={comment.usercomment.avatar} />
                                                    </div>
                                                </Link>
                                                <div style={{ display: 'flex' }} className={cx('read_cmt')}>
                                                    <div style={{ flex: '1' }}>
                                                        <p className={cx('content_cmt')}>
                                                            <Link className={cx('name_account_cmt')}>
                                                                {comment.usercomment.name}
                                                            </Link>
                                                            <span className={cx('view_cmt')}>
                                                                {comment.comment}
                                                            </span>
                                                        </p>
                                                        <div className={cx('reply_comment')}>
                                                            <Link to="#"> Like  </Link> •
                                                            <Link to="#"> Reply  </Link>• {formatTime(new Date(comment.timeComment))}
                                                        </div>
                                                    </div>
                                                    <div className={cx('setting-comment')}>
                                                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>
                                                            {isDropdownOpen && (
                                                                <div className={cx('dropdown-content')}>
                                                                    {/* Dropdown content */}
                                                                    <div className={cx('action-comment')}>
                                                                        <div className={cx('edit')}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                            </svg> &nbsp; Edit
                                                                        </div>
                                                                        <div className={cx('edit')}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                            </svg> &nbsp; Delete
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))
                                }

                            </div>
                        </div>
                    </li>
                ))}
            </div>

            {showUpdateBlogModal && < UpdateBlog setShowUpdateBlogModal={setShowUpdateBlogModal} />}

            {showDeleteModal && (
                <DeleteBlog
                    setShowDeleteModal={setShowDeleteModal}
                    itemId={articleIdToDelete}
                    itemType="article"
                    setFilteredItems={setFilteredArticles}
                    filteredItem={filteredArticles}
                />
            )}

            {showCommentBlogModal && (
                <CommentBlog
                    setShowCommentBlogModal={setShowCommentBlogModal}
                    selectedArticle={selectedArticle}
                />
            )}

        </>
    )
}

export default BlogForm
