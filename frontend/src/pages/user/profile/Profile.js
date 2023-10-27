//import từ thư viện bên ngoài
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


//import từ bên trong src
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants"
import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import images from '~/assets/images'
import { Link } from 'react-router-dom'
import EditProfile from "./EditProfile"
import CreateBlog from "~/components/Modal/CreateBlog"
import UpdateBlog from "~/components/Modal/UpdateBlog"
import DeleteBlog from "~/components/Modal/DeleteBlog"
import CommentBlog from "~/components/Modal/CommentBlog"
import BlogForm from "~/components/Modal/BlogForm"

const cx = classNames.bind(styles)
function Profile() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const navigate = useNavigate()
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt
    const [events, setEvents] = useState([])
    const updateNewArticle = (data) => {
        console.log('get data update post', data)
    }
    console.log("avt ne", profileInformation.avatar)
    return (
        <>
            <div className={cx("w-full", "h-full", "container-profile")}>
                <div className="w-full h-auto shadow bg-white rounded-md">
                    <div className="max-w-6xl h-full mx-auto bg-white p-1">
                        <div
                            className="h-300 max-h-300 w-full rounded-lg relative"
                            style={{
                                backgroundImage: `url('https://random.imagecdn.app/1920/1080')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '5px',
                                height: '300px',
                            }}
                        >
                            <div
                                className="absolute  w-full flex items-center justify-center"
                                style={{ bottom: '-15px' }}
                            >
                                <div className="w-35 h-35 rounded-full bg-gray-300 border-4 border-white d-flex align-items-center justify-content-center">
                                    <img
                                        className="w-full h-full rounded-full  rounded-circle"
                                        // src="https://random.imagecdn.app/250/250"
                                        src={profileInformation.avatar}
                                        alt="avatar "
                                        style={{ marginTop: "12rem" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-5xl h-full mx-auto">
                            <div className="flex flex-col space-y-2 mt-3 items-center justify-center pb-3 border-b-2">
                                <p
                                    onClick={() => setShowUpdateProfileModal(true)}
                                    className={cx("text-4xl", "font-bold", " d-flex", "align-items-center", "justify-content-center", 'edit-profile')}
                                >
                                    Edit Profile
                                </p>
                                <p className={cx("text-4xl", "font-bold", " d-flex", "align-items-center", "justify-content-center", 'name-account')}>{profileInformation.name}</p>
                            </div>
                            <div className="mt-1 flex items-center justify-between">

                                <div className="flex items-center space-x-2">
                                    <div className={cx("left")}>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-average")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> Average
                                        </button>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-recipe")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> Like
                                        </button>
                                    </div>
                                    <div className={cx("right")}>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-blog")} >
                                            <i className="fas fa-plus-circle  mr-2"></i>comment
                                        </button>"
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-plan")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={("row")}>
                {/* left  */}
                <div className="col-lg-3 shadow">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                        </div>
                    </div>
                </div>
                {/* right  */}
                <div className="col-lg-9 shadow h-auto">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div>
                                <ul className={cx("flex", "mb-2", "items-center", "space-x-2")}>
                                    <li className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                                        <Link to="#"> Blog</Link>
                                    </li>
                                    <li className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                                        <Link to="#"> Recipe</Link>
                                    </li>
                                    <li className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                                        <Link to="#"> Plan meal</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="max-w-6xl h-full mx-auto bg-white p-1">
                                    {/* chôx tạo bài  */}
                                    <div className={cx('post_status')}>
                                        <div className={cx('post_hearer')}>
                                            <div className={cx('header_item')}>
                                                <div className={cx('header_avatar')}>
                                                    <img className={cx('circle_avt')} src={images.Avt} />
                                                </div>
                                                <div className={cx('post_create')}>
                                                    <h5 className={cx('create_post')}>{profileInformation.name}</h5>
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

                                    <div className={cx('post_status')}>
                                        <BlogForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {showUpdateProfileModal && < EditProfile setShowUpdateProfileModal={setShowUpdateProfileModal} />}
            {showCreateBlogModal && <CreateBlog setShowCreateBlogModal={setShowCreateBlogModal} />}
            {showUpdateBlogModal && < UpdateBlog setShowUpdateBlogModal={setShowUpdateBlogModal} updateNewArticle={updateNewArticle} />}
            {showDeleteModal && <DeleteBlog setShowDeleteModal={setShowDeleteModal} />}
            {showCommentBlogModal && <CommentBlog setShowCommentBlogModal={setShowCommentBlogModal} />}
        </>
    );
}
export default Profile;