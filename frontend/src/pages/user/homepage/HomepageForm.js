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


                            {/* EXPLORE MORE _ CATEGORY  */}
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

                            TOP RECIPE  
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
                                                                    <img src={images.Background} />
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

                            {/* CUSTOMER REVIEW  */}

                        </section >
                    </div >
                </div >
                {/* <FooterForm /> */}
            </div >
        </body >
    )
}

export default HomepageForm

