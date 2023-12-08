import styles from './Recipe.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import CreateRecipe from './CreateRecipe'
import images from '~/assets/images'
import Loading from '~/components/Layout/Loading'

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
const Recipe = () => {

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [showCreateRecipeModal, setShowCreateRecipeModal] = useState(false);

    //CHINH SLIDER
    const NextArrow = (props) => (
        <div {...props} className={cx('custom-arrow next-arrow')}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );

    const PrevArrow = (props) => (
        <div {...props} className={cx('custom-arrow prev-arrow')}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: (dots) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PrevArrow />
                {dots}
                <NextArrow />
            </div>
        ),
    };
    const [topTrending, setTopTrending] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const [response] = await Promise.all([
                    axios.get(`${apiUrl}/recipe/gettoptrendingrecipe`)
                ])
                if (response.data.success) {
                    setTopTrending(response.data.topTrending)
                    console.log(response.data.topTrending)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <div>
            <div className={cx('browse')}>
                <div className={cx('floating_button')}>
                    <div className={cx('tray_row')}>
                        {accessToken && (
                            <div className={cx('save_button')}>
                                <button
                                    aria-label='Save-recipe'
                                    className={cx('button_save_recipe')}
                                    onClick={() => setShowCreateRecipeModal(true)}
                                >
                                    <span className={cx('icon_save')} title="Create Recipe">
                                        <img className={cx('add-recipe-image')} src={images.add_recipe} />
                                    </span>
                                </button>
                            </div>
                        )}

                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('top')}>
                        <div className={cx('breadcrumb_container')}>
                            <nav className={cx('breadcrumb')}>
                                <span className={cx('breadcrumb_link')}>
                                    <Link to="/homepage">Home</Link>
                                </span>
                                <span className={cx('breadcrumb_separator')}>/</span>
                                <span className={cx('breadcrumb_link')}>
                                    <Link to="#" title>Recipe</Link>
                                </span>
                            </nav>
                        </div>
                    </div>
                    <div className={cx('name_recipe')}>
                        <h1 >Recipe</h1>
                    </div>

                    {/* ben duwoi  */}
                    {topTrending.length > 2 && (
                        <div className={cx('gird')}>
                            <div className={cx('gallery')}>
                                <div className={cx('card_top')}>
                                    <Link to={`/detail/${topTrending[0]._id}`} className={cx('figure')}>
                                        <img src={topTrending[0].image} />
                                        <div className={cx('figcaption')}>
                                            <div className={cx('content_in')}>
                                                <p>{topTrending[0].Category}</p>
                                                <h2>{topTrending[0].name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('gallery1')}>
                                <div className={cx('g_card')}>
                                    <Link to={`/detail/${topTrending[1]._id}`} className={cx('figure')}>
                                        <img src={topTrending[1].image} />
                                        <div className={cx('figcaption')}>
                                            <div className={cx('content_in')}>
                                                <p>{topTrending[1].Category}</p>
                                                <h2>{topTrending[1].name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('g_card')}>
                                    <Link to={`/detail/${topTrending[2]._id}`} className={cx('figure')}>
                                        <img src={topTrending[2].image} />
                                        <div className={cx('figcaption')}>
                                            <div className={cx('content_in')}>
                                                <p>{topTrending[2].Category}</p>
                                                <h2>{topTrending[2].name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('gallery_text')}>
                                <div className={cx('text')}>
                                    <h2> Breakfast on the go</h2>

                                </div>
                                <p>
                                    Check out one of my absolute favorite recipes right now! Full recipe on the blog.
                                </p>
                            </div>
                        </div>
                    )}


                    {/* Introduction of Recipe */}
                    <div className={cx('summary')}>
                        <div className={cx('summary_contain')}>
                            <span>
                                <h2 className={cx('summary_title')}>Introduction of Recipe</h2>
                                <p>
                                    People cook for many reasons. At GourmetFoodie, we do it for the love of food, and we want to help you and other home cooks discover and demystify dishes that pique your culinary curiosities -- whatever the driving force behind cooking is for you. Whether your economic strategy is motivated by gastronomic delights or your dietary restrictions are guiding your kitchen creations,  there are thousands of recipes to explore.
                                </p>
                                <p className={cx('summary_add')}>We've broken down the elements of cooking to make it simple…
                                </p>
                            </span>
                            {/* <span className={cx('summary_readless')}>Read less</span> */}
                        </div>
                    </div>
                    <div className={cx('blog')}>
                        <h1>Our<span>Recipe</span></h1>
                        <div className={cx('blog_box')}>
                            <RecipeForm />
                        </div>
                    </div>
                </div>
            </div>

            {showCreateRecipeModal && <CreateRecipe setShowCreateRecipeModal={setShowCreateRecipeModal} />}
        </div>
    )
}

export default Recipe