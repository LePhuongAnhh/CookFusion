import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./ResultAuto.module.scss"
import classNames from 'classnames/bind'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
// import Pie_chart from "../../../image/pie-chart.png"
import ShowRecipe from "../../../components/Modal/ShowRecipePlan";
// import minh from "../../../image/article.webp"
import ShowRecipePlan from '../../../components/Modal/ShowRecipePlan';
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
const ResultAuto = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [showDetailRecipeModal, setShowDetailRecipeModal] = useState(false)
    return (
        <div className={cx('result')}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('result_contain')}>
                <div className={cx('result_row')}>
                    <div className={cx('result_left')}>
                        <div className={cx('result_row')}>
                            <div className={cx('day_header')}>
                                <div className={cx('day_title')}>Today's Meal Plan</div>
                            </div>
                            <div className={cx('single_day')}>
                                <div>
                                    <div></div>
                                    <div className={cx('workspace_area')}>
                                        <div className={cx('workspace_stats')}>
                                            <div className={cx('plan_stats')}>
                                                <img src={images.Pie_chart} />
                                                <div className={cx('show_calories')}>858 Calories</div>
                                            </div>
                                        </div>
                                        <div className={cx('result_row')}>
                                            {/* breakfast  */}
                                            <div className={cx('meal_list')}>
                                                <div className={cx('meal_header')}>
                                                    <div className={cx('header_left')}>
                                                        <span className={cx('breakfast')}>Breakfast</span>
                                                        <span className={cx('calories')}>320 Calories</span>
                                                    </div>
                                                    <div className={cx('header_right')}>
                                                        <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                                <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
                                                            </svg>
                                                        </div>
                                                        <div className={cx('meal_setting')} title='Refresh this meal'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* body  */}
                                                <div className={cx('meal_content')}>
                                                    <div className={cx('row_meal_foods')}>
                                                        <div className={cx('show_info1')}>
                                                            <Link to="#">
                                                                <div className={cx('avt_follow')} onClick={() => setShowDetailRecipeModal(true)} >
                                                                    <img className={cx('circle_avt')} src={images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6 onClick={() => setShowDetailRecipeModal(true)} >
                                                                    <Link to="#">Minn</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>1 serving</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('header_right_hide')}>
                                                            <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('row_meal_foods')}>
                                                        <div className={cx('show_info1')}>
                                                            <Link to="#">
                                                                <div className={cx('avt_follow')}>
                                                                    <img className={cx('circle_avt')} src={images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">Minn</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>1 serving</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('header_right_hide')}>
                                                            <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Lunch  */} <div className={cx('meal_list')}>
                                                <div className={cx('meal_header')}>
                                                    <div className={cx('header_left')}>
                                                        <span className={cx('breakfast')}>Lunch</span>
                                                        <span className={cx('calories')}>210 Calories</span>
                                                    </div>
                                                    <div className={cx('header_right')}>
                                                        <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                                <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
                                                            </svg>
                                                        </div>
                                                        <div className={cx('meal_setting')} title='Refresh this meal'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* body  */}
                                                <div className={cx('meal_content')}>
                                                    <div className={cx('row_meal_foods')}>
                                                        <div className={cx('show_info1')}>
                                                            <Link to="#">
                                                                <div className={cx('avt_follow')}>
                                                                    <img className={cx('circle_avt')} src={images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">Minn</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>1 serving</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('header_right_hide')}>
                                                            <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('row_meal_foods')}>
                                                        <div className={cx('show_info1')}>
                                                            <Link to="#">
                                                                <div className={cx('avt_follow')}>
                                                                    <img className={cx('circle_avt')} src={images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">Minn</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>1 serving</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('header_right_hide')}>
                                                            <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Dinner  */}
                                            <div className={cx('meal_list')}>
                                                <div className={cx('meal_header')}>
                                                    <div className={cx('header_left')}>
                                                        <span className={cx('breakfast')}>Dinner</span>
                                                        <span className={cx('calories')}>320 Calories</span>
                                                    </div>
                                                    <div className={cx('header_right')}>
                                                        <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                                <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
                                                            </svg>
                                                        </div>
                                                        <div className={cx('meal_setting')} title='Refresh this meal'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* body  */}
                                                <div className={cx('meal_content')}>
                                                    <div className={cx('row_meal_foods')}>
                                                        <div className={cx('show_info1')}>
                                                            <Link to="#">
                                                                <div className={cx('avt_follow')}>
                                                                    <img className={cx('circle_avt')} src={images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">Minn</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>1 serving</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('header_right_hide')}>
                                                            <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('row_meal_foods')}>
                                                        <div className={cx('show_info1')}>
                                                            <Link to="#">
                                                                <div className={cx('avt_follow')}>
                                                                    <img className={cx('circle_avt')} src={images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">Minn</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>1 serving</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('header_right_hide')}>
                                                            <div className={cx('meal_refresh')} title='Refresh this meal'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('result_right')}>
                        <div className={cx('nutrition_value')}>
                            <h3 className={cx('title_value')}>Nutrition value</h3>
                            <div className={cx('table_value')}>
                                <div className={cx('table_row')}>
                                    <th className={cx('th_nutri')}>Calories</th>
                                    <td className={cx('text_right')}>
                                        <span>858 kcal</span>
                                    </td>
                                </div>

                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Protein</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('green')}>43 g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Carbs</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('orange')}>140 g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Fats</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('purple')}>71 g</span>
                                    </td>
                                </div>

                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Sugars</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}>45 g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Fiber</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}>26 g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Sodium</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}>2089 mg</span>
                                    </td>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showDetailRecipeModal && <ShowRecipe setShowDetailRecipeModal={setShowDetailRecipeModal} />}
        </div>
    )
}

export default ResultAuto