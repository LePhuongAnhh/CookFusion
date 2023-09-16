import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

import style from './HomepageForm.module.css'
import { Link } from 'react-router-dom'
import Navigation from '../header/Navigation'
import Sidebar from '../header/Sidebar'
import RecipeForm from '../header/RecipeForm'
import FooterForm from '../footer/FooterForm'
import Button_save from '../header/Button_save'

import Background_slide from "../../../image/background_slide.webp"
import Background_slide1 from "../../../image/background_slide2.webp"
import Background from '../../../image/background1.webp'
import img_article from "../../../image/background.jpg"
import article from "../../../image/article.webp"
import article2 from "../../../image/article2.webp"
import article3 from "../../../image/article3.webp"
import Top from "../../../image/topraucu.webp"
import Top2 from "../../../image/top2.webp"
import Top3 from "../../../image/top3.webp"
import Top4 from "../../../image/top4.webp"
import anh from "../../../image/anho.webp"
import Anh2 from "../../../image/anh2.webp"
import Anh3 from "../../../image/anh3.webp"
import t1 from "../../../image/1.webp"
import t2 from "../../../image/2.webp"
import t3 from "../../../image/3.webp"
import t4 from "../../../image/4.webp"
import TopRecipe from "../../../image/toprecipe.webp"
import Meal from "../../../image/mal.webp"
import Avt from "../../../image/avt.jpg"


