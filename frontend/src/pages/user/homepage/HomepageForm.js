import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import images from '~/assets/images'
import styles from './HomepageForm.module.scss'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ACCESS_TOKEN, apiUrl, ROLE } from '~/constants/constants';
import SurveyUSer from '~/components/Modal/SurveyUser';

const cx = classNames.bind(styles)
const HomepageForm = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const role = localStorage.getItem(ROLE);
    console.log('role:', role)
    const [listCategories, setListCategories] = useState([])
    const [topTrending, setTopTrending] = useState([])
    const [categoryRating, setRatingCategory] = useState([])
    const [topUser, setTopUser] = useState([])
    const [topCollections, setTopCollections] = useState([])
    const [topTrendingCountry, setTopTrendingCountry] = useState([])
    const navigate = useNavigate()
    const handleLoadUser = (_id) => {
        navigate(`/profile/${_id}`)
    }

    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [showSurveyUserModal, setShowSurveyUserModal] = useState(false);
    const [completedSurvey, setCompletedSurvey] = useState(false);
    useEffect(() => {
        const firstLoginStatus = localStorage.getItem('firstLogin');
        console.log('First Login Status:', firstLoginStatus);

        if (firstLoginStatus === 'true' && role === '653b77c56139d7a2604cedb9') {
            console.log('This is the first login!');
            setIsFirstLogin(true);
            setShowSurveyUserModal(true);
        } else {
            console.log('This is NOT the first login!');
        }
    }, []);

    const closeModal = () => {
        setIsFirstLogin(false);
        setShowSurveyUserModal(false);
        localStorage.setItem('firstLogin', 'false');
        setCompletedSurvey(true);
    };

    const [listbanner, setListBanner] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const [response, banner] = await Promise.all([
                    axios.get(`${apiUrl}/recipe/gettoptrendingrecipe`),
                    axios.get(`${apiUrl}/userpackage/getBanner`),
                ])
                if (response.data.success) {
                    setListCategories(response.data.listCategory)
                    setTopTrending(response.data.topTrending)
                    const cateRate = response.data.categoryRating
                    response.data.categoryRating.map((cate, index) => (
                        response.data.listCategory.map((categoryWithImg) => {
                            if (cate.category == categoryWithImg.name) cateRate[index] = { ...cate, image: categoryWithImg.image }
                        })
                    ))
                    setTopTrendingCountry(response.data.trendingCountry)
                    // console.log("log ne", response.data.trendingCountry)



                    setTopUser(response.data.topUser)
                    setRatingCategory(cateRate)
                    setTopCollections(response.data.topCollections)
                }
                if (banner.data.success && banner.data.data.length > 0) {
                    setListBanner(banner.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])



    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/recipe/gettoptrendingrecipe`)
                if (response.data.success) {
                    setListCategories(response.data.listCategory)
                    setTopTrending(response.data.topTrending)
                    const cateRate = response.data.categoryRating
                    response.data.categoryRating.map((cate, index) => (
                        response.data.listCategory.map((categoryWithImg) => {
                            if (cate.category == categoryWithImg.name) cateRate[index] = { ...cate, image: categoryWithImg.image }
                        })
                    ))
                    setTopTrendingCountry(response.data.trendingCountry)
                    // console.log("helo", response.data.trendingCountry)
                    setTopUser(response.data.topUser)
                    setRatingCategory(cateRate)
                    setTopCollections(response.data.topCollections)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    console.log(listbanner)

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
                                            <p className={cx('carousel-text')}>A meal is not just a gathering; it's a practical plan for innovation and creativity in the kitchen.</p>
                                            <h3 className={cx('carousel')} >Prepare Meals</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item interval={500}>
                                        <img
                                            className={cx('background_slide')}
                                            src={images.Background_slide1}
                                            alt="Image Two"
                                        />
                                        <Carousel.Caption>
                                            <p className={cx('carousel-text')}>Ingredients are my notes, the kitchen is my stage, and I am the composer of exquisite flavors</p>
                                            <h3 className={cx('carousel')}>Create Recipe</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            {/* TOP RECIPE có lượt đánh giá tốt nhất  */}
                            <div className={cx('recipe_contain')}>
                                <div className={cx('recipe_card')}>
                                    <ul className={cx('img_carousel')}>
                                        {topTrendingCountry.length > 0 && topTrendingCountry.map((category) => (
                                            <li className={cx('img_carousel_item_first')}>
                                                {category._id && category._id.national.length > 0 && (
                                                    <div className={cx('card_in')}>
                                                        <Link className={cx('card_')} to={`/recipe/${category._id.category_detail[0]._id}`}>
                                                            {console.log(category._id.category_detail)}
                                                            <div className={cx('card_box_in')}>
                                                                <div className={cx('recipe_card_img')}>
                                                                    <img src={category._id.category_detail[0].image} />
                                                                </div>
                                                            </div>
                                                        </Link>

                                                        <div className={cx('card_info_wrapper')}>
                                                            <div className={cx('card_name')}>
                                                                <Link className={cx('card_title')} to="#">{category._id.category.toUpperCase()}</Link>
                                                                <span className={cx('card_source')}>
                                                                    <Link className={cx('card_source_link')} to="#">{category._id.national[0].toUpperCase()}</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* <div>
                                <button onClick={() => {
                                    setShowSurveyUserModal(true);
                                }}>hello</button>
                            </div> */}
                            {/* WHAT'S NEW - top article có lượt đánh giá cao nhất */}
                            <div className={cx('home_wrapper')}>
                                <div className={cx('home_article')}>
                                    <div className={cx('feature_article')}>
                                        <div className={cx('small_lists_article')}>
                                            <h3 className={cx('article_news')}>What's news</h3>
                                            {topTrending.length > 0 && topTrending.map((recipe, index) => (
                                                index > 0 && (
                                                    <Link to={`/detail/${recipe._id}`} className={cx('small_feature_article')}>
                                                        <div className={cx('img_wrapper')}>
                                                            <img src={recipe.image} />
                                                        </div>
                                                        <div className={cx('small_article_blurb')}>
                                                            <p className={cx('category_article')}>{recipe.Category}</p>
                                                            <h3 className={cx('article_title')}>{recipe.name}</h3>
                                                        </div>
                                                    </Link>
                                                )
                                            ))}

                                        </div>
                                        <div className={cx('article_left')}>
                                            {
                                                topTrending.length > 0 && (
                                                    <Link to={`/detail/${topTrending[0]._id}`} className={cx('article_hidden_description')}>
                                                        <div className={cx('img_wrapper')}>
                                                            <img className={cx('feature_article_image')} src={topTrending[0].image} />
                                                        </div>
                                                        <div className={cx('article_blurb')}>
                                                            <p className={cx('category_article')}>{topTrending[0].Category}</p>
                                                            <h2 className={cx('article_title')}>{topTrending[0].name}</h2>
                                                            <p></p>
                                                        </div>
                                                    </Link>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WHAT WE'RE CRAVING - top 3 recipe có lượt luu cao nhất */}
                            <div className={cx('news_container')} >
                                <h2>WHAT WE'RE CRAVING</h2>
                                <div className={cx('news_name')}>
                                    {topCollections.length > 0 && topCollections.map((recipe, index) => (
                                        <div className={cx('news_gird')}>
                                            <Link to="#" className={cx(`news_element${(index > 0) ? index : ''}`)}>

                                                <div className={cx('news_card_img')}>
                                                    <figure className={cx('news_img_background')}>
                                                        <img src={recipe.image} />
                                                    </figure>

                                                </div>
                                                <div className={cx('news_card_bottom')}>
                                                    <span className={cx('news_cate')}>{recipe.Category.toUpperCase()}</span>
                                                    <h3 className={cx('news_title')}>{recipe.name}</h3>
                                                </div>
                                                <div className={cx('news_view')}>
                                                    <Link to={`/detail/${recipe._id}`} className={cx('news_detail')}>Detail</Link>
                                                </div>

                                            </Link>
                                        </div>
                                    ))}


                                </div>
                            </div>

                            {/* EXPLORE MORE _ CATEGORY  */}
                            <div className={cx('cate_contain')}>
                                <h2>Explore more</h2>
                                <div className={cx('cate_gird')}>
                                    {listCategories.length > 0 && listCategories.map((category, index) => (
                                        index < 5 && (
                                            <div className={cx('cate_img_block')}>
                                                <Link to={`/recipe/${category._id}`} className={cx('cate_img')}>
                                                    <img src={category.image} />
                                                </Link>
                                                <Link to={`/recipe/${category._id}`} className={cx('cate_title')}>{category.name}</Link>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                            <div className={cx('line')}></div>

                            {/* BANNER ADS */}
                            <div className={cx('advertisement')}>
                                <div className={cx('advertisement_container')}>
                                    <div className={cx('advertisement_gird')}>


                                        <img className={cx('img-banner')} src={listbanner.length > 0 ? listbanner[0].image : ''} />




                                        <div className={cx('advertisement_box')}>
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
                                            {categoryRating.length > 0 && categoryRating.map((category) => (
                                                <li className={cx('img_carousel_item')}>
                                                    <div className={cx('recipe_card_info')}>
                                                        <div className={cx('card_in')}>
                                                            <Link className={cx('card_')} >
                                                                <div className={cx('card_box_in')}>
                                                                    <div className={cx('recipe_card_top')}>
                                                                        <img src={category.image} />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className={cx('card_info_wrapper')}>
                                                                <div className={cx('card_name_cate')}>
                                                                    <Link className={cx('card_title_cate')} >{category.category.toUpperCase()}</Link>
                                                                    <span className={cx('card_source')}>
                                                                        <Link className={cx('card_source_link')} ></Link>
                                                                    </span>
                                                                    <Link to="#" className={cx('review_stars')}>
                                                                        <span className={cx('icon_stars')}>
                                                                            <div>
                                                                                {/* <span>{avg}</span> */}
                                                                                <span class={(category.avg >= 1) ?
                                                                                    "bi bi-star-fill text-warning" : ((category.avg == 0) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                                                <span class={(category.avg >= 2) ?
                                                                                    "bi bi-star-fill text-warning" : ((category.avg == 1 || category.avg < 1) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                                                <span class={(category.avg >= 3) ?
                                                                                    "bi bi-star-fill text-warning" : ((category.avg == 2 || category.avg < 2) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                                                <span class={(category.avg >= 4) ?
                                                                                    "bi bi-star-fill text-warning" : ((category.avg == 3 || category.avg < 3) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                                                <span class={(category.avg == 5) ?
                                                                                    "bi bi-star-fill text-warning" : ((category.avg == 4 || category.avg < 4) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                                            </div>
                                                                        </span>
                                                                        <span className={cx('count_rate')}> - {category.ratingCount} rating</span>
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
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* CUSTOMER REVIEW  */}
                            <div className={cx('team')}>
                                <h1>Top<span>Account</span></h1>
                                <div className={cx('team_box')}>
                                    {topUser.length > 0 && topUser.map((user) => (
                                        <div className={cx('profile')}>
                                            <img onClick={() => handleLoadUser(user.user[0]._id)} src={user.user[0].avatar} />
                                            <div className={cx('info')}>
                                                <h2 className={cx('name')}>{user.user[0].name}</h2>
                                                <p className={cx('bio')}> Avage rating: {(user.rating) ? user.rating : 0}</p>
                                                <p className={cx('bio')}> Total recipes: {user.recipeCount}</p>
                                                <div className={cx('team_icon')}>
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
                                    ))}
                                </div>
                            </div>
                        </section >
                    </div >
                </div >
                {/* <FooterForm /> */}
            </div >
            {showSurveyUserModal && (
                <SurveyUSer
                    setShowSurveyUserModal={setShowSurveyUserModal}
                    onComplete={closeModal}
                />
            )}
        </body >
    )
}

export default HomepageForm

