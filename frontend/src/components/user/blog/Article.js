import style from './Article.module.css'
import Navigation from '../header/Navigation'
import Avt from "../../../image/avt.jpg"
import { Link } from 'react-router-dom'
import article2 from "../../../image/article2.webp"

const Article = () => {
    return (
        <body>
            <div className={style.article_form}>
                <Navigation />
                <div className={style.article_container}>
                    {/* nav  */}
                    <nav className={style.article_navbar}>
                        <div className={style.navbar_collapse}>
                            <div className={style.navbar_vertical}></div>
                        </div>
                    </nav>
                    {/* content  */}
                    <div className={style.article_content}>
                        <div className={style.article_gird}>
                            {/* CENTER */}
                            <div className={style.article_gird_center}>

                                {/* ceate post  */}
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

                                    <div className={style.post_body}>
                                        <form >
                                            <textarea rows="4" placeholder='What do you want to talk about?' className={style.textarea_post}>
                                            </textarea>
                                            <div className={style.post_image}>
                                                <div className={style.post_img_left}>
                                                    <button className={style.btn_img}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                                        </svg>
                                                        <span className={style.post_img}>Image</span>
                                                    </button>
                                                    <button className={style.btn_img}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                                        </svg>
                                                        <span className={style.post_img}>Event</span>
                                                    </button>
                                                    <button className={style.btn_img}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                                        </svg>
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
                                                    <button className={style.btn_post_share}>Share</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Bai dang  */}
                                <div className={style.post_status}>
                                    <div className={style.post_hearer}>
                                        <div className={style.post_hearer_between}>
                                            <div className={style.post_img_left}>
                                                <div className={style.d_flex}>
                                                    <Link to="#" className={style.d_flex}>
                                                        <div className={style.header_avatar}>
                                                            <img className={style.circle_avt1} src={Avt} />
                                                        </div>
                                                    </Link>
                                                    <div className={style.name_account}>
                                                        <p className={style.name_user}>
                                                            <Link to="#" className={style.post_name_account}>John &nbsp;</Link>
                                                            <span className={style.share_album}>
                                                                share an
                                                                <Link to="#"> album</Link>
                                                            </span>
                                                        </p>
                                                        <p className={style.date_time}>
                                                            11 hrs
                                                            .
                                                            Hanoi, VietNam
                                                            .
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.post_share}>
                                                <div className={style.post_setting}>
                                                    <button className={style.btn_setting}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={style.posts_body}>
                                        <p>
                                            Rowan Sebastian Atkinson CBE is an English actor, comedian and screenwriter best known for his work on the sitcoms Blackadder and Mr. Bean
                                        </p>
                                        <div>
                                            <div className={style.body_img}>
                                                <div className={style.show_img_6}>
                                                    <img className={style.img_img} src={article2} />
                                                </div>
                                                <div className={style.show_img_6}>
                                                    <img className={style.img_img} src={article2} />
                                                </div>
                                                <div className={style.show_img_4}>
                                                    <img className={style.img_img} src={article2} />
                                                </div>
                                                <div className={style.show_img_4}>
                                                    <img className={style.img_img} src={article2} />
                                                </div>
                                                <div className={style.show_img_4}>
                                                    <img className={style.img_img} src={article2} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.posts_footer}>
                                        <div className={style.total_like}>
                                            <Link to="/homepage" className={style.count_like}>
                                                342
                                                likes
                                            </Link>
                                        </div>
                                        <div className={style.emotion}>
                                            <div className={style.emotion_item}>
                                                <div className={style.emotion_gird}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                    </svg>
                                                    <span className={style.like_icon}>Like</span>
                                                </div>
                                            </div>
                                            <div className={style.emotion_item}>
                                                <div className={style.emotion_gird}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-heart-fill" viewBox="0 0 16 16">
                                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                                    </svg>
                                                    <span className={style.like_icon}>Comment</span>
                                                </div>
                                            </div>
                                            <div className={style.emotion_item}>
                                                <div className={style.emotion_gird}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                                                    </svg>
                                                    <span className={style.like_icon}>Share</span>
                                                </div>
                                            </div>
                                        </div>
                                        <form>
                                            <div className={style.write_comment}>
                                                <div className={style.cmt_avt}>
                                                    <div className={style.avatar_comment}>
                                                        <img className={style.circle_avt} src={Avt} />
                                                    </div>
                                                </div>
                                                <input placeholder="Write a comment ..." type='text' className={style.input_cmt}></input>
                                            </div>
                                        </form>
                                        <div>
                                            <div className={style.read_comment}>
                                                <Link to=""></Link>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={style.read_comment}></div>
                                        </div>
                                    </div>
                                </div>


                                {/* RIGHT  */}
                                {/* <div className={style.article_gird_right}>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Article