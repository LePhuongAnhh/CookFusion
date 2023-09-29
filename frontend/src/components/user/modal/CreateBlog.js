import style from './CreateBlog.module.css'
import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom'
import Avt from "../../../image/avt.jpg"
import article2 from "../../../image/article2.webp"
import addfile from "../../../image/image.png"
import img from "../../../image/anh123.jpg"
import checkin from "../../../image/check-in.png"
import event from "../../../image/calendar-date.png"
import DeleteBlog from "../modal/DeleteBlog"
import CommentBlog from "../modal/CommentBlog"
import BlogForm from "../modal/BlogForm"

const CreateBlog = ({ setShowCreateBlogModal }) => {
    const [isChecked, setIsChecked] = useState(true);

    return (
        <div className={style.modalDeleteIdea}>
            <div className={style.modalContentDeleteIdea}>
                <div>
                    <div className={style.createIdeaHeader}>
                        <h1 className={style.createIdea}>Create Article</h1>
                        <div className={style.exit_cmt_modal} onClick={() => setShowCreateBlogModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={style.space}></div>

                <div className={style.post_status}>
                    <div className={style.post_hearer}>
                        <div className={style.header_item}>
                            <div className={style.header_avatar}>
                                <img className={style.circle_avt} src={Avt} />
                            </div>
                            <div className={style.post_create}>
                                <h5 className={style.create_post}>Create Post</h5>
                            </div>
                        </div>
                    </div>

                    <div className={style.post_body} >
                        <form onClick={() => setShowCreateBlogModal(true)}>
                            <textarea rows="6" placeholder='What do you want to talk about?' className={style.textarea_post} >
                            </textarea>
                            <div className={style.post_image}>
                                <div className={style.post_img_left} >
                                    <button className={style.btn_img}  >
                                        <img src={addfile} />
                                        <span className={style.post_img}>Image</span>
                                    </button>
                                    <button className={style.btn_img}>
                                        <img src={event} />
                                        <span className={style.post_img}>Event</span>
                                    </button>
                                    <button className={style.btn_img}>
                                        <img src={checkin} />
                                        <span className={style.post_img}>Check in</span>
                                    </button>
                                </div>
                                <div className={style.post_share}>
                                    <div className={style.post_public}>
                                        <button className={style.drop_public}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
                                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={style.condition}>
                                <label>
                                    <input type="checkbox" checked={isChecked} /> I agree to 
                                </label>
                                <span className={style.linkCondition}>
                                Term and Condition
                                </span>
                                 
                            </div>
                        </form>
                    </div>

                    <div className={style.create_footer}>
                        <button className={style.btn_post_share}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog