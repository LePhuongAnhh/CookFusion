import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import images from '~/assets/images'
import styles from './HomepageForm.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
const HomepageForm = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return (
        <body>
            <div>
                <div className={cx('home_body')}>
                    <div className={cx('home_container')}>
                        <section className={cx('home_gird')}>
                            {/* Slide  */}
                            <div className={cx('home_slideshow')}>
                                <Carousel>
                                    <Carousel.Item interval={1500}>
                                        <img
                                            className={cx('background_slide')}
                                            src={images.Background_slide}
                                            alt="Image One"
                                        />
                                        <Carousel.Caption>
                                            <h3>Label for first slide</h3>
                                            <p>Prepare Meals</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item interval={500}>
                                        <img
                                            className={cx('background_slide')}
                                            src={images.Background_slide1}
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
                            <div className={cx('recipe_contain')}>
                                <div className={cx('recipe_contain_box')}>
                                    <div className={cx('recipe_card')}>
                                        <ul className={cx('img_carousel')}>
                                            <li className={cx('img_carousel_item_first')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.t1} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={cx('img_carousel_item_first')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.t2} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={cx('img_carousel_item_first')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.t3} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={cx('img_carousel_item_first')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.t4} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
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
                            <div className={cx('home_wrapper')}>
                                <div className={cx('home_article')}>
                                    <div className={cx('feature_article')}>
                                        <div className={cx('small_lists_article')}>
                                            <h3 className={cx('article_news')}>What's news</h3>
                                            <Link to="#" className={cx('small_feature_article')}>
                                                <div className={cx('img_wrapper')}>
                                                    <img src={images.article} />
                                                </div>
                                                <div className={cx('small_article_blurb')}>
                                                    <p className={cx('category_article')}>Recipe roundup</p>
                                                    <h3 className={cx('article_title')}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={cx('small_feature_article')}>
                                                <div className={cx('img_wrapper')}>
                                                    <img src={images.article2} />
                                                </div>
                                                <div className={cx('small_article_blurb')}>
                                                    <p className={cx('category_article')}>Recipe roundup</p>
                                                    <h3 className={cx('article_title')}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={cx('small_feature_article')}>
                                                <div className={cx('img_wrapper')}>
                                                    <img src={images.article3} />
                                                </div>
                                                <div className={cx('small_article_blurb')}>
                                                    <p className={cx('category_article')}>Recipe roundup</p>
                                                    <h3 className={cx('article_title')}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className={cx('article_left')}>
                                            <Link to="#" className={cx('article_hidden_description')}>
                                                <div className={cx('img_wrapper')}>
                                                    <img className={cx('feature_article_image')} src={images.Background} />
                                                </div>
                                                <div className={cx('article_blurb')}>
                                                    <p className={cx('category_article')}>Recipe roundup</p>
                                                    <h2 className={cx('article_title')}>Thready, Set, Go! A Saffron Guide</h2>
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
                            <div className={cx('news_container')} >
                                <h2>WHAT WE'RE CRAVING</h2>
                                <div className={cx('news_name')}>
                                    <div className={cx('news_gird')}>
                                        <Link to="#" className={cx('news_element')}>
                                            <div>
                                                <div className={cx('news_card_img')}>
                                                    <figure className={cx('news_img_background')}>
                                                        <img src={images.anh} />
                                                    </figure>

                                                </div>
                                                <div className={cx('news_card_bottom')}>
                                                    <span className={cx('news_cate')}>Fresh everyday</span>
                                                    <h3 className={cx('news_title')}>Best Bread</h3>
                                                </div>
                                                <div className={cx('news_view')}>
                                                    <Link to="#" className={cx('news_detail')}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('news_gird')}>
                                        <Link to="#" className={cx('news_element1')}>
                                            <div>
                                                <div className={cx('news_card_img')}>
                                                    <figure className={cx('news_img_background')}>
                                                        <img src={images.Anh2} />
                                                    </figure>

                                                </div>
                                                <div className={cx('news_card_bottom')}>
                                                    <span className={cx('news_cate')}>Fresh everyday</span>
                                                    <h3 className={cx('news_title')}>Best Bread</h3>
                                                </div>
                                                <div className={cx('news_view')}>
                                                    <Link to="#" className={cx('news_detail')}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('news_gird')}>
                                        <Link to="#" className={cx('news_element2')}>
                                            <div>
                                                <div className={cx('news_card_img')}>
                                                    <figure className={cx('news_img_background')}>
                                                        <img src={images.Anh3} />
                                                    </figure>

                                                </div>
                                                <div className={cx('news_card_bottom')}>
                                                    <span className={cx('news_cate')}>Fresh everyday</span>
                                                    <h3 className={cx('news_title')}>Best Bread</h3>
                                                </div>
                                                <div className={cx('news_view')}>
                                                    <Link to="#" className={cx('news_detail')}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* EXPLORE MORE */}
                            <div className={cx('cate_contain')}>
                                <div className={cx('cate_gird')}>
                                    <h2>Explore more</h2>
                                    <div className={cx('cate_img_block')}>
                                        <Link to="#" className={cx('cate_img')}>
                                            <img src={images.Top} />
                                        </Link>
                                        <Link to="#" className={cx('cate_title')}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={cx('cate_img_block')}>
                                        <Link to="#" className={cx('cate_img')}>
                                            <img src={images.Top2} />
                                        </Link>
                                        <Link to="#" className={cx('cate_title')}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={cx('cate_img_block')}>
                                        <Link to="#" className={cx('cate_img')}>
                                            <img src={images.Top3} />
                                        </Link>
                                        <Link to="#" className={cx('cate_title')}>Vegetable</Link>
                                    </div>
                                    <div className={cx('cate_img_block')}>
                                        <Link to="#" className={cx('cate_img')}>
                                            <img src={images.Top4} />
                                        </Link>
                                        <Link to="#" className={cx('cate_title')}>Vegetable</Link>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('line')}></div>

                            {/* TOP RECIPE  */}
                            <div className={cx('contain_fullwidth')}>
                                <div className={cx('contain_fullwidth_card')}>
                                    <div className={cx('text_image')}>
                                        <img src={images.TopRecipe} />
                                    </div>
                                    <div className={cx('text_bottom')}>
                                        <h2> Top recipe</h2>
                                        <Link to="#" className={cx('btn_view')}>
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* NGUYEN LIEU  */}
                            <div className={cx('ingredients')}>
                                <div className={cx('ingredients_gird')}>
                                    <h2>ingredients</h2>
                                    <div className={cx('ingredients_card')}>
                                        <Link to="#" className={cx('ingredients_img')}>
                                            <img src={images.Meal} />
                                            <div className={cx('ingredients_img_card')}>
                                                <Link to="#" className={cx('ingredients_link')}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('ingredients_card')}>
                                        <Link to="#" className={cx('ingredients_img')}>
                                            <img src={images.Meal} />
                                            <div className={cx('ingredients_img_card')}>
                                                <Link to="#" className={cx('ingredients_link')}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('ingredients_card')}>
                                        <Link to="#" className={cx('ingredients_img')}>
                                            <img src={images.Meal} />
                                            <div className={cx('ingredients_img_card')}>
                                                <Link to="#" className={cx('ingredients_link')}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('ingredients_card')}>
                                        <Link to="#" className={cx('ingredients_img')}>
                                            <img src={images.Meal} />
                                            <div className={cx('ingredients_img_card')}>
                                                <Link to="#" className={cx('ingredients_link')}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('ingredients_card')}>
                                        <Link to="#" className={cx('ingredients_img')}>
                                            <img src={images.Meal} />
                                            <div className={cx('ingredients_img_card')}>
                                                <Link to="#" className={cx('ingredients_link')}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('ingredients_card')}>
                                        <Link to="#" className={cx('ingredients_img')}>
                                            <img src={images.Meal} />
                                            <div className={cx('ingredients_img_card')}>
                                                <Link to="#" className={cx('ingredients_link')}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* TRENDING NOW */}
                            <div className={cx('content_show')}>
                                <div className={cx('box')}>
                                    <div className={cx('recipe_card')}>
                                        <h2>trending now</h2>
                                        <ul className={cx('img_carousel')}>
                                            <li className={cx('img_carousel_item')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.Recipe} />
                                                                    <div className={cx('btn_save')}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
                                                                            <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
                                                                </span>
                                                                <Link to="#" className={cx('review_stars')}>
                                                                    <span className={cx('icon_stars')}>
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                    </span>
                                                                    <span className={cx('count_rate')}> (134)</span>
                                                                </Link>
                                                            </div>


                                                        </div>
                                                        <div className={cx('cook')}>
                                                            <button> Cook now

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={cx('img_carousel_item')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.Recipe} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
                                                                </span>
                                                                <Link to="#" className={cx('review_stars')}>
                                                                    <span className={cx('icon_stars')}>
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                    </span>
                                                                    <span className={cx('count_rate')}> (134)</span>
                                                                </Link>
                                                            </div>


                                                        </div>
                                                        <div className={cx('cook')}>
                                                            <button> Cook now

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={cx('img_carousel_item')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.Recipe} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
                                                                </span>
                                                                <Link to="#" className={cx('review_stars')}>
                                                                    <span className={cx('icon_stars')}>
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                    </span>
                                                                    <span className={cx('count_rate')}> (134)</span>
                                                                </Link>
                                                            </div>


                                                        </div>
                                                        <div className={cx('cook')}>
                                                            <button> Cook now

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={cx('img_carousel_item')}>
                                                <div className={cx('recipe_card_info')}>
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to="#">
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={images.Recipe} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">Asian Recipe</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">VietNam</Link>
                                                                </span>
                                                                <Link to="#" className={cx('review_stars')}>
                                                                    <span className={cx('icon_stars')}>
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />
                                                                        <img src={images.stars} />

                                                                    </span>
                                                                    <span className={cx('count_rate')}> (134)</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className={cx('cook')}>
                                                            <button> Cook now

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* ADVERTISEMENT  */}
                            <div className={cx('advertisement')}>
                                <div className={cx('advertisement_container')}>
                                    <div className={cx('advertisement_gird')}>
                                        <div className={cx('advertisement_carousel')}>
                                            {/* <img src={Background_slide} /> */}
                                        </div>
                                        <div className={cx('advertisement_box')}>
                                            <span>Introduction</span>
                                            <h3 className={cx('name_h1')}> Quang cao </h3>
                                            <span>
                                                <Link to="#" className={cx('show_more')}> Show more</Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CUSTOMER REVIEW  */}
                            <div className={cx('review')}>
                                <h1>Customer<span>Review</span></h1>
                                <div className={cx('review_box')}>
                                    <div className={cx('review_card')}>
                                        <div className={cx('review_profile')}>
                                            <img src={images.Avt} />
                                            <h2 className={cx('name')}>John Deo</h2>
                                            <div className={cx('review_icon')}>
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
                                            <div className={cx('review_social')}>
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
                                        <div className={cx('review_tex')}>
                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('review_card')}>
                                        <div className={cx('review_profile')}>
                                            <img src={images.Avt} />
                                            <h2 className={cx('name')}>John Deo</h2>
                                            <div className={cx('review_icon')}>
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
                                            <div className={cx('review_social')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={cx('review_tex')}>
                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('review_card')}>
                                        <div className={cx('review_profile')}>
                                            <img src={images.Avt} />
                                            <h2 className={cx('name')}>John Deo</h2>
                                            <div className={cx('review_icon')}>
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
                                            <div className={cx('review_social')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={cx('review_tex')}>
                                            <p>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quam facere
                                                blanditiis in fugiat tempore necessitatibus aliquid. Id adipisci.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('review_card')}>
                                        <div className={cx('review_profile')}>
                                            <img src={images.Avt} />
                                            <h2 className={cx('name')}>John Deo</h2>
                                            <div className={cx('review_icon')}>
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
                                            <div className={cx('review_social')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={cx('review_tex')}>
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
                {/* <FooterForm /> */}
            </div >
        </body >
    )
}

export default HomepageForm

