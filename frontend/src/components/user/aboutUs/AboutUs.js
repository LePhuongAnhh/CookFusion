import React from 'react';
import { Link } from 'react-router-dom'
import style from "./AboutUs.module.css"
import Navigation from '../header/Navigation'
import Main from "../../../image/main_img.png"
import About from "../../../image/about.png"

function AboutUs() {
    return (
        <div>
            <Navigation />
            <div className={style.about_us}>
                <div className={style.about_us_contain}>
                    {/* MAIN  */}
                    <div className={style.home_home} id="Home">
                        <div className={style.main}>
                            <div className={style.main_text}>
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
                                <Link to="#" className={style.btn}>
                                    See Now
                                </Link>
                            </div>
                            <div className={style.main_image}>
                                <img src={Main} />
                            </div>
                        </div>
                    </div>

                    {/* ABOUT  */}
                    <div className={style.about}>

                        <div className={style.about_main}>

                            <div className={style.about_image}>
                                <img src={About} />
                            </div>
                            <div className={style.about_text}>
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
                                <div className={style.about_services}>
                                    <div className={style.s_1}>
                                        <i class="fa-solid fa-truck-fast"></i>
                                        <Link to="#">Fast Delivery</Link>
                                    </div>
                                    <div className={style.s_1}>
                                        <i class="fa-brands fa-amazon-pay"></i>
                                        <Link to="#">Easy Payment</Link>
                                    </div>
                                    <div className={style.s_1}>
                                        <i class="fa-solid fa-headset"></i>
                                        <Link to="#">24 x 7 Services</Link>
                                    </div>
                                </div>
                                <Link to="#" className={style.about_btn}>
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