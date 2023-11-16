import { Link, useLocation } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./ResultAuto.module.scss"
import axios from 'axios';
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
    const location = useLocation();
    const data = location?.state?.data;
    const [mealdata, setMealdata] = useState([]);
    const [dataSave, setDataSave] = useState({
        name: '',
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDataSave({
            ...dataSave,
            [name]: value
        })
    }
    const [nutrion, setNutrion] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 })
    const handleRefreshBf = async () => {
        try {
            const bf = await axios.patch(`${apiUrl}/mealplan/rebuildBreakfast`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            if (data.success) {
                const updateMeal = { ...mealdata, bf: bf.data.data }
                // console.log(updateMeal)
                setMealdata(updateMeal)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleRefreshMain = async (isDinner) => {
        try {
            const main = await axios.patch(`${apiUrl}/mealplan/rebuildMainmeal`, { isDinner }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            if (data.success) {
                if (isDinner) var updateMeal = { ...mealdata, dinner: main.data.data }
                else var updateMeal = { ...mealdata, lunch: main.data.data }
                setMealdata(updateMeal)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const calculate = (newData) => {
            let protein = data.data.bf.dessert.data.nutrion.protein
                + data.data.bf.stapleFood.data.nutrion.protein
                + data.data.bf.drink.data.nutrion.protein
                + data.data.lunch.dessert.data.nutrion.protein
                + data.data.lunch.stapleFood.data.nutrion.protein
                + data.data.lunch.main1.data.nutrion.protein
                + data.data.lunch.vegan.data.nutrion.protein
                + data.data.dinner.dessert.data.nutrion.protein
                + data.data.dinner.stapleFood.data.nutrion.protein
                + data.data.dinner.main1.data.nutrion.protein
                + data.data.dinner.vegan.data.nutrion.protein
            let carbs = data.data.bf.dessert.data.nutrion.carbs
                + data.data.bf.stapleFood.data.nutrion.carbs
                + data.data.bf.drink.data.nutrion.carbs
                + data.data.lunch.dessert.data.nutrion.carbs
                + data.data.lunch.stapleFood.data.nutrion.carbs
                + data.data.lunch.main1.data.nutrion.carbs
                + data.data.lunch.vegan.data.nutrion.carbs
                + data.data.dinner.dessert.data.nutrion.carbs
                + data.data.dinner.stapleFood.data.nutrion.carbs
                + data.data.dinner.main1.data.nutrion.carbs
                + data.data.dinner.vegan.data.nutrion.carbs
            let fat = data.data.bf.dessert.data.nutrion.fat
                + data.data.bf.stapleFood.data.nutrion.fat
                + data.data.bf.drink.data.nutrion.fat
                + data.data.lunch.dessert.data.nutrion.fat
                + data.data.lunch.stapleFood.data.nutrion.fat
                + data.data.lunch.main1.data.nutrion.fat
                + data.data.lunch.vegan.data.nutrion.fat
                + data.data.dinner.dessert.data.nutrion.fat
                + data.data.dinner.stapleFood.data.nutrion.fat
                + data.data.dinner.main1.data.nutrion.fat
                + data.data.dinner.vegan.data.nutrion.fat
            let sugar = data.data.bf.dessert.data.nutrion.sugar
                + data.data.bf.stapleFood.data.nutrion.sugar
                + data.data.bf.drink.data.nutrion.sugar
                + data.data.lunch.dessert.data.nutrion.sugar
                + data.data.lunch.stapleFood.data.nutrion.sugar
                + data.data.lunch.main1.data.nutrion.sugar
                + data.data.lunch.vegan.data.nutrion.sugar
                + data.data.dinner.dessert.data.nutrion.sugar
                + data.data.dinner.stapleFood.data.nutrion.sugar
                + data.data.dinner.main1.data.nutrion.sugar
                + data.data.dinner.vegan.data.nutrion.sugar
            let fiber = data.data.bf.dessert.data.nutrion.fiber
                + data.data.bf.stapleFood.data.nutrion.fiber
                + data.data.bf.drink.data.nutrion.fiber
                + data.data.lunch.dessert.data.nutrion.fiber
                + data.data.lunch.stapleFood.data.nutrion.fiber
                + data.data.lunch.main1.data.nutrion.fiber
                + data.data.lunch.vegan.data.nutrion.fiber
                + data.data.dinner.dessert.data.nutrion.fiber
                + data.data.dinner.stapleFood.data.nutrion.fiber
                + data.data.dinner.main1.data.nutrion.fiber
                + data.data.dinner.vegan.data.nutrion.fiber
            let sodium = data.data.bf.dessert.data.nutrion.sodium
                + data.data.bf.stapleFood.data.nutrion.sodium
                + data.data.bf.drink.data.nutrion.sodium
                + data.data.lunch.dessert.data.nutrion.sodium
                + data.data.lunch.stapleFood.data.nutrion.sodium
                + data.data.lunch.main1.data.nutrion.sodium
                + data.data.lunch.vegan.data.nutrion.sodium
                + data.data.dinner.dessert.data.nutrion.sodium
                + data.data.dinner.stapleFood.data.nutrion.sodium
                + data.data.dinner.main1.data.nutrion.sodium
                + data.data.dinner.vegan.data.nutrion.sodium
            setNutrion({ calories: calories, protein: protein, fat: fat, sodium: sodium, sugar: sugar, fiber: fiber, carbs: carbs })
        }
        if (data.success && mealdata.length == 0) {
            var newData = data.data
            setMealdata(newData)
        } else if (mealdata.bf) {
            var newData = mealdata
        }
        let calories = newData.bf.calories + newData.lunch.calories + newData.dinner.calories
        if (newData.side1) calories += newData.side1.calories
        if (newData.side2) calories += newData.side2.calories
        console.log(newData)
        calculate(newData)

    }, [mealdata, setMealdata])

    const handleSaveAutoPlan = async (e) => {
        e.preventDefault();
        const requestDataSave = {
            name: dataSave.name
        }
        try {
            const response = await axios.post(`${apiUrl}/mealplan/saveAutoMealPlan`, requestDataSave, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.data) {
                setDataSave(response.data);
            }
        } catch (error) {
            console.log(error);
        }
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
                                <div className={cx('day_title')}>Today's Meal Plan</div>
                            </div>

                            <form>
                                <div className="form-group">
                                    <label className="sr-only">Name</label>
                                    <input
                                        value={dataSave.name}
                                        onChange={(e) => handleOnChange(e)}
                                        type="text"
                                        className="form-control"
                                        required=""
                                        id="nameNine"
                                        name='name'
                                        placeholder="Name plan meal" />
                                </div>
                                <button onClick={handleSaveAutoPlan} type="submit" className="btn text-center btn-blue">Save</button>
                            </form>

                            <div className={cx('single_day')}>
                                <div>
                                    <div></div>
                                    <div className={cx('workspace_area')}>
                                        <div className={cx('workspace_stats')}>
                                            <div className={cx('plan_stats')}>
                                                <img src={images.Pie_chart} />
                                                <div className={cx('show_calories')}>{Math.floor(nutrion.calories)} Calories</div>
                                            </div>
                                        </div>
                                        <div className={cx('result_row')}>
                                            {/* breakfast  */}
                                            <div className={cx('meal_list')}>
                                                <div className={cx('meal_header')}>
                                                    <div className={cx('header_left')}>
                                                        <span className={cx('breakfast')}>Breakfast</span>
                                                        <span className={cx('calories')}>{(mealdata.bf) ? (Math.floor(mealdata.bf.calories)) : 0} Calories</span>
                                                    </div>
                                                    <div className={cx('header_right')}>
                                                        <div className={cx('meal_refresh')} onClick={handleRefreshBf} title='Refresh this meal'>
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
                                                                    <img className={cx('circle_avt')} src={((mealdata.bf)) ? mealdata.bf.dessert.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6 onClick={() => setShowDetailRecipeModal(true)} >
                                                                    <Link to="#">{((mealdata.bf)) ? mealdata.bf.dessert.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{((mealdata.bf)) ? mealdata.bf.dessert.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={((mealdata.bf)) ? mealdata.bf.stapleFood.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{((mealdata.bf)) ? mealdata.bf.stapleFood.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{((mealdata.bf)) ? mealdata.bf.stapleFood.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={((mealdata.bf)) ? mealdata.bf.drink.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{((mealdata.bf)) ? mealdata.bf.drink.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{((mealdata.bf)) ? mealdata.bf.drink.data.nPerson : '1'} serving</span>
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
                                            {/* Lunch  */}
                                            <div className={cx('meal_list')}>
                                                <div className={cx('meal_header')}>
                                                    <div className={cx('header_left')}>
                                                        <span className={cx('breakfast')}>Lunch</span>
                                                        <span className={cx('calories')}>{(mealdata.lunch) ? (Math.floor(mealdata.lunch.calories)) : 0} Calories</span>
                                                    </div>
                                                    <div className={cx('header_right')}>
                                                        <div className={cx('meal_refresh')} onClick={() => handleRefreshMain(false)} title='Refresh this meal'>
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
                                                                    <img className={cx('circle_avt')} src={((mealdata.lunch)) ? mealdata.lunch.dessert.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6 onClick={() => setShowDetailRecipeModal(true)} >
                                                                    <Link to="#">{(mealdata.lunch) ? mealdata.lunch.dessert.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.lunch) ? mealdata.lunch.dessert.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={(mealdata.lunch) ? mealdata.lunch.stapleFood.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{(mealdata.lunch) ? mealdata.lunch.stapleFood.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.lunch) ? mealdata.lunch.stapleFood.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={(mealdata.lunch) ? mealdata.lunch.main1.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{(mealdata.lunch) ? mealdata.lunch.main1.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.lunch) ? mealdata.lunch.main1.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={(mealdata.lunch) ? mealdata.lunch.vegan.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{(mealdata.lunch) ? mealdata.lunch.vegan.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.lunch) ? mealdata.lunch.vegan.data.nPerson : '1'} serving</span>
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
                                                        <span className={cx('calories')}>{(mealdata.dinner) ? (Math.floor(mealdata.dinner.calories)) : 0} Calories</span>
                                                    </div>
                                                    <div className={cx('header_right')}>
                                                        <div className={cx('meal_refresh')} onClick={() => handleRefreshMain(true)} title='Refresh this meal'>
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
                                                                    <img className={cx('circle_avt')} src={(mealdata.dinner) ? mealdata.dinner.dessert.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6 onClick={() => setShowDetailRecipeModal(true)} >
                                                                    <Link to="#">{(mealdata.dinner) ? mealdata.dinner.dessert.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.dinner) ? mealdata.dinner.dessert.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={(mealdata.dinner) ? mealdata.dinner.stapleFood.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{(mealdata.dinner) ? mealdata.dinner.stapleFood.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.dinner) ? mealdata.dinner.stapleFood.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={(mealdata.dinner) ? mealdata.dinner.main1.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{(mealdata.dinner) ? mealdata.dinner.main1.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.dinner) ? mealdata.dinner.main1.data.nPerson : '1'} serving</span>
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
                                                                    <img className={cx('circle_avt')} src={(mealdata.dinner) ? mealdata.dinner.vegan.data.image : images.minh} />
                                                                </div>
                                                            </Link>
                                                            <div className={cx('show_name')}>
                                                                <h6>
                                                                    <Link to="#">{(mealdata.dinner) ? mealdata.dinner.vegan.data.name : 'Dessert'}</Link>
                                                                </h6>
                                                                <div className={cx('btn_follow1')}>
                                                                    <span className={cx('follow')}>{(mealdata.dinner) ? mealdata.dinner.vegan.data.nPerson : '1'} serving</span>
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
                                        <span>{Math.floor(nutrion.calories)} kcal</span>
                                    </td>
                                </div>

                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Protein</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('green')}>{nutrion.protein.toFixed(2)} g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Carbs</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('orange')}>{nutrion.carbs.toFixed(2)} g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row1')}>
                                    <th className={cx('th_nutri')}>Fats</th>
                                    <td className={cx('text_right')}>
                                        <span className={cx('purple')}>{nutrion.fat.toFixed(2)} g</span>
                                    </td>
                                </div>

                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Sugars</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}>{nutrion.sugar.toFixed(2)} g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Fiber</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}>{nutrion.fiber.toFixed(2)} g</span>
                                    </td>
                                </div>
                                <div className={cx('table_row2')}>
                                    <th className={cx('th_nutri')}>Sodium</th>
                                    <td className={cx('text_right1')}>
                                        <span className={cx('subcribed')}>{nutrion.sodium.toFixed(2)} g</span>
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