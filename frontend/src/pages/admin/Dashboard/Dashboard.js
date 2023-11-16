import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "./Dashboard.module.scss"
import classNames from 'classnames/bind'
import MixChart from '../Chart/Mixchart';
import UserLineChart from '../Chart/UserLinechart';
import RecipeBarChart from './RecipeBarChart';
import AdBarsChart from '../Chart/AdBarChart';
import RatingPieChart from '../Chart/RatingPieChart';
import images from '~/assets/images'

import axios from "axios"
import {
    apiUrl,
    ACCESS_TOKEN,
    PROFILE_INFORMATION
} from "~/constants/constants"
const accessToken = localStorage.getItem(ACCESS_TOKEN);

const cx = classNames.bind(styles)
const Dashboard = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [ratingDev, setRatingDev] = useState({
        ratingDevUser: { currentMonth: 1, rate: 0 },
        ratingDevRecipe: { currentMonth: 1, rate: 0 },
        ratingDevArticle: { currentMonth: 1, rate: 0 },
        ratingDevMealplan: { currentMonth: 1, rate: 0 }
    })
    const [ratingCategory, setRatingCategory] = useState([])
    const [topTrending, setTopTrending] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const [response, mealplansResponse] = await Promise.all([
                    axios.get(`${apiUrl}/admin/getDashboard`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }),
                    axios.get(`${apiUrl}/mealplan/getalltostatistic`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })

                ])
                if (response.data.success && mealplansResponse.data.success) {
                    const data = response.data.data
                    data.ratingDevMealplan = mealplansResponse.data.data
                    setRatingDev(data)
                    setRatingCategory(response.data.rating)
                    setTopTrending(response.data.recipes)


                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <>
            < div className={cx('row-dashboard')} >
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Dashboard</h4>
                    </div>
                </div>
            </ div>
            <div div className={cx('content')} >
                <div className={cx('g-3', 'mb-3', 'row')}>
                    {ratingDev && (
                        <div className={cx('col-xxl-3', 'col-md-6')}>
                            <div className={cx('h-md-100', 'card')}>
                                <div className={cx('pd-0', 'card-header')}>
                                    <h6 className={cx('mb-0', 'mt-2')}>Total account this month</h6>
                                </div>
                                <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                    <div className={cx('border-left')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                        </svg>
                                    </div>
                                    <div className={cx('border-right')}>
                                        <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>
                                            {ratingDev.ratingDevUser && ratingDev.ratingDevUser.currentMonth}
                                        </h2>
                                        <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>
                                            {ratingDev.ratingDevUser && ratingDev.ratingDevUser.rate}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={cx('col-xxl-3', 'col-md-6')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Recipe  this month</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>{ratingDev.ratingDevRecipe.currentMonth}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>{ratingDev.ratingDevRecipe.rate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-xxl-3', 'col-md-6')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Article this month</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>{ratingDev.ratingDevArticle.currentMonth}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>{ratingDev.ratingDevArticle.rate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-6')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Plan meal this month</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>{ratingDev.ratingDevMealplan.currentMonth}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>{ratingDev.ratingDevMealplan.rate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* hai chart  */}
                <div className={cx('g-3', 'mb-3', 'row')}>
                    <div className={cx('col-lg-6')}>
                        <div className={cx('h-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>The chart shows the growth of the account</h6>
                                </div>
                            </div>
                            <div className={cx('card-body')}>
                                <UserLineChart />
                            </div>

                        </div>
                    </div>
                    <div className={cx('col-lg-6')}>
                        <div className={cx('h-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>The chart shows the growth of the account</h6>
                                </div>
                            </div>
                            <div className={cx('card-body')}>
                                <RecipeBarChart />
                            </div>
                        </div>
                    </div>
                </div>

                {/* top trending recipe  */}
                <div className={cx('g-3', 'mb-3', 'row')}>
                    <div className={cx('col-xl-8', 'col-lg-7')}>
                        <div className={cx('h-lg-100', 'overflow-hidden', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>The chart shows the number of recipes and ratings</h6>
                                </div>
                            </div>
                            {/* //duoi */}
                            <div className={cx('card-body-mix')}>
                                <MixChart ratingCategory={ratingCategory} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-xl-4', 'col-lg-4')}>
                        <div className={cx('h-lg-100', 'card')}>
                            <div className={cx('py-2', 'bg-light', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>Top trending recipe</h6>
                                </div>
                            </div>
                            {topTrending && topTrending.map((recipe) => (
                                recipe.ratings && (
                                    <div className={cx('pb-0', 'card-body')}>
                                        <div className={cx('d-flex', 'align-items-center', 'mb-3', 'hover-actions-trigger')}>
                                            <div className={cx('file-thumbnail')}>
                                                <img src={recipe.image} />
                                            </div>
                                            <div className={cx('ms-3', 'flex-shrink-1', 'flex-grow-1')}>
                                                <h6 className={cx('mb-1')}>
                                                    <Link to="#" className={cx('stretched-link', 'text-900', 'fw-semi-bold')}>{recipe.name}</Link>
                                                </h6>
                                                <span className={cx('fw-semi-bold')}>Rating:{recipe.ratings}</span>
                                                <div className={cx('fs--1')}>
                                                    <span className={cx('fw-semi-bold')}>{recipe.user[0].name}</span>
                                                    <span className={cx('fw-medium', 'text-600', 'ms-2')}>Just Now</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            ))}

                        </div>
                    </div>
                </div>

                {/* ******  */}
                <div className={cx('g-3', 'row')}>
                    {/* trai  */}
                    {/* <div className={cx('col-xxl-3', 'col-sm-6')}>
                        <div className={cx('h-100', 'card')}>
                            <div className={cx('py-2', 'bg-light', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>Hi!</h6>
                                </div>
                            </div>
                            <div className={cx('card-body-chart')}>

                            </div>
                        </div>
                    </div> */}

                    {/* phai  */}
                    <div className={cx('order-xxl-1', 'col-xxl-3', 'col-sm-6')}>
                        <div className={cx('h-100', 'card')}>
                            <div className={cx('py-2', 'bg-light', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>Rating Recipe</h6>
                                </div>
                            </div>
                            <div className={cx('card-body-chart')}>
                                <RatingPieChart />
                            </div>
                        </div>
                    </div>

                    {/* giua  */}
                    <div className={cx('col-xxl-6')}>
                        <div className={cx('h-100', 'card')}>
                            <div className={cx('py-2', 'bg-light', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>Chart showing Ad Pack Delivery</h6>
                                </div>
                            </div>
                            <div className={cx('card-body-piechart')}>
                                <AdBarsChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <MixChart /> */}
        </>
    );
}

export default Dashboard;