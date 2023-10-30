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
import CreateBlog from "./CreateBlog"
import UpdateBlog from "./UpdateBlog";

const cx = classNames.bind(styles)
const BlogForm = ({ }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const authorIdToDisplay = profileInformation._id
    const location = useLocation();

    // Đặt state để lưu thông tin bài viết được chọn
    const [selectedArticleForComment, setSelectedArticleForComment] = useState(null);
    // Xử lý sự kiện khi nhấp vào biểu tượng comment
    const handleCommentClick = (article) => {
        setSelectedArticleForComment(article); // Lưu thông tin bài viết được chọn
        setShowCommentBlogModal(true); // Hiển thị modal
    };
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false) // trạng thái của modal hiển thị form comment
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

    //DETAIL IDEA 
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)
    // Hàm xử lý khi người dùng click vào bài viết
    const handleViewPost = (articleId) => {
        const selectedPost = filteredArticles.find(article => article.articleId === articleId);
        setSelectedArticleForComment(selectedPost); // Lưu thông tin bài viết được chọn
        setShowCommentBlogModal(true); // Hiển thị modal CommentBlog
    };


    const [filteredArticles, setFilteredArticles] = useState([]); // Thêm state để lưu bài viết đã lọc
    // const [selectedArticle, setSelectedArticle] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/article/getlistforglobal`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response) {
                    const articlesData = response.data.data.map(article => {
                        const timeUpload = formatTime(new Date(article.timeUpload)); // Định dạng thời gian tải lên của bài viết thông qua hàm formatTime
                        const content = article.content;
                        const hashtags = content.match(/#[^\s#]*/g);
                        const articleId = article._id; // Lấy _id và lưu vào biến articleId
                        return { ...article, timeUpload, hashtags, articleId }; // Sao chép vào một đối tượng mới và thêm thuộc tính articleId
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
        fetchData();
    }, []);

    return (
        <>
            <div className={cx('post_status')}>
                {filteredArticles.map((article,index) => (
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
                                                    {/* {
                                                        article.userUpload[0].avatar === null ? (<img src={article.userUpload[0].Avatar} className={cx('circle_avt1')} />) : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vojjyljLC2ZHahToRN1w6Ll-1H1CQVrTXg&usqp=CAU' alt="avatar" className={cx('circle_avt1')} />
                                                    } */}
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
                                                    { article.userUpload[0]._id === profileInformation._id && (
                                                        <div className={cx('dropdown_content')}>
                                                        <Link to="#" onClick={() => setShowUpdateBlogModal(true)}>Update</Link>
                                                        <Link to="#" onClick={() => handleDeleteIconClick(article._id)}>Delete</Link>
                                                        <Link to="#">Accuse</Link>
                                                    </div>
                                                    )
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
                                    <p style={{ color: "blue" }}>{article.hashtags}</p>
                                </p>
                                <div>
                                    <div className={cx('body_img')}>
                                        <div className={cx('show_img_6')}>
                                                <div>
                                                    {article.files[0] && article.files[0].files.map((fileInfor,index) => {
                                                            return <img key={index} src={fileInfor.url} alt={`Image ${index}`} className={cx('img_img')} />
                                                        })
                                                    }
                                                </div>
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
                ))}
            </div>

            {showUpdateBlogModal && < UpdateBlog setShowUpdateBlogModal={setShowUpdateBlogModal} />}

            {showDeleteModal && (
                <DeleteBlog
                    setShowDeleteModal={setShowDeleteModal}
                    articleId={articleIdToDelete}
                    setFilteredArticles={setFilteredArticles}
                    filteredArticles={filteredArticles}
                />
            )}

            {showCommentBlogModal && selectedArticleForComment && (
                <CommentBlog
                    setShowDeleteModal={setShowDeleteModal}
                    articleId={articleIdToDelete}
                    filteredArticles={filteredArticles} // Truyền filteredArticles vào DeleteBlog
                    setFilteredArticles={setFilteredArticles} // Truyền hàm cập nhật danh sách bài viết
                />
            )}
            {/* {showCommentBlogModal && selectedArticleForComment && (
                <CommentBlog
                    selectedArticle={selectedArticleForComment}
                    setShowCommentBlogModal={setShowCommentBlogModal} // Có thể cần truyền hàm để ẩn modal
                />
            )} */}


        </>
    )
}

export default BlogForm
