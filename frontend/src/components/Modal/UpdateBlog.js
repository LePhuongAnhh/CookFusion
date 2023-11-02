import styles from './CreateBlog.module.scss'
import classNames from 'classnames/bind'
import React, { useRef, useState, Component } from 'react';
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import axios from 'axios'
import {
    apiUrl,
    PROFILE_INFORMATION,
    ACCESS_TOKEN
}
    from "../../constants/constants"

const cx = classNames.bind(styles)

const UpdateBlog = ({ setShowUpdateBlogModal, updateNewArticle }) => {
    const profile_information = JSON.parse(localStorage.getItem(PROFILE_INFORMATION)) // chuyển json sang object để lấy thông tin profile người dùng
    // const userId = profile_information._id // lấy ra user ID (không phải account ID)
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
        files: null,
    });
    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        console.log(event.target.value)
        setArticleData({
            ...articleData,
            [name]: name === 'files' ? files[0] : value,
        });
    };

    function checkValideInput() {
        let isValid = true;
        let arrInput = ['title', 'content'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log(articleData[arrInput[i]], arrInput[i])
            if (!articleData[arrInput[i]]) {
                isValid = false;
                alert("title va content khong dc de trong nha nay  ", + arrInput[i]);
                break
            }
        }
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isValid = checkValideInput();
        if (isValid === true) {
            const formData = new FormData();
            formData.append('title', articleData.title);
            formData.append('content', articleData.content);
            formData.append('files', articleData.files);
            console.log(articleData)
            updateNewArticle(articleData);
            try {
                const response = await axios.post(`${apiUrl}article/addNew`, formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.data.success) {
                    console.log('Bài viết đã được tạo thành công.');
                    alert('Bài viết đã được tạo thành công')
                } else {
                    console.error('Có lỗi khi tạo bài viết:', response.data.message);
                    alert('cos loi')
                }
            } catch (error) {
                if (error.response.data.message === "This article contains badword") {
                    alert("Bài viết chứa từ tục, không được đăng.");
                } else {
                    console.error(error.response.data.message);
                    alert('loi kia, tu sua di')
                }
            }
        }
    };


    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div className={cx('createIdeaHeader')}>
                    <h1 className={cx('createIdea')}>Update Article</h1>
                    <div
                        className={cx('exit_cmt_modal')}
                        onClick={() => setShowUpdateBlogModal(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div className={cx('space')}></div>

                <div className={cx('post_status')}>
                    <form
                        onClick={() => setShowUpdateBlogModal(true)}
                        onSubmit={handleSubmit}
                    >
                        <div className={cx('post_hearer')}>
                            <div className={cx('header_item')}>
                                <div className={cx('header_avatar')}>
                                    <img
                                        className={cx('circle_avt')}
                                        src={images.Avt}
                                    />
                                </div>
                                <div className={cx('post_create')}>
                                    <h5 className={cx('create_post')}>
                                        <input
                                            placeholder='Title'
                                            type="text"
                                            name="title"
                                            value={articleData.title}
                                            onChange={handleInputChange}
                                        />
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className={cx('post_body')} >
                            <textarea
                                rows="6"
                                placeholder='What do you want to talk about?'
                                className={cx('textarea_post')}
                                name="content"
                                value={articleData.content}
                                onChange={handleInputChange}
                            >
                            </textarea>
                            <div className={cx('post_image')}>
                                <div className={cx('post_img_left')} >
                                    <button className={cx('btn_img')}  >
                                        <input
                                            type='file'
                                            name="files"
                                            onChange={handleInputChange}
                                            className={cx('fileInput')}
                                        />
                                    </button>
                                </div>
                                <div className={cx('post_share')}>
                                    <div className={cx('post_public')}>
                                        <button className={cx('drop_public')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
                                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('condition')}>
                            </div>

                        </div >

                        <div className={cx('create_footer')}>
                            <button type='submit' className={cx('btn_post_share')}>Update</button>
                        </div>
                    </form >
                </div >
            </div >
        </div >
    )
}

export default UpdateBlog