import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./AutoPlan.module.scss"
import classNames from 'classnames/bind'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
const AutoPlan = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [selectedOptionCalorie, setSelectedOptionCalorie] = useState('option1');
    const handleSelectChangeCalorie = (event) => {
        setSelectedOptionCalorie(event.target.value);
    };

    const [selectedOptionMeal, setSelectedOptionMeal] = useState('option1');
    const handleSelectChangeMeal = (event) => {
        setSelectedOptionMeal(event.target.value);
    };

    return (
        <div className={cx('auto_plan')}>
            <Navigation />
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('auto_plan_contain')}>
                <div className={cx('auto_header')}>
                    <div className={cx('header_wrapper')}>
                        <img src={images.auto_header} />
                        <div className={cx('deader_text')}></div>
                    </div>
                </div>
                <div className={cx('auto_body')}>
                    <div className={cx('auto_gird')}>
                        <div className={cx('step1')}>
                            <div className={cx('block_wrapper')}>
                                <span className={cx('block_title')}>I'm</span>
                                <div className={cx('gender_icon_wrapper')}>
                                    <input type='radio' className={cx('input_hide')} />
                                    <label className={cx('gender_wrapper')}>
                                        <img src={images.Male} className={cx('gender_icon')} />
                                        <img src={images.Male_change} className={cx('gender_icon')} hidden />
                                        <span className={cx('gender_choose')}>Male</span>
                                    </label>
                                    <input type='radio' className={cx('input_hide')} />
                                    <label className={cx('gender_wrapper')}>
                                        <img src={images.Female} className={cx('gender_icon')} />
                                        <img src={images.Female_change} className={cx('gender_icon')} hidden />
                                        <span className={cx('gender_choose')}>Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>I'm</div>
                                <div className={cx('while_block_wrapper')}>
                                    <input min="0" type='number' name='weight' placeholder='0' className={cx('input_text')} /> &nbsp; kg
                                </div>
                            </div>
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>In</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select value={selectedOptionMeal} onChange={handleSelectChangeMeal} className={cx('select_calorie')} placeholder="calories">
                                        <option value="option1"> 1 meal </option>
                                        <option value="option2"> 2 meals</option>
                                        <option value="option3"> 3 meals</option>
                                        <option value="option2"> 4 meals</option>
                                        <option value="option3"> 5 meals</option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                            </div>
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>I want to eat</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select value={selectedOptionCalorie} onChange={handleSelectChangeCalorie} className={cx('select_calorie')} placeholder="calories">
                                        <option value="option1"> {'<'} 100 Calories </option>
                                        <option value="option2"> 100 - 500 Calories</option>
                                        <option value="option3"> 500 - 1000 Calories</option>
                                        <option value="option2"> 1000 - 1500 Calories</option>
                                        <option value="option3"> 1500 - 2000 Calories</option>
                                        <option value="option1"> {'>'} 2000 Calories </option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                                <div className={cx('block_title')}>In</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select value={selectedOptionMeal} onChange={handleSelectChangeMeal} className={cx('select_calorie')} placeholder="calories">
                                        <option value="option1"> 1 meal </option>
                                        <option value="option2"> 2 meals</option>
                                        <option value="option3"> 3 meals</option>
                                        <option value="option2"> 4 meals</option>
                                        <option value="option3"> 5 meals</option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                            </div>
                        </div>
                        <div className={cx('buttons_wrapper')}>
                            <Link to="/planmeal" >
                                <button className={cx('back_btn')} >Back</button>
                            </Link>
                            <Link to="/step2" >
                                <button className={cx('next_btn')}>Next</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AutoPlan