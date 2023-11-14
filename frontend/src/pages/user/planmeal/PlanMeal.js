import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./PlanMeal.module.scss"
import classNames from 'classnames/bind'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
const PlanMeal = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return (
        <div className={cx('plan_meal')}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('plan_meal_contain')}>
                <div className={cx('plan_meal_contain')}>
                    <div className={cx('plan_header_wrapper')}>
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
                            </Link >
                            <Link to='/manualPlan'>
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
                            </Link>
                        </div>
                    </div>
                    <div className={cx('plan_right')} >
                        <div className={cx('meal_suggestions')}>
                            <img src={images.header_logo} />
                            <span> hien 5 planmeal mois tao gan day nhat</span>
                            <div className={cx('suggestions_item')}>
                                <p className={cx('item')}>
                                    <img src={images.add_recipe} />
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