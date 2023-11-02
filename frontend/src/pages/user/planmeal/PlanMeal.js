import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./PlanMeal.module.scss"
import classNames from 'classnames/bind'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
// import VideoPlayer from './VideoPlayer';
// import suggestions from "../../../image/2.png"
// import star from "../../../image/star1.png"
// import background_top from "../../../image/Cream Yellow Organic Illustrative Meal Planner (1).jpg"
// import manual from "../../../image/auto.png"
// import auto from "../../../image/manual.png"
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
const PlanMeal = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return (
        <div className={cx('plan_meal')}>
            <Navigation />
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('plan_meal_contain')}>
                <div className={cx('plan_meal_contain')}>
                    <div className={cx('plan_header_wrapper')}>
                        <img src={images.background_top} />
                        <div className={cx('plan_header_text')}>
                            <h1> MEAL Planner</h1>
                            <p>Gourmet Food creates personalized meal plans based on your food preferences and schedule. Reach your diet and nutritional goals with our calorie calculator, weekly meal plans, grocery lists and more. Create your meal plan right here in seconds.</p>
                        </div>
                    </div>
                </div>

                <div className={cx('create_auto_plan')}>
                    <div className={cx('plan_left')}>
                        <div className={cx('plan_wrapper')}>
                            <Link to="/autoplan" className={cx('automatic_plan')}>
                                <div className={cx('title_wrapper')}>
                                    <div className={cx('img_plan')}>
                                        <img src={images.auto} />
                                    </div>
                                    <div className={cx('text_wrapper')}>
                                        <span className={cx('title')}>Automatically builds a plan  </span>
                                        <span className={cx('suptitle')}>Recommended</span>
                                    </div>
                                </div>
                                <div className={cx('intr_plan')}>
                                    <span className={cx('intro_text')}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={cx('choose_btn')}>Get Started</span>
                            </Link>
                            <div className={cx('manual_plan')}>
                                <div className={cx('title_wrapper')}>
                                    <div className={cx('img_plan')}>
                                        <img src={images.manual} />
                                    </div>
                                    <div className={cx('text_wrapper')}>
                                        <span className={cx('title')}>Make your meals personal  </span>
                                        <span className={cx('suptitle')}>Recommended</span>
                                    </div>
                                </div>
                                <div className={cx('intr_plan')}>
                                    <span className={cx('intro_text')}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={cx('choose_btn1')}>Get Started</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('plan_right')} >
                        <div className={cx('meal_suggestions')}>
                            <img src={images.suggestions} />
                            <div className={cx('suggestions_item')}>
                                <p className={cx('item')}>
                                    <img src={images.star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                            <div className={cx('suggestions_item')}>
                                <p className={cx('item')}>
                                    <img src={images.star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                            <div className={cx('suggestions_item')}>
                                <p className={cx('item')}>
                                    <img src={images.star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                            <div className={cx('suggestions_item')}>
                                <p className={cx('item')}>
                                    <img src={images.star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanMeal