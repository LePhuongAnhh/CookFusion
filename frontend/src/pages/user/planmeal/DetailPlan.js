import { Link, useLocation, Navigate } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./ResultAuto.module.scss"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import classNames from 'classnames/bind'
import ShowRecipePlan from "../../../components/Modal/ShowRecipePlan";
import images from '~/assets/images'
import Loading from '~/components/Layout/Loading';
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
const DetailPlan = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const { id } = useParams();
    const [planMealData, setPlanMealData] = useState([]);

    //goi api từng planmeal
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/mealplan/getone/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setPlanMealData(response.data)
                console.log("detail Plan:", response.data);
            } catch (error) {
                console.error("Error fetching Meal Plans:", error);
            }
        };
        fetchData();
    }, []);

    const caloriesEachDay = Math.round(planMealData.data?.[0]?.caloriesEachDay || 0);
    if (!planMealData || !planMealData.data) {
        return <p> <Loading /></p>;
    }
    return (
        <div className={cx('result')}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('result_contain')}>
                <div className={cx('header-card')}>
                    <div className={cx('heder-gird')}>
                        <span><Link to="/planmeal">Plan Meal </Link></span>
                        <span> / </span>
                        {/* <span><Link to="/result">Result</Link> </span> */}
                        {/* <span> / </span> */}
                        <span> Detail  </span>
                    </div>
                </div>
                <div className={cx('result_row')}>
                    <div className={cx('result_left')}>
                        <>
                            <div className={cx('result_row')}>
                                <div className={cx('day_header')}>
                                    <div className={cx('day_title')}>
                                        {planMealData.data[0].name} - {planMealData.data[0].nPerson} people
                                    </div>
                                </div>
                                <div className={cx('single_day')}>
                                    <div>
                                        <div className={cx('workspace_area')}>
                                            <div className={cx('workspace_stats')}>
                                                <div className={cx('plan_stats')}>
                                                    <img src={images.Pie_chart} />
                                                    <div className={cx('show_calories')}>{caloriesEachDay}  Calories for {planMealData.data[0].days.length} day(s)</div>
                                                    <div className={cx('meal_refresh')} title='Save collection plan meal'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16" title='Save collection plan meal'>
                                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={cx('result_row')}>
                                                    {planMealData.data[0].detailDay.map((detailDay, indexDay) => {
                                                        return (
                                                            <div style={{ marginBottom: "30px" }} key={indexDay}>
                                                                <span className={cx('day')}> <img style={{ width: "29px", height: "29px", marginTop: "-10px" }} src={images.calender} /> {detailDay.name}</span>
                                                                {detailDay.meals.map((meal) => {
                                                                    return (
                                                                        <div key={meal._id} className={cx('meal_list')}>
                                                                            <div className={cx('meal_header')}>
                                                                                <div className={cx('header_left')}>
                                                                                    <span className={cx('breakfast')}>{meal.name}</span>
                                                                                    <span className={cx('calories')}> {Math.ceil(meal.calories)} Calories <img style={{ width: "20px", height: "21px", marginTop: "-10px" }} src={images.icon_calo} /></span>
                                                                                </div>
                                                                                <div className={cx('header_right')}>
                                                                                    <div className={cx('meal_setting')} title='Refresh this meal'>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={cx('meal_content')}>
                                                                                {meal.recipes.map((recipe) => (
                                                                                    <div key={recipe._id} className={cx('row_meal_foods')}>
                                                                                        <div className={cx('show_info1')}>
                                                                                            <Link to={`/detail/${recipe._id}`}>
                                                                                                <div className={cx('avt_follow')} >
                                                                                                    <img className={cx('circle_avt')} src={recipe.image} alt="Recipe Image" />
                                                                                                </div>
                                                                                            </Link>
                                                                                            <div className={cx('show_name')}>
                                                                                                <h6 >
                                                                                                    <Link to={`/detail/${recipe._id}`}>{recipe.name}</Link>
                                                                                                </h6>
                                                                                                <div className={cx('btn_follow1')}>
                                                                                                    <span className={cx('follow')}>
                                                                                                        <span style={{ fontSize: "11px" }}>{recipe.Category.toUpperCase()} </span>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>

                    <div className={cx('result_right')}>
                        <div className={cx('nutrition_value')}>
                            <h3 className={cx('title_value')}>Nutrition value</h3>
                            <div className={cx('table_value')}>
                                <div className={cx('table_row')}>
                                    <th className={cx('th_nutri')}>Calories</th>
                                    <td className={cx('text_right')}>
                                        <span>{caloriesEachDay} kcal</span>
                                    </td>
                                </div>
                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Protein</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('green')}> g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Carbs</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('orange')}> g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Fats</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('purple')}> g</span>
                                    </td>
                                </div>

                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Sugars</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}> g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Fiber</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}>g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Sodium</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}> g</span>
                                    </td>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailPlan