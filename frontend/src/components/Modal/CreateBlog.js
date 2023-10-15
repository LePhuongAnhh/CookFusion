import styles from './CreateBlog.module.scss'
import classNames from 'classnames/bind'
import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom'
import images from '~/assets/images'

const cx = classNames.bind(styles)
const CreateBlog = ({ setShowCreateBlogModal }) => {
    const [isChecked, setIsChecked] = useState(true);
    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>Create Article</h1>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowCreateBlogModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={cx('space')}></div>

                <div className={cx('post_status')}>
                    <div className={cx('post_hearer')}>
                        <div className={cx('header_item')}>
                            <div className={cx('header_avatar')}>
                                <img className={cx('circle_avt')} src={images.Avt} />
                            </div>
                            <div className={cx('post_create')}>
                                <h5 className={cx('create_post')}>Create Post</h5>
                            </div>
                        </div>
                    </div>

                    <div className={cx('post_body')} >
                        <form onClick={() => setShowCreateBlogModal(true)}>
                            <textarea rows="6" placeholder='What do you want to talk about?' className={cx('textarea_post')} >
                            </textarea>
                            <div className={cx('post_image')}>
                                <div className={cx('post_img_left')} >
                                    <button className={cx('btn_img')}  >
                                        <img src={images.addfile} />
                                        <span className={cx('post_img')}>Image</span>
                                    </button>
                                    <button className={cx('btn_img')}>
                                        <img src={images.event} />
                                        <span className={cx('post_img')}>Event</span>
                                    </button>
                                    <button className={cx('btn_img')}>
                                        <img src={images.checkin} />
                                        <span className={cx('post_img')}>Check in</span>
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
                                <label>
                                    <input type="checkbox" checked={isChecked} /> I agree to
                                </label>
                                <span className={cx('linkCondition')}>
                                    Term and Condition
                                </span>

                            </div>
                        </form >
                    </div >

                    <div className={cx('create_footer')}>
                        <button className={cx('btn_post_share')}>Share</button>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default CreateBlog