import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./AutoPlan.module.scss"
import classNames from 'classnames/bind'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl, PROFILE_INFORMATION } from '~/constants/constants';
import axios from 'axios';
import BackButton from '~/components/button/BackButton';

const cx = classNames.bind(styles)
// const location = useLocation();
const AutoPlan = () => {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION))
    const User_id = profileInformation._id
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const navigate = useNavigate();
    const location = useLocation();

    //chọn calo
    const [selectedOptionCalorie, setSelectedOptionCalorie] = useState('0');
    const handleSelectChangeCalorie = (event) => {
        setSelectedOptionCalorie(event.target.value || '0');
    };

    //chọn bữa ăn
    const [meal, setSelectedOptionMeal] = useState('3');
    const handleSelectChangeMeal = (event) => {
        setSelectedOptionMeal(event.target.value);
    };
    //chon activity
    const [ActivityMode_id, setSelectedActivity] = useState('');
    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
    };

    //chọn gender
    const [selectedGender, setSelectedGender] = useState('male');
    //thong bao lỗi
    const [errorAge, setErrorAge] = useState('');
    const [errorHigh, setErrorHigh] = useState('');

    //
    const [userInput, setUserInput] = useState({
        User_id: User_id,
        age: '',
        high: '',
        weight: '',
        isMale: selectedGender === 'male',
    });

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        setUserInput((prevUserInput) => ({
            ...prevUserInput,
            isMale: gender === 'male',
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericValue = name === 'high' || name === 'weight' ? parseInt(value, 10) : value;
        setUserInput((prevUserInput) => ({
            ...prevUserInput,
            [name]: value,
        }));
    };

    //activityMode
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
                    //Nếu danh sách không rỗng, đặt giá trị mặc định là ID của cái đầu tiên
                    if (activityMode.data.data.length > 0) {
                        setSelectedActivity(activityMode.data.data[0]._id);
                    }
                }
                // if (getuserHealth.data.success) {

                //     setUserHealth(getuserHealth.data.data.data)
                // }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])

    //chuyenqau trang sau
    const handleNextButtonClick = async () => {
        setErrorAge('');
        setErrorHigh('');
        if (!userInput.high) {
            setErrorHigh("Vui lòng nhập chiều cao trước khi chuyển tiếp.");
            return;
        }
        if (!userInput.age) {
            setErrorAge("Vui lòng nhập tuổi trước khi chuyển tiếp.");
            return;
        }
        const combinedUserData = {
            User_id,
            age: parseInt(userInput.age, 10),
            high: parseInt(userInput.high, 10),
            weight: parseInt(userInput.weight, 10),
            isMale: userInput.isMale,
            selectedOptionCalorie: parseInt(selectedOptionCalorie, 10),
            meal: parseInt(meal, 10),
            ActivityMode_id,
        };
        navigate('/step2', { state: { userData: combinedUserData } });
        console.log('Data sent to Step2_auto:', combinedUserData);
    };

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
                                    <input
                                        type="radio"
                                        className={cx('input_hide')}
                                        id="maleRadio"
                                        checked={selectedGender === 'male'}
                                        onChange={() => handleGenderChange('male')}
                                    />
                                    <label className={cx('gender_wrapper')} htmlFor="maleRadio">
                                        <img
                                            src={selectedGender === 'male' ? images.Male_change : images.Male}
                                            className={cx('gender_icon')}
                                        />
                                        <span className={cx('gender_choose')}>Male</span>
                                    </label>

                                    <input
                                        type="radio"
                                        className={cx('input_hide')}
                                        id="femaleRadio"
                                        checked={selectedGender === 'female'}
                                        onChange={() => handleGenderChange('female')}
                                    />
                                    <label className={cx('gender_wrapper')} htmlFor="femaleRadio">
                                        <img
                                            src={selectedGender === 'female' ? images.Female_change : images.Female}
                                            className={cx('gender_icon')}
                                        />
                                        <span className={cx('gender_choose')}>Female</span>
                                    </label>
                                </div>
                            </div>

                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>Cân nặng</div>
                                <div className={cx('while_block_wrapper')}>
                                    <input
                                        placeholder="Enter your weight"
                                        min="1"
                                        type='number'
                                        name='weight'
                                        value={userInput.weight}
                                        onChange={handleInputChange}
                                        className={cx('input_text')}
                                    /> &nbsp; kg
                                </div>
                            </div>

                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>Chiều cao</div>
                                <div className={cx('while_block_wrapper')}>
                                    <input
                                        required
                                        min="1"
                                        type='number'
                                        name='high'
                                        value={userInput.high}
                                        onChange={handleInputChange}
                                        className={cx('input_text')}
                                        placeholder="Enter your height"
                                    />
                                    &nbsp; cm
                                </div>
                            </div>
                            {errorHigh && <div className={cx('error-message')}>{errorHigh}</div>}
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>Tuổi</div>
                                <div className={cx('while_block_wrapper')}>
                                    <input
                                        required
                                        min="1"
                                        type="number"
                                        name="age"
                                        value={userInput.age}
                                        onChange={handleInputChange}
                                        className={cx('input_text')}
                                        placeholder="Enter your age"
                                    /> &nbsp; years
                                </div>
                            </div>
                            {errorAge && <div className={cx('error-message')}>{errorAge}</div>}
                            <div className={cx('while_block')}>
                                <div className={cx('block_title')}>Your activity mode</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select
                                        value={ActivityMode_id}
                                        onChange={handleActivityChange}
                                        className={cx('select_calorie')}
                                        placeholder="calories">
                                        {listActivity.length > 0 &&
                                            listActivity.map((activity) => (
                                                <option value={activity._id}>
                                                    {activity.description}
                                                </option>
                                            ))}
                                    </select>
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
                                </div>
                                <div className={cx('block_title')}>In</div>
                                <div className={cx('while_block_wrapper')}>
                                    <select value={meal} onChange={handleSelectChangeMeal} className={cx('select_calorie')} placeholder="calories">
                                        <option value="3"> 3 meals</option>
                                        <option value="4"> 4 meals</option>
                                        <option value="5"> 5 meals</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={cx('buttons_wrapper')}>

                            <BackButton />
                            <button onClick={handleNextButtonClick} className={cx('next_btn')} >Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default AutoPlan