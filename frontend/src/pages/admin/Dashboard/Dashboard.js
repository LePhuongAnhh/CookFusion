
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
    ACCOUNT_ID,
    ROLE,
    PROFILE_INFORMATION,
    USERNAME
} from "../../../constants/constants.js"

const cx = classNames.bind(styles)
const Dashboard = () => {
    const [totalUser, setTotalUser] = useState(0)
    const [totalArticle, setTotalArticle] = useState(0)
    const [totalRecipe, setTotalRecipe] = useState(0)
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getDashboard`);
                console.log(response.data)
                if (response.data.success) {
                    setTotalUser(response.data.data.totalUser)
                    setTotalArticle(response.data.data.totalArticle)
                    setTotalRecipe(response.data.data.totalRecipe)
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
                    <div className={cx('col-xxl-3', 'col-md-6')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total account</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')} >{totalUser}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>+3%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-xxl-3', 'col-md-6')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Recipe</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>{totalRecipe}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>+3%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-xxl-3', 'col-md-6')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Article</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>{totalArticle}
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>-7%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-6')}>
                        <div className={cx('h-md-100', 'card')}>
                            <div className={cx('pd-0', 'card-header')}>
                                <h6 className={cx('mb-0', 'mt-2')}>Total Plan meal</h6>
                            </div>
                            <div className={cx('d-flex', 'justify-content-between', 'align-items-end', 'card-body')}>
                                <div className={cx('border-left')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </div>
                                <div className={cx('border-right')}>
                                    <h2 className={cx('mb-1', 'text-700', 'fw-normal', 'lh-1')}>24
                                    </h2>
                                    <div className={cx('fs--2', 'badge', 'badge-soft-success', 'rounded-pill')}>+12%</div>
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
                                <MixChart />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-xl-4', 'col-lg-5')}>
                        <div className={cx('h-lg-100', 'card')}>
                            <div className={cx('py-2', 'bg-light', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>Top trending recipe</h6>
                                </div>
                            </div>
                            <div className={cx('pb-0', 'card-body')}>
                                <div className={cx('d-flex', 'align-items-center', 'mb-3', 'hover-actions-trigger')}>
                                    <div className={cx('file-thumbnail')}>
                                        <img src={images.Avt} />
                                    </div>
                                    <div className={cx('ms-3', 'flex-shrink-1', 'flex-grow-1')}>
                                        <h6 className={cx('mb-1')}>
                                            <Link to="#" className={cx('stretched-link', 'text-900', 'fw-semi-bold')}>Cháo Đậu Xanh</Link>
                                        </h6>
                                        <div className={cx('fs--1')}>
                                            <span className={cx('fw-semi-bold')}>Antony</span>
                                            <span className={cx('fw-medium', 'text-600', 'ms-2')}>Just Now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ******  */}
                <div className={cx('g-3', 'row')}>
                    {/* trai  */}
                    <div className={cx('col-xxl-3', 'col-sm-6')}>
                        <div className={cx('h-100', 'card')}>
                            <div className={cx('py-2', 'bg-light', 'card-header')}>
                                <div className={cx('align-items-center', 'row')}>
                                    <h6 className={cx('mb-0')}>Hi!</h6>
                                </div>
                            </div>
                            <div className={cx('card-body-chart')}>

                            </div>
                        </div>
                    </div>

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