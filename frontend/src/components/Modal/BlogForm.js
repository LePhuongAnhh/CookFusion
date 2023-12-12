
import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enUS } from 'date-fns/locale';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ActivePostModal from "./ActivePostModal"



import {
    apiUrl,
    ACCESS_TOKEN,
    PROFILE_INFORMATION
} from "~/constants/constants"
import images from '~/assets/images'
import styles from './BlogForm.module.scss'
import classNames from 'classnames/bind'
import DeleteBlog from "./DeleteBlog"
import CommentBlog from "./CommentBlog"
import UpdateBlog from "./UpdateBlog";

import Loading from "../Layout/Loading";

const socket = io('https://gourmetfoodie.onrender.com/', { transports: ['websocket'] })

const cx = classNames.bind(styles)
const BlogForm = ({ idProfile }) => {
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
    const [role, setRole] = useState('');

    // Sử dụng hàm này khi người dùng click vào icon comment
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false)
    const [showActivePostModal, setShowActivePostModal] = useState(false);
    //setting comment
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false); // State để kiểm tra xem đang fetch thêm dữ liệu hay không
    const [loadedPosts, setLoadedPosts] = useState(10); // Số lượng bài viết đã hiển thị
    const [articleIdToActiveAds, setArticleIdToActiveAds] = useState(null)
    const handleActiveAds = (_id) => {
        setArticleIdToActiveAds(_id);
        setShowActivePostModal(true);
    };
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

    //load trang

    const fetchMoreData = async () => {
        try {
            var response = await axios.get(`${apiUrl}/article/getlistforglobal/${(loadedPosts + 10) / 10}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
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
                console.log(articlesData)
                setFilteredArticles(articlesData);
            }
            if (filteredArticles.length === 0) {
                return <p className={cx('loading')}> <Loading /></p>;
            }

        } catch (error) {
            console.log(error)
        }
    }
    const handleScroll = async () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 10 && loadedPosts % 10 === 0 && !loadingMore && !idProfile) {
            try {
                setLoadingMore(true); // Bắt đầu quá trình fetch
                await fetchMoreData();
                // await fetchData()
                // Tăng số lượng bài viết đã hiển thị
                setLoadedPosts((prevPosts) => prevPosts + 10);
                console.log('Cuộn đến bài thứ 10 và gọi API thành công!');

            } catch (error) {
                console.error(error);
            } finally {
                setLoadingMore(false); // Hoàn tất quá trình fetch
            }


        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loadedPosts, fetchMoreData, loadingMore]);



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
            if (idProfile) {
                var response = await axios.get(`${apiUrl}/article/getlistforprofile/${idProfile}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            }

            else {
                if (hashtag) {
                    const uri = `${apiUrl}/article/getlistwithhashtag/${encodeURIComponent(hashtag)}`
                    var response = await axios.get(uri, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                } else {
                    var response = await axios.get(`${apiUrl}/article/getlistforglobal/1`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                }
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
    //Read data
    useEffect(() => {
        const handleNewArticleAdded = async () => {
            await fetchData();
        };

        window.addEventListener('newArticleAdded', handleNewArticleAdded);

        return () => {
            window.removeEventListener('newArticleAdded', handleNewArticleAdded);
        };
    }, []);

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



    return (
        <>
            <div className={cx('post_status')}>
                {filteredArticles.length > 0 && filteredArticles.map((article) => (
                    // {filteredArticles.slice(0, loadedPosts).map((article) => (
                    <li className={cx("box-card")} key={article._id}>
                        <div className={cx('post_status')}>
                            <div className={cx('post_hearer')}>
                                <div className={cx('post_hearer_between')}>
                                    <div className={cx('post_img_left')}>
                                        <div className={cx('d_flex')}>

                                            <Link to={`/profile/${encodeURIComponent(article.userUpload[0]._id)}`} className={cx('d_flex')}>
                                                <div className={cx('header_avatar')}>
                                                    <img
                                                        className={cx('circle_avt1')}
                                                        src={article.userUpload[0].avatar}
                                                    />
                                                </div>
                                            </Link>
                                            <div className={cx('name_account')}>
                                                <p className={cx('name_user')}>
                                                    <Link to={`/profile/${encodeURIComponent(article.userUpload[0]._id)}`} className={cx('post_name_account')}>
                                                        {article.userUpload[0].name}&nbsp;
                                                    </Link>
                                                    <span className={cx('share_album')}>
                                                        share post {article.title}
                                                        {/* {article.userUpload[0]._id} */}
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
                                                            {role === "653b77c46139d7a2604cedb7" && article.ads.length > 0(
                                                                <>
                                                                    <Link to="#" onClick={() => handleActiveAds(article.ads[0]._id)}>Active ads</Link>
                                                                </>
                                                            )}
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
                            <div className={cx('emotion')}>
                                <div style={{ display: "flex" }}>
                                    <div className={cx('emotion_item')}>
                                        {article.states && (
                                            (article.states.find(state => state.Account_id === authorIdToDisplay)) ? (
                                                article.states.map((state) => (
                                                    state.Account_id == authorIdToDisplay && (
                                                        <div className={cx('emotion_gird')} onClick={() => handleUnState(state)}>
                                                            <img className={cx('ing-emotion')} src={images.afterLike} />
                                                            <span className={cx('like_icon')}></span>
                                                        </div>
                                                    )
                                                ))
                                            ) : <div className={cx('emotion_gird')} onClick={() => handleAddState(article._id)}>
                                                <img className={cx('ing-emotion')} src={images.beforeLike} />
                                                <span className={cx('like_icon')}></span>
                                            </div>
                                        )}

                                    </div>
                                    <div className={cx('emotion_item')}>
                                        <div className={cx('emotion_gird')} onClick={() => handleCommentClick(article, "article")}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-heart-fill" viewBox="0 0 16 16">
                                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                            </svg>
                                            <span className={cx('like_icon')}></span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('total_like')}>
                                    <Link to="#" className={cx('count_like')}>
                                        {article.states.length} <span> loves  </span>
                                    </Link>
                                    <Link to="#" className={cx('count_like')}>
                                        {article.comment.length} <span> comments </span>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                {
                                    article.comment && article.comment.map((comment, index) => (
                                        index < 3 &&
                                        (
                                            <div className={cx('read_comment')}>
                                                <Link to={`/profile/${encodeURIComponent(comment.usercomment._id)}`}>
                                                    <div className={cx('avatar_comment')}>
                                                        <img className={cx('circle_avt')} src={comment.usercomment.avatar} />
                                                    </div>
                                                </Link>
                                                <div style={{ display: 'flex' }} className={cx('read_cmt')}>
                                                    <div style={{ flex: '1' }}>
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
                    // selectedArticle={selectedArticle}
                    selectedContent={selectedArticle}
                    contentType="article"
                />
            )}
            {showActivePostModal && (
                <ActivePostModal
                    _id={articleIdToActiveAds}
                    setShowActivePostModal={setShowActivePostModal}
                    filteredArticles={filteredArticles}
                />
            )}

        </>
    )
}

export default BlogForm