import React, { useState, useEffect } from 'react';

import styles from "./SurveyUser.module.scss"
import classNames from 'classnames/bind'
import { Dropdown } from 'react-bootstrap';
import EditProfile from '~/pages/user/profile/EditProfile';
import { apiUrl, ACCESS_TOKEN, PROFILE_INFORMATION } from '~/constants/constants';
import axios from 'axios';
import { io } from 'socket.io-client'

const cx = classNames.bind(styles)
const socket = io('http://localhost:9996/', { transports: ['websocket'] })
function SurveyUSer({ setShowSurveyUserModal }) {

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const User_id = profileInformation._id
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(true)
    //select category 
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    // DROPDOWN 
    const [selectedDisease, setSelectedDisease] = useState({ value: 'Bth', label: 'Toi khoe manh' });
    const [diseaseOptions, setDisease] = useState([
    ])

    const [userInput, setUserInput] = useState({
        User_id: User_id,
        high: 0,
        weight: 0,
        Disease_id: selectedDisease.value,
    });
    console.log(userInput);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numericValue = name === 'high' || name === 'weight' ? parseFloat(value) : value;
        setUserInput((prevUserInput) => ({
            ...prevUserInput,
            [name]: numericValue,
        }));
    };

    //selet DESEASE

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listDisease = await axios.get(`${apiUrl}/disease/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (listDisease.data.success) {
                    listDisease.data.data.data.map((disease, index) => {
                        if (index !== 4) diseaseOptions[index] = { value: disease._id, label: disease.name };
                    });
                    setDisease(diseaseOptions);
                    setSelectedDisease({ value: listDisease.data.data.data[4]._id, label: listDisease.data.data.data[4].name });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [accessToken]); // Include any other dependencies if needed

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/category/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data.success) {
                    setCategories(response.data.listCategory);
                }
                // Emit socket event with the list of categories
                socket.emit('getcategories', { _id: User_id, categories: response.data.listCategory });
            } catch (error) {
                console.log(error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [accessToken, User_id, socket]);

    const handleSubmitSurvey = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/userhealth/addnewafterregister`, userInput,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('Response:', response);
        } catch (error) {

        }
    }





    return (
        <>
            <div className={cx('modalDeleteIdea')}>
                <div className={cx('modalContentDeleteIdea')}>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>Tell us about your health</h1>
                        <div
                            className={cx('exit_cmt_modal')}
                            // onClick={onComplete}>
                            onClick={() => setShowSurveyUserModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                    <div className={cx('space')}></div>

                    <div className={cx('post_status')}>
                        <div className="container-fluid" id="grad1">
                            <div className="row justify-content-center mt-0">
                                {/* <form onClick={handleSubmitSurvey}> */}
                                <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
                                    <div className="px-0 pt-3 pb-0 mb-3">
                                        <p className={cx('back-food')}>You like</p>
                                        <div className={cx("wrap-input100 validate-input")}>
                                            <select
                                                name="category"
                                                value={userInput.category}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                {/* <option value="">Select a category</option> */}
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <p className={cx('beenh')}>Do you have any disease?</p>
                                        <div className={cx('allergy_card')}>
                                            <select
                                                name='Disease_id'
                                                value={userInput.Disease_id}
                                                onChange={handleInputChange}
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
                                    </div>
                                    <div>
                                        <button onClick={handleSubmitSurvey} type='submit' > Submit</button>
                                    </div>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            {
                showUpdateProfileModal && < EditProfile setShowUpdateProfileModal={setShowUpdateProfileModal} />
            }

        </>
    );
}

export default SurveyUSer;