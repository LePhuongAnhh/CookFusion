import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./AutoPlan.module.scss"
import classNames from 'classnames/bind'
import images from '~/assets/images'
import axios from 'axios';
import BackButton from '~/components/button/BackButton';
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
const Step2_auto = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const navigate = useNavigate();

    const location = useLocation();
    const [divStyles, setDivStyles] = useState({
        div1: { backgroundColor: 'initial', color: 'initial' },
        div2: { backgroundColor: 'initial', color: 'initial' },
        div3: { backgroundColor: 'initial', color: 'initial' },
        div4: { backgroundColor: 'initial', color: 'initial' },
        div5: { backgroundColor: 'initial', color: 'initial' },
        div6: { backgroundColor: 'initial', color: 'initial' },
    });
    const changeStyles = (clickedDiv, category) => {
        const newDivStyles = { ...divStyles };
        // Đặt màu nền và màu chữ của tất cả các div thành màu ban đầu
        for (let key in newDivStyles) {
            newDivStyles[key] = { backgroundColor: 'initial', color: '#007bff' };
        }
        // Đặt màu nền và màu chữ của div được nhấp vào
        newDivStyles[clickedDiv] = { backgroundColor: '#007bff', color: 'white' };
        // Cập nhật state với styles mới
        setDivStyles(newDivStyles);
        setSelectedDie(category);
    };

    // Access userData from the location state if it's defined
    const userData = location?.state?.userData;
    const [allergyInput, setAllergyInput] = useState('');
    const [selectedDie, setSelectedDie] = useState('');

    //selet DESEASE
    const [selectedDisease, setSelectedDisease] = useState({ value: 'Bth', label: 'Toi khoe manh' });
    const [diseaseOptions, setDisease] = useState([
        { value: 'Bth', label: 'Toi khoe manh' },
        { value: 'Tim', label: 'Disease 2' },
        { value: 'Gan', label: 'Disease 3' },
    ])
    const [listCategories, setListCategories] = useState([])
    // chọn giảm cân
    const [selectedLosingWeight, setSelectedLosingWeight] = useState('');
    const losingWeightOptions = [
        { value: '0.5', label: '0.5kg' },
        { value: '1', label: '1.0kg' },
        { value: '1.5', label: '1.5kg' },
        { value: '2.0', label: '2.0kg' },
        { value: '2/5', label: '2.5kg' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listCategory, listDisease] = await Promise.all([
                    axios.get(`${apiUrl}/mealplan/getallcategory`),
                    axios.get(`${apiUrl}/disease/getall`),
                ])
                if (listCategory.data.success && listDisease.data.success) {
                    setListCategories(listCategory.data.data)
                    listDisease.data.data.data.map((disease, index) => {
                        if (index != 4) diseaseOptions[index] = { value: disease._id, label: disease.name }
                    })
                    setDisease(diseaseOptions)
                    setSelectedDisease({ value: listDisease.data.data.data[4]._id, label: listDisease.data.data.data[4].name })
                }
            } catch (error) {
                console.log(error)
            }
        }
        new Promise(() => fetchData())
        const userData = location?.state?.userData;
    }, [location]);

    const handleCreateButtonClick = async () => {
        // Combine user data from different steps
        const combinedUserData = {
            ...userData,
            Disease_id: selectedDisease.value,
            loseWeight: (!selectedLosingWeight) ? 0 : parseFloat(selectedLosingWeight),
            blackFoodList: (!allergyInput) ? [] : allergyInput,
            selectedDie: selectedDie || 'Anything',
        };
        try {
            const response = await axios.post(
                `${apiUrl}/mealplan/createAutoMealPlan`,
                combinedUserData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            navigate('/result_auto', { state: { data: response.data } });
        } catch (error) {
            console.error("Error creating auto meal plan:", error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCreateButtonClick();
        }
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
                                <div className={cx('start_ingrs')}>
                                    <p className={cx('subtitle')}>Your die preferences</p>
                                    <div className={cx('die')}>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div1}
                                            onClick={() => changeStyles('div1', listCategories[0].name)}
                                        >
                                            <a className={cx('nav_link')}>
                                                <img src={images.Anything} />
                                                {(listCategories && listCategories[0]) ? listCategories[0].name : 'Anything'}
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div2}
                                            onClick={() => changeStyles('div2', listCategories[5].name)}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Medi} />
                                                {(listCategories && listCategories[5]) ? listCategories[5].name : ' Mediterranean'}
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div3}
                                            onClick={() => changeStyles('div3', listCategories[1].name)}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Keto} />
                                                {(listCategories && listCategories[1]) ? listCategories[1].name : 'Ketogenic'}
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div4}
                                            onClick={() => changeStyles('div4', listCategories[2].name)}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Paleo} />
                                                {(listCategories && listCategories[2]) ? listCategories[2].name : 'Paleo'}
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div5}
                                            onClick={() => changeStyles('div5', listCategories[4].name)}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Veget} />
                                                {(listCategories && listCategories[4]) ? listCategories[4].name : 'Vegetarian'}
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div6}
                                            onClick={() => changeStyles('div6', listCategories[3].name)}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Vegan} />
                                                {(listCategories && listCategories[3]) ? listCategories[3].name : ' Vegan'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('allergy_card')}>
                                    <div className={cx('text_allergy')}>Disease</div>
                                    <select
                                        name='disease'
                                        value={selectedDisease}
                                        onChange={(e) => setSelectedDisease(e.target.value)}
                                        className={cx('input_allergy')}
                                    >
                                        <option value={selectedDisease.value}>{selectedDisease.label}</option>
                                        {diseaseOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className={cx('allergy_card')}>
                                    <div className={cx('text_allergy')}>Losing Weight / week</div>
                                    <select
                                        name='loseWeight'
                                        value={selectedLosingWeight}
                                        onChange={(e) => setSelectedLosingWeight(e.target.value)}
                                        className={cx('input_allergy')}
                                    >
                                        <option value=''>None</option>
                                        {losingWeightOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={cx('allergy_card')}>
                                    <div className={cx('text_allergy')}>Allergy</div>
                                    <input
                                        type='text'
                                        name='blackFoodList'
                                        placeholder='You are allergic to'
                                        className={cx('input_allergy')}
                                        value={allergyInput}
                                        onChange={(e) => setAllergyInput(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('buttons_wrapper')}>
                            <BackButton />
                            <button className={cx('next_btn')} onClick={handleCreateButtonClick} onKeyPress={handleKeyPress}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step2_auto