const HomepageForm = () => {

    return (
        <body>
            <div>
                <Navigation />
                <div className={style.home_body}>
                    <Button_save />
                    <div className={style.home_container}>
                        <section className={style.home_gird}>
                            {/* Slide  */}
                            <div className={style.home_slideshow}>
                                <Carousel>
                                    <Carousel.Item interval={1500}>
                                        <img
                                            className={style.background_slide}
                                            src={Background_slide}
                                            alt="Image One"
                                        />
                                        <Carousel.Caption>
                                            <h3>Label for first slide</h3>
                                            <p>Prepare Meals</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item interval={500}>
                                        <img
                                            className={style.background_slide}
                                            src={Background_slide1}
                                            alt="Image Two"
                                        />
                                        <Carousel.Caption>
                                            <h3>Label for second slide</h3>
                                            <p>Prepare Meals</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>


                            {/* TOP RECIPE có lượt đánh giá tốt nhất  */}
                            <div className={style.recipe_contain}>
                                <div className={style.recipe_contain_box}>
                                    <div className={style.recipe_card}>
                                        <ul className={style.img_carousel}>
                                            <li className={style.img_carousel_item}>
                                                <div className={style.recipe_card_info}>
                                                    <div className={style.card_in}>
                                                        <Link className={style.card_} to="#">
                                                            <div className={style.card_box_in}>
                                                                <div className={style.recipe_card_img}>
                                                                    <img src={t1} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={style.img_carousel_item}>
                                                <div className={style.recipe_card_info}>
                                                    <div className={style.card_in}>
                                                        <Link className={style.card_} to="#">
                                                            <div className={style.card_box_in}>
                                                                <div className={style.recipe_card_img}>
                                                                    <img src={t2} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={style.img_carousel_item}>
                                                <div className={style.recipe_card_info}>
                                                    <div className={style.card_in}>
                                                        <Link className={style.card_} to="#">
                                                            <div className={style.card_box_in}>
                                                                <div className={style.recipe_card_img}>
                                                                    <img src={t3} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={style.img_carousel_item}>
                                                <div className={style.recipe_card_info}>
                                                    <div className={style.card_in}>
                                                        <Link className={style.card_} to="#">
                                                            <div className={style.card_box_in}>
                                                                <div className={style.recipe_card_img}>
                                                                    <img src={t4} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* WHAT'S NEW - top article có lượt đánh giá cao nhất */}
                            <div className={style.home_wrapper}>
                                <div className={style.home_article}>
                                    <div className={style.feature_article}>
                                        <div className={style.small_lists_article}>
                                            <h3 className={style.article_news}>What's news</h3>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={article} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={article2} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={article3} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className={style.article_left}>
                                            <Link to="#" className={style.article_hidden_description}>
                                                <div className={style.img_wrapper}>
                                                    <img className={style.feature_article_image} src={Background} />
                                                </div>
                                                <div className={style.article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h2 className={style.article_title}>Thready, Set, Go! A Saffron Guide</h2>
                                                    <p></p>
                                                </div>
                                            </Link>
                                        </div>



                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>

                            {/* WHAT WE'RE CRAVING - top 3 recipe có lượt view/tìm kiếm cao nhất */}
                            <div className={style.news_container} >
                                <div className={style.news_name}>
                                    <h2>WHAT WE'RE CRAVING</h2>
                                    <div className={style.news_gird}>
                                        <Link to="#" className={style.news_element}>
                                            <div>
                                                <div className={style.news_card_img}>
                                                    <figure className={style.news_img_background}>
                                                        <img src={anh} />
                                                    </figure>

                                                </div>
                                                <div className={style.news_card_bottom}>
                                                    <span className={style.news_cate}>Fresh everyday</span>
                                                    <h3 className={style.news_title}>Best Bread</h3>
                                                </div>
                                                <div className={style.news_view}>
                                                    <Link to="#" className={style.news_detail}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.news_gird}>
                                        <Link to="#" className={style.news_element1}>
                                            <div>
                                                <div className={style.news_card_img}>
                                                    <figure className={style.news_img_background}>
                                                        <img src={Anh2} />
                                                    </figure>

                                                </div>
                                                <div className={style.news_card_bottom}>
                                                    <span className={style.news_cate}>Fresh everyday</span>
                                                    <h3 className={style.news_title}>Best Bread</h3>
                                                </div>
                                                <div className={style.news_view}>
                                                    <Link to="#" className={style.news_detail}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.news_gird}>
                                        <Link to="#" className={style.news_element2}>
                                            <div>
                                                <div className={style.news_card_img}>
                                                    <figure className={style.news_img_background}>
                                                        <img src={Anh3} />
                                                    </figure>

                                                </div>
                                                <div className={style.news_card_bottom}>
                                                    <span className={style.news_cate}>Fresh everyday</span>
                                                    <h3 className={style.news_title}>Best Bread</h3>
                                                </div>
                                                <div className={style.news_view}>
                                                    <Link to="#" className={style.news_detail}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                </div>
                            </div>

                            {/* EXPLORE MORE */}
                            <div className={style.cate_contain}>
                                <div className={style.cate_gird}>
                                    <h2>Explore more</h2>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={Top} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={Top2} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={Top3} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>Vegetable</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={Top4} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>Vegetable</Link>
                                    </div>
                                </div>
                            </div>
                            <div className={style.line}></div>



                            {/* TOP RECIPE  */}
                            <div className={style.contain_fullwidth}>
                                <div className={style.contain_fullwidth_card}>
                                    <div className={style.text_image}>
                                        <img src={TopRecipe} />
                                    </div>
                                    <div className={style.text_bottom}>
                                        <h2> Top recipe</h2>
                                        <Link to="#" className={style.btn_view}>
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>


                            {/* NGUYEN LIEU  */}
                            <div className={style.ingredients}>
                                <div className={style.ingredients_gird}>
                                    <h2>ingredients</h2>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* TRENDING NOW */}
                            <div className={style.content_show}>
                                <div className={style.box}>
                                    <div className={style.recipe_card}>
                                        <h2>trending now</h2>
                                        <RecipeForm />
                                    </div>
                                </div>
                            </div>

                            {/* ADVERTISEMENT  */}
                            <div className={style.advertisement}>
                                <div className={style.advertisement_container}>
                                    <div className={style.advertisement_gird}>
                                        <div className={style.advertisement_carousel}>
                                            {/* <img src={Background_slide} /> */}
                                        </div>
                                        <div className={style.advertisement_box}>
                                            <span>Introduction</span>
                                            <h3 className={style.name_h1}> Quang cao </h3>
                                            <div className={style.show_more}>
                                                <Link to="#" className={style.btn_show_more}> Show more</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={style.gallary} id="Gallary">
                                <h1>Our<span>Gallary</span></h1>

                                <div className={style.gallary_image_box}>
                                    <div className={style.gallary_image}>
                                        <img src={Top2} />

                                        <h3>Food</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi sint eveniet laboriosam
                                        </p>
                                        <Link to="#" className={style.gallary_btn}>Order Now</Link>
                                    </div>

                                    <div className={style.gallary_image}>
                                        <img src={Top2} />

                                        <h3>Food</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi sint eveniet laboriosam
                                        </p>
                                        <Link to="#" className={style.gallary_btn}>Order Now</Link>
                                    </div>

                                    <div className={style.gallary_image}>
                                        <img src={Top2} />

                                        <h3>Food</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi sint eveniet laboriosam
                                        </p>
                                        <Link to="#" className={style.gallary_btn}>Order Now</Link>
                                    </div>

                                    <div className={style.gallary_image}>
                                        <img src={Top2} />

                                        <h3>Food</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi sint eveniet laboriosam
                                        </p>
                                        <Link to="#" className={style.gallary_btn}>Order Now</Link>
                                    </div>

                                    <div className={style.gallary_image}>
                                        <img src={Top2} />

                                        <h3>Food</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi sint eveniet laboriosam
                                        </p>
                                        <Link to="#" className={style.gallary_btn}>Order Now</Link>
                                    </div>

                                    <div className={style.gallary_image}>
                                        <img src={Top2} />

                                        <h3>Food</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi sint eveniet laboriosam
                                        </p>
                                        <a href="#" className={style.gallary_btn}>Order Now</a>
                                    </div>

                                </div>

                            </div>

                            {/* CUSTOMER REVIEW  */}

                            <div className={style.review} id="Review">
                                <h1>Customer<span>Review</span></h1>

                                <div className={style.review_box}>
                                    <div className={style.review_card}>

                                        <div className={style.review_profile}>
                                            <img src={Avt} />
                                        </div>

                                        <div className={style.review_tex}>
                                            <h2 className={style.name}>John Deo</h2>
                                            <div className={style.review_icon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                                                    <path d="M320 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L320.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L320.1 439.8 191.8 508.3C181 514 167.9 513.1 158 506s-14.9-19.3-12.9-31.3L169.8 329 65.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L227 150.3 291.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L470.5 329l24.6 145.7z" />
                                                </svg>
                                            </div>

                                            <div className={style.review_social}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            
                                            </div>

                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci. </p>                                         </div>

                                    </div>

                                    <div className={style.review_card}>

                                        <div className={style.review_profile}>
                                            {/* <img src="image/review_1.png"/> */}
                                        </div>

                                        <div className={style.review_tex}>
                                            <h2 className={style.name}>John Deo</h2>

                                            <div className={style.review_icon}>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star-half-stroke"></i>
                                            </div>

                                            <div className={style.review_social}>
                                                <i className="fa-brands fa-facebook-f"></i>
                                                <i className="fa-brands fa-instagram"></i>
                                                <i className="fa-brands fa-twitter"></i>
                                                <i className="fa-brands fa-linkedin-in"></i>
                                            </div>

                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci, rem corrupti
                                                asperiores distinctio delectus quae quia tenetur totam laboriosam quam. Lorem ipsum,
                                                dolor sit amet consectetur adipisicing elit. Dolores soluta ullam ipsa voluptates
                                                repudiandae dignissimos deleniti mollitia eum. Laudantium placeat velit nemo illo
                                                pariatur. Fuga aperiam impedit illo atque repellendus!
                                            </p>

                                        </div>

                                    </div>
                                    <div className={style.review_card}>

                                        <div className={style.review_profile}>
                                            {/* <img src="image/review_1.png"/> */}
                                        </div>

                                        <div className={style.review_tex}>
                                            <h2 className={style.name}>John Deo</h2>

                                            <div className={style.review_icon}>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star-half-stroke"></i>
                                            </div>

                                            <div className={style.review_social}>
                                                <i className="fa-brands fa-facebook-f"></i>
                                                <i className="fa-brands fa-instagram"></i>
                                                <i className="fa-brands fa-twitter"></i>
                                                <i className="fa-brands fa-linkedin-in"></i>
                                            </div>

                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci, rem corrupti
                                                asperiores distinctio delectus quae quia tenetur totam laboriosam quam. Lorem ipsum,
                                                dolor sit amet consectetur adipisicing elit. Dolores soluta ullam ipsa voluptates
                                                repudiandae dignissimos deleniti mollitia eum. Laudantium placeat velit nemo illo
                                                pariatur. Fuga aperiam impedit illo atque repellendus!
                                            </p>

                                        </div>

                                    </div>
                                    <div className={style.review_card}>

                                        <div className={style.review_profile}>
                                            {/* <img src="image/review_1.png"/> */}
                                        </div>

                                        <div className={style.review_tex}>
                                            <h2 className={style.name}>John Deo</h2>

                                            <div className={style.review_icon}>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star-half-stroke"></i>
                                            </div>

                                            <div className={style.review_social}>
                                                <i className="fa-brands fa-facebook-f"></i>
                                                <i className="fa-brands fa-instagram"></i>
                                                <i className="fa-brands fa-twitter"></i>
                                                <i className="fa-brands fa-linkedin-in"></i>
                                            </div>

                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci, rem corrupti
                                                asperiores distinctio delectus quae quia tenetur totam laboriosam quam. Lorem ipsum,
                                                dolor sit amet consectetur adipisicing elit. Dolores soluta ullam ipsa voluptates
                                                repudiandae dignissimos deleniti mollitia eum. Laudantium placeat velit nemo illo
                                                pariatur. Fuga aperiam impedit illo atque repellendus!
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>
                    </div>
                </div>
                {/* <FooterForm />   */}
            </div>
        </body>
    )
}

export default HomepageForm

