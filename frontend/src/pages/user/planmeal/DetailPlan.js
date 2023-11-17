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
    const [showDetailRecipeModal, setShowDetailRecipeModal] = useState(false)
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
                <div className={cx('result_row')}>
                    <div className={cx('result_left')}>
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
                                            </div>
                                        </div>

                                        <div className={cx('result_row')}>
                                            {planMealData.data[0].detailDay.map((detailDay, indexDay) => {
                                                return (
                                                    <div key={indexDay}>
                                                        {detailDay.meals.map((meal) => {
                                                            return (
                                                                <div key={meal._id} className={cx('meal_list')}>
                                                                    <div className={cx('meal_header')}>
                                                                        <div className={cx('header_left')}>
                                                                            <span className={cx('breakfast')}>{meal.name}</span>
                                                                            <span className={cx('calories')}> {Math.ceil(meal.calories)} Calories</span>
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
                                                                                            <span className={cx('follow')}>{recipe.Category}</span>
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