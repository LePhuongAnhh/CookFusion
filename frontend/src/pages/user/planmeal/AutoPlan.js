import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./AutoPlan.module.scss"
import classNames from 'classnames/bind'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';
import axios from 'axios';
import BackButton from '~/components/button/BackButton';

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
    const [listActivity, setListActivity] = useState([])
    const [userhealth, setUserHealth] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const [activityMode, getuserHealth] = await Promise.all([
                    axios.get(`${apiUrl}/activitymode/getall`),
                    axios.get(`${apiUrl}/userhealth/get`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }),
                ])
                if (activityMode.data.success) {
                    setListActivity(activityMode.data.data)
                }
                if (getuserHealth.data.success) {
                    console.log(getuserHealth.data.data.data)
                    setUserHealth(getuserHealth.data.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <div className={cx('auto_plan')}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('auto_plan_contain')}>
                <div className={cx('auto_header')}>
                    <div className={cx('header_wrapper')}>
                        <img src={images.header_planmeal} />
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
                                    <input min="1" type='number' name='weight' value={(userhealth) ? userhealth.weight : 0} className={cx('input_text')} /> &nbsp; kg
                                </div>
                            </div>
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>with high</div>
                                <div className={cx('while_block_wrapper')}>
                                    <input min="1" type='number' name='high' value={(userhealth) ? userhealth.high : 0} className={cx('input_text')} /> &nbsp; cm
                                </div>
                            </div>
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>and age</div>
                                <div className={cx('while_block_wrapper')}>
                                    <input min="1" type='number' name='age' value="1" className={cx('input_text')} /> &nbsp; years
                                </div>
                            </div>
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>Your activity mode</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select value={selectedOptionCalorie} onChange={handleSelectChangeCalorie} className={cx('select_calorie')} placeholder="calories">
                                        {listActivity.length > 0 &&
                                            listActivity.map((activity) => (
                                                <option value={activity._id}>
                                                    {activity.description}
                                                </option>
                                            ))}
                                    </select>

                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                            </div>
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>I want to eat</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select value={selectedOptionCalorie} onChange={handleSelectChangeCalorie} className={cx('select_calorie')} placeholder="calories">
                                        <option value="0"> Auto calculate calories </option>
                                        <option value="500"> 500 Calories</option>
                                        <option value="1000"> 1000 Calories</option>
                                        <option value="1500"> 1500 Calories</option>
                                        <option value="2000"> {'>'} 2000 Calories </option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                                <div className={cx('block_title')}>In</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select value={selectedOptionMeal} onChange={handleSelectChangeMeal} className={cx('select_calorie')} placeholder="calories">
                                        <option value="3"> 3 meals</option>
                                        <option value="4"> 4 meals</option>
                                        <option value="5"> 5 meals</option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                            </div>
                        </div>
                        <div className={cx('buttons_wrapper')}>
                            <BackButton />
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