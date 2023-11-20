import React from 'react';
import { Link } from 'react-router-dom'
import styles from "./AboutUs.module.scss"
import classNames from 'classnames/bind'

// import Main from "../../../image/main_img.png"
// import About from "../../../image/about.png"
import images from '~/assets/images'

const cx = classNames.bind(styles)

function AboutUs() {
    return (
        <div>
            <div className={cx('about_us')}>
                <div className={cx('about_us_contain')}>
                    {/* MAIN  */}
                    <div className={cx('home_home')} id="Home">
                        <div className={cx('main')}>
                            <div className={cx('main_text')}>
                                <h1>Get Cook<span> Food</span><br />in a Easy Way</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Laborum, minus magnam nobis quam impedit nemo quaerat ex
                                    necessitatibus ipsum totam voluptatum, fugit cupiditate
                                    provident, quasi perspiciatis blanditiis illo nesciunt quae.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Accusantium odio tenetur laudantium corrupti impedit
                                    quidem dolore beatae, iure labore magni repellendus
                                    inventore, eaque obcaecati commodi ipsa numquam. Accusamus,
                                    molestiae veritatis.
                                </p>
                                <Link to="#" className={cx('btn')}>
                                    See Now
                                </Link>
                            </div>
                            <div className={cx('main_image')}>
                                <img src={images.Main} />
                            </div>
                        </div>
                    </div>

                    {/* ABOUT  */}
                    <div className={cx('about')}>

                        <div className={cx('about_main')}>

                            <div className={cx('about_image')}>
                                <img src={images.About} />
                            </div>
                            <div className={cx('about_text')}>
                                <h1><span>About</span>Us</h1>
                                <h3>why food choose us?</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Itaque recusandae dolore tempora fugiat quisquam illum,
                                    veniam adipisci iusto consequuntur porro explicabo
                                    repudiandae nam quis beatae obcaecati. Magnam provident
                                    fuga aspernatur. Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Cum minus facilis placeat sint repellendus
                                    dolorum nostrum, corrupti magni ducimus, et neque nihil enim.
                                    Tempore quia rerum placeat laboriosam, sit quasi!
                                </p>
                                <div className={cx('about_services')}>
                                    <div className={cx('s_1')}>
                                        <i class="fa-solid fa-truck-fast"></i>
                                        <Link to="#">Fast Delivery</Link>
                                    </div>
                                    <div className={cx('s_1')}>
                                        <i class="fa-brands fa-amazon-pay"></i>
                                        <Link to="#">Easy Payment</Link>
                                    </div>
                                    <div className={cx('s_1')}>
                                        <i class="fa-solid fa-headset"></i>
                                        <Link to="#">24 x 7 Services</Link>
                                    </div>
                                </div>
                                <Link to="#" className={cx('about_btn')}>
                                    <i class="{fa-solid fa-burger"></i>Order Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs