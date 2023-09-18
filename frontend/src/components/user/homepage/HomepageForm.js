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
import Main from "../../../image/main_img.png"


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
                                <h2>WHAT WE'RE CRAVING</h2>
                                <div className={style.news_name}>
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
                                            <span>
                                                <Link to="#" className={style.show_more}> Show more</Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CUSTOMER REVIEW  */}
                            <div className={style.review}>
                                <h1>Customer<span>Review</span></h1>
                                <div className={style.review_box}>
                                    <div className={style.review_card}>
                                        <div className={style.review_profile}>
                                            <img src={Avt} />
                                            <h2 className={style.name}>John Deo</h2>
                                            <div className={style.review_icon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                                                </svg>
                                            </div>
                                            <div className={style.review_social}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={style.review_tex}>
                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={style.review_card}>
                                        <div className={style.review_profile}>
                                            <img src={Avt} />
                                            <h2 className={style.name}>John Deo</h2>
                                            <div className={style.review_icon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                                                </svg>
                                            </div>
                                            <div className={style.review_social}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={style.review_tex}>
                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={style.review_card}>
                                        <div className={style.review_profile}>
                                            <img src={Avt} />
                                            <h2 className={style.name}>John Deo</h2>
                                            <div className={style.review_icon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                                                </svg>
                                            </div>
                                            <div className={style.review_social}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={style.review_tex}>
                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={style.review_card}>
                                        <div className={style.review_profile}>
                                            <img src={Avt} />
                                            <h2 className={style.name}>John Deo</h2>
                                            <div className={style.review_icon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                                                </svg>
                                            </div>
                                            <div className={style.review_social}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={style.review_tex}>
                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section >
                    </div >
                </div >
                {/* <FooterForm />   */}
            </div >
        </body >
    )
}

export default HomepageForm

