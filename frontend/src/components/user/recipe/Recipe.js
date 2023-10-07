import style from './Recipe.module.css'
import { Link } from 'react-router-dom'
import Navigation from '../header/Navigation'
import FooterForm from '../footer/FooterForm'
import Button_save from '../header/Button_save'
import RecipeForm from './RecipeForm'
import img_article from "../../../image/background.jpg"
import thikhtao from "../../../image/thit-kho-tau-mien-nam.jpg"
import breakfast from "../../../image/brafast.png"
import meal from "../../../image/meal.jpg"
// import anh1 from "../../../image/anh1.jpg"
import vegetable from "../../../image/vegetable.jpg"
import Avt from "../../../image/avt.jpg"

import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import Top from "../../../image/topraucu.webp"
import Top2 from "../../../image/top2.webp"
import Top3 from "../../../image/top3.webp"
import Top4 from "../../../image/top4.webp"


const Recipe = () => {
    return (
        <div>
            <div><Navigation /></div>

            <div className={style.browse}>
                <Button_save />
                <div className={style.right}>
                    <div className={style.top}>
                        <div className={style.breadcrumb_container}>
                            <nav className={style.breadcrumb}>
                                <span className={style.breadcrumb_link}>
                                    <Link to="/homepage">Home</Link>
                                </span>
                                <span className={style.breadcrumb_separator}>/</span>
                                <span className={style.breadcrumb_link}>
                                    <Link to="#" title>Recipe</Link>
                                </span>
                            </nav>
                        </div>
                    </div>
                    <div className={style.name_recipe}>
                        <h1 >Recipe</h1>
                    </div>

                    {/* ben duwoi  */}
                    <div className={style.gird}>
                        <div className={style.gallery}>
                            <div className={style.card_top}>
                                <Link to="/detail" className={style.figure}>
                                    <img src={breakfast} />
                                    <div className={style.figcaption}>
                                        <div className={style.content_in}>
                                            <p>Hello</p>
                                            <h2>Title recipe</h2>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={style.gallery1}>
                            <div className={style.g_card}>
                                <Link to="/detail" className={style.figure}>
                                    <img src={thikhtao} />
                                    <div className={style.figcaption}>
                                        <div className={style.content_in}>
                                            <p>Hello</p>
                                            <h2>Title recipe</h2>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.g_card}>
                                <Link to="/detail" className={style.figure}>
                                    <img src={thikhtao} />
                                    <div className={style.figcaption}>
                                        <div className={style.content_in}>
                                            <p>Hello</p>
                                            <h2>Title recipe</h2>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={style.gallery_text}>
                            <div className={style.text}>
                                <h2> Breakfast on the go</h2>

                            </div>
                            <p>
                                Check out one of my absolute favorite recipes right now! Full recipe on the blog.
                            </p>
                        </div>
                    </div>


                    {/* Introduction of Recipe */}
                    <div className={style.summary}>
                        <div className={style.summary_contain}>
                            <span>
                                <h2 className={style.summary_title}>Introduction of Recipe</h2>
                                <p>
                                    People cook for many reasons. At Yummly, we do it for the love of food, and we want to help you and other home cooks discover and demystify dishes that pique your culinary curiosities -- whatever the driving force behind cooking is for you. Whether your economic strategy is motivated by gastronomic delights or your dietary restrictions are guiding your kitchen creations,  there are thousands of recipes to explore.
                                </p>
                                <p className={style.summary_add}>We've broken down the elements of cooking to make it simple…
                                </p>
                            </span>
                            {/* <span className={style.summary_readless}>Read less</span> */}
                        </div>
                    </div>

                    {/* INGRS  */}
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
                            <div className={style.cate_img_block}>
                                <Link to="#" className={style.cate_img}>
                                    <img src={Top2} />
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
                                    <img src={Top2} />
                                </Link>
                                <Link to="#" className={style.cate_title}>INTERNATIONAL EATS</Link>
                            </div>
                        </div>
                    </div>

                    <div className={style.blog}>
                        <h1>Our<span>Blog</span></h1>
                        <div className={style.blog_box}>
                            <RecipeForm />
                            <RecipeForm />
                            <RecipeForm />
                        </div>
                    </div>
                    {/* TOP ACCOUNT  */}
                    <div className={style.team}>
                        <h1>Top<span>Account</span></h1>
                        <div className={style.team_box}>
                            <div className={style.profile}>
                                <img src={Avt} />
                                <div className={style.info}>
                                    <h2 className={style.name}>Chef</h2>
                                    <p className={style.bio}> Avage rating: 4.9</p>
                                    <p className={style.bio}> Total recipes: 1240</p>
                                    <div className={style.team_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={style.profile}>
                                <img src={Avt} />
                                <div className={style.info}>
                                    <h2 className={style.name}>Chef</h2>
                                    <p className={style.bio}> Avage rating: 4.9</p>
                                    <p className={style.bio}> Total recipes: 1240</p>
                                    <div className={style.team_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div className={style.profile}>
                                <img src={Avt} />
                                <div className={style.info}>
                                    <h2 className={style.name}>Chef</h2>
                                    <p className={style.bio}> Avage rating: 4.9</p>
                                    <p className={style.bio}> Total recipes: 1240</p>
                                    <div className={style.team_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={style.profile}>
                                <img src={Avt} />
                                <div className={style.info}>
                                    <h2 className={style.name}>Chef</h2>
                                    <p className={style.bio}> Avage rating: 4.9</p>
                                    <p className={style.bio}> Total recipes: 1240</p>
                                    <div className={style.team_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512">
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512">
                                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEW RECIPE  */}
                </div>
            </div>
        </div>
    )
}

export default Recipe