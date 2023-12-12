
import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enUS } from 'date-fns/locale';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import {
    apiUrl,
    ACCESS_TOKEN,
    PROFILE_INFORMATION
} from "~/constants/constants"
import images from '~/assets/images'
import styles from './BlogForm.module.scss'
import classNames from 'classnames/bind'
import DeleteBlog from "./DeleteBlog"
import UpdateBlog from "./UpdateBlog";

import Loading from "../Layout/Loading";

const socket = io('https://gourmetfoodie.onrender.com/', { transports: ['websocket'] })

const cx = classNames.bind(styles)
const ArticleAdsModal = () => {
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
    const { id } = useParams();

    // Sử dụng hàm này khi người dùng click vào icon comment
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false)
    //setting comment
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredArticles, setFilteredArticles] = useState([]);

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


    const handleGetdata = async () => {
        try {
            const response = await axios.get(`${apiUrl}/article/getonearticle/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("data nay:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


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
                var response = await axios.get(`${apiUrl}/article/getonearticle/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            }
            if (response) {
                const articlesData = response.data.data.map(article => {
                    const timeUpload = formatDistanceToNow(new Date(article.timeUpload), { addSuffix: true, locale: enUS });
                    const content = article.content;
                    const regex = /#[^\s#]+/g;
                    const hashtags = article.hashtag.match(regex) || [];
                    const articleId = article._id;
                    const comments = article.comments || [];
                    return { ...article, timeUpload, hashtags, articleId, comments };
                });
                setFilteredArticles(articlesData);
            }

        } catch (error) {
            console.log(error.response.data.message);
        }
    };


    useEffect(() => {
        const handleNewArticleAdded = async () => {
            await fetchData();
        };
        window.addEventListener('newArticleAdded', handleNewArticleAdded);
        return () => {
            window.removeEventListener('newArticleAdded', handleNewArticleAdded);
        };
    }, [fetchData]);

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
    const handleCommentClick = (content, contentType) => {
        if (contentType === "article") {
            setSelectedArticle(content);
        }
        setShowCommentBlogModal(true);
    };


    //delete comment
    const handleDeleteComment = async (_id) => {
        try {
            await axios.delete(`${apiUrl}/comment/deleteComment`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: {
                    _id: _id,
                },
            });

            setFilteredArticles((prevArticles) => {
                // Lọc bỏ comment đã bị xóa
                const updatedArticles = prevArticles.map((article) => {
                    // Kiểm tra xem bài viết có comment đang xóa không
                    const updatedComments = article.comments.filter(
                        (comment) => comment._id !== _id
                    );
                    // Trả về bài viết mới sau khi loại bỏ comment
                    return {
                        ...article,
                        comments: updatedComments,
                    };
                });
                return updatedArticles;
            });
        } catch (error) {
            console.error("Lỗi xóa bình luận:", error);
        }
    };
    // console.log("Lỗi xóa bình luận:", filteredArticles.content);
    // if (filteredArticles.length === 0) {
    //     return <p className={cx('loading')}> <Loading /></p>;
    // }

    return (
        <>
            <div className={cx('post_status_ads', 'box-shadow')}>
                {filteredArticles.map((article) => (
                    <li className={cx("box-card")} key={filteredArticles._id}>
                        <div style={{ marginTop: '90px' }} className={cx('post_status_ads')}>
                            <div className={cx('post_hearer')}>
                                <div className={cx('post_hearer_between')}>
                                    <div className={cx('post_img_left')}>
                                        <div className={cx('d_flex')}>
                                            <Link to={`/profile/${encodeURIComponent(filteredArticles.userUpload[0]._id)}`} className={cx('d_flex')}>
                                                <div className={cx('header_avatar')}>
                                                    <img
                                                        className={cx('circle_avt1')}
                                                        src={filteredArticles.userUpload[0].avatar}
                                                    />
                                                </div>
                                            </Link>
                                            <div className={cx('name_account')}>
                                                <p className={cx('name_user')}>
                                                    <Link to={`/profile/${encodeURIComponent(filteredArticles.userUpload[0]._id)}`} className={cx('post_name_account')}>
                                                        {filteredArticles.userUpload[0].name}&nbsp;
                                                    </Link>
                                                    <span className={cx('share_album')}>
                                                        share post {filteredArticles.title}
                                                        {/* {filteredArticles.userUpload[0]._id} */}
                                                    </span>
                                                </p>
                                                <p className={cx('date_time')}>
                                                    {filteredArticles.timeUpload}
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
                                                    {(filteredArticles.userUpload[0]._id === profileInformation._id) ? (
                                                        <div className={cx('dropdown_content')}>
                                                            <Link to="#" onClick={() => setShowUpdateBlogModal(true)}>Update</Link>
                                                            <Link to="#" onClick={() => handleDeleteIconClick(filteredArticles._id)}>Delete</Link>
                                                        </div>
                                                    ) : <div className={cx('dropdown_content')}>
                                                        <Link to="#" onClick={() => handleReport(filteredArticles._id)}>Report</Link>
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
                                    {filteredArticles.content}
                                    <div>
                                        {
                                            filteredArticles.hashtags.length > 0 && filteredArticles.hashtags.map((hashtag) => (
                                                <a style={{ color: "blue" }} onClick={() => handleSearchHashtag(hashtag)}>{hashtag}</a>
                                            ))

                                        }
                                    </div>
                                </p>

                                <div className={cx('body_img')}>
                                    <div className={cx('show_img_6')}>
                                        <Slider {...sliderSettings}>
                                            {filteredArticles.files[0] && filteredArticles.files[0].files.map((fileInfor, index) => {
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
                                                                {index < filteredArticles.files[0].files.length - 1 && ( // Hiển thị button chuyển đến ảnh tiếp theo nếu không phải ảnh cuối cùng
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
                            <div className={cx('emotion')}>
                                <div style={{ display: "flex" }}>
                                    <div className={cx('emotion_item')}>
                                        {filteredArticles.states && (
                                            (filteredArticles.states.find(state => state.Account_id === authorIdToDisplay)) ? (
                                                filteredArticles.states.map((state) => (
                                                    state.Account_id == authorIdToDisplay && (
                                                        <div className={cx('emotion_gird')} onClick={() => handleUnState(state)}>
                                                            <img className={cx('ing-emotion')} src={images.afterLike} />
                                                            <span className={cx('like_icon')}></span>
                                                        </div>
                                                    )
                                                ))
                                            ) : <div className={cx('emotion_gird')} onClick={() => handleAddState(filteredArticles._id)}>
                                                <img className={cx('ing-emotion')} src={images.beforeLike} />
                                                <span className={cx('like_icon')}></span>
                                            </div>
                                        )}

                                    </div>
                                    <div className={cx('emotion_item')}>
                                        <div className={cx('emotion_gird')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-heart-fill" viewBox="0 0 16 16">
                                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                            </svg>
                                            <span className={cx('like_icon')}></span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('total_like')}>
                                    <Link to="#" className={cx('count_like')}>
                                        {filteredArticles.states.length} <span> loves  </span>
                                    </Link>
                                    <Link to="#" className={cx('count_like')}>
                                        {filteredArticles.comment.length} <span> comments </span>
                                    </Link>
                                </div>
                            </div>

                            <div className={cx('posts_footer')}>
                                <form
                                // onSubmit={handleSubmitComment}
                                >
                                    <div className={cx('write_comment')}>
                                        <div className={cx('cmt_avt')}>
                                            <div className={cx('avatar_comment')}>
                                                <img className={cx('circle_avt')} src={filteredArticles.userUpload[0].avatar} />
                                            </div>
                                        </div>
                                        <input type="hidden" name="_id" value={filteredArticles._id} />
                                        <input
                                            placeholder="Write a comment ..."
                                            type='text'
                                            className={cx('input_cmt')}
                                            name="comment"
                                        // onChange={handleChangeComment}
                                        // value={commentData.comment}
                                        />
                                    </div>
                                </form>
                            </div>
                            {/* <div>
                                {
                                    listComment && listComment.map((comment, index) => (
                                        (
                                            <div className={cx('read_comment')}>
                                                <Link to={`/profile/${encodeURIComponent(comment.usercomment._id)}`}>
                                                    <div className={cx('avatar_comment')}>
                                                        <img className={cx('circle_avt')} src={comment.usercomment.avatar} />
                                                    </div>
                                                </Link>
                                                <div className={cx('read_cmt')}>
                                                    <p className={cx('content_cmt')}>
                                                        <Link to={`/profile/${encodeURIComponent(comment.usercomment._id)}`} className={cx('name_account_cmt')}>
                                                            {comment.usercomment.name}
                                                        </Link>
                                                        <span className={cx('view_cmt')}>
                                                            {comment.comment}
                                                        </span>
                                                    </p>
                                                    <div className={cx('reply_comment')}>
                                                        {formatTime(new Date(comment.timeComment))}
                                                    </div>
                                                </div>
                                                <div className={cx('setting-comment')}>
                                                    <div className={cx('dropdown', 'review_action')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                        <span className={cx('like_icon')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>
                                                        </span>

                                                        {isDropdownOpen && (
                                                            <div className={cx('dropdown-content')}>
                                                                {comment.usercomment._id === userId && (
                                                                    <div className={cx('action-comment')}>
                                                                        <div className={cx('edit')} onClick={() => handleDeleteComment(comment._id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                            </svg> &nbsp; Delete
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))
                                }

                            </div> */}
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
        </>
    )
}

export default ArticleAdsModal
