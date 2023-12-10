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
                        <div className={cx('col-md-6', "mr")}>
                            <div className={cx('h-md-100', 'card')}>
                                <div className={cx('pd-0', 'card-header')}>
                                    <h6 className={cx('mb-0', 'mt-2')}>Total account this month</h6>
                                </div>
                                <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                    <div className={cx('border-left')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 640 512">
                                            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
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

                    <div className={cx('col-md-6', 'mr')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Recipe  this month</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 448 512">
                                        <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" /></svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>{ratingDev.ratingDevRecipe.currentMonth}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>{ratingDev.ratingDevRecipe.rate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-6', 'mr')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Article this month</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 512 512">
                                        <path d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" /></svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>{ratingDev.ratingDevArticle.currentMonth}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>{ratingDev.ratingDevArticle.rate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-6', 'mr')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Plan meal this month</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 512 512">
                                        <path d="M0 224c0 53 43 96 96 96h44.7c9.5-23.5 32.5-40 59.3-40c2 0 3.9 .1 5.8 .3C217.6 265.5 235.7 256 256 256s38.4 9.5 50.2 24.3c1.9-.2 3.9-.3 5.8-.3c26.9 0 49.9 16.5 59.3 40H416c53 0 96-43 96-96s-43-96-96-96c-.5 0-1.1 0-1.6 0c1.1-5.2 1.6-10.5 1.6-16c0-44.2-35.8-80-80-80c-24.3 0-46.1 10.9-60.8 28C256.5 24.3 219.1 0 176 0C114.1 0 64 50.1 64 112c0 7.1 .7 14.1 1.9 20.8C27.6 145.4 0 181.5 0 224zm288 96c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 1 .1 2.1 .1 3.1c-.7-.8-1.4-1.6-2.1-2.3c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3c.7 .7 1.5 1.4 2.3 2.1c-1-.1-2.1-.1-3.1-.1c-17.7 0-32 14.3-32 32s14.3 32 32 32c1 0 2.1-.1 3.1-.1c-.8 .7-1.6 1.3-2.3 2.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0c.7-.7 1.4-1.5 2.1-2.3c-.1 1-.1 2.1-.1 3.1c0 17.7 14.3 32 32 32s32-14.3 32-32c0-1-.1-2.1-.1-3.1c.7 .8 1.3 1.6 2.1 2.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3c-.7-.7-1.5-1.4-2.3-2.1c1 .1 2.1 .1 3.1 .1c17.7 0 32-14.3 32-32s-14.3-32-32-32c-1 0-2.1 .1-3.1 .1c.8-.7 1.6-1.3 2.3-2.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-.7 .7-1.4 1.5-2.1 2.3c.1-1 .1-2.1 .1-3.1zM48 448a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm416 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>
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
                                <div className={cx('align-items-center', 'row')} style={{ margin: "0 20px 0 39px" }}>
                                    <h6 className={cx('mb-0')}>The chart shows the growth of the account</h6>
                                </div>
                            </div>
                            <div className={cx('card-body')} style={{ padding: "0 120px " }}>
                                <RecipeBarChart />
                            </div>
                        </div>
                    </div>
                </div>

                {/* top trending recipe  */}
                <div className={cx('g-3', 'mb-3', 'row')}>
                    <div className={cx('col-xl-8', 'col-lg-7')}>
                        <div className={cx('h-lg-100', 'overflow-hidden', 'card')} style={{ height: "450px" }}>
                            <div className={cx('pd-0', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>The chart shows the number of recipes and ratings</h6>
                                </div>
                            </div>
                            {/* //duoi */}
                            <div className={cx('card-body-mix')} style={{ width: '560px', height: '350px' }}>
                                <MixChart ratingCategory={ratingCategory} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-xl-4', 'col-lg-4')}>
                        <div className={cx('h-lg-100', 'card', "card-gird")}>
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
                                                    <Link to="#" className={cx('stretched-link', 'text-900')}>{recipe.name}</Link>
                                                </h6>
                                                <span className={cx('rating')}>Rating:{recipe.ratings}</span>
                                                <div className={cx('fs--1')}>
                                                    <span className={cx('fw-semi-bold')}>{recipe.user[0].name}</span>
                                                    {/* <span className={cx('fw-medium', 'text-600', 'ms-2')}>Just Now</span> */}
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
                    {/* phai  */}
                    <div className={cx('order-xxl-1', 'col-xxl-3', 'col-sm-6')}>
                        <div className={cx('h-100', 'card')} style={{ width: " 330p", marginLeft: "12px" }}>
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