import styles from './EditProfile.module.scss'
import classNames from 'classnames/bind'
import React, { useState, } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from '~/constants/constants';

const cx = classNames.bind(styles)
function EditProfile({ setShowUpdateProfileModal }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));

    profileInformation.dob = new Date(profileInformation.dob).toISOString().substr(0, 10);

    const navigate = useNavigate();
    const [updateProfileForm, setUpdateProfileForm] = useState(profileInformation);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateProfileForm({ ...updateProfileForm, [name]: value });
    };
    // const handleGenderChange = (event) => {
    //     setUpdateProfileForm({ ...updateProfileForm, Gender: event.target.value });
    // };
    console.log('update data:', updateProfileForm,)

    const updateProfile = async (event) => {
        // Ngăn chặn sự kiện mặc định của form
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', updateProfileForm._id);
        formData.append('name', updateProfileForm.name);
        formData.append('username', updateProfileForm.username);
        formData.append('email', updateProfileForm.email);
        formData.append('dob', updateProfileForm.dob);
        formData.append('gender', updateProfileForm.gender);
        formData.append('country', updateProfileForm.country);
        formData.append('address', updateProfileForm.address);

        try {
            const response = await axios.patch(`${apiUrl}/user/updateProfile`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.data.success) {
                console.log('Profile updated successfully');
                navigate('/profile');
            }
        } catch (error) {
            if (error.response.statusCode === 401) {
                alert('Unauthorized');
            }
            console.log(error.response.data.message)
        }
    };



    return (
        <div className={cx('modalDeleteIdea')} >
            <div className={cx('modalContentDeleteIdea')}>
                <div className="container rounded bg-white mt-5">
                    <form onSubmit={updateProfile}>
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img className="rounded-circle mt-5"
                                        src={profileInformation.avatar}
                                        width="90"
                                    />
                                    <span className="font-weight-bold" style={{ cursor: "pointer" }}>Edit avatar</span>
                                    <span className="text-black-50">{updateProfileForm.name}</span>
                                    <span>{updateProfileForm.email}</span>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                            <h6 className={cx("text-right")} onClick={() => setShowUpdateProfileModal(false)}>Back to home</h6>
                                        </div>
                                        <h6 className={cx("text-right")}>Edit Profile</h6>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={updateProfileForm.name}
                                                name='name'
                                                onChange={handleInputChange}
                                                placeholder="Full name"
                                            />
                                        </div>
                                        <input value={updateProfileForm._id} hidden />
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={updateProfileForm.username}
                                                name='userName'
                                                onChange={handleInputChange}
                                                placeholder="Username"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <input
                                                type="email"
                                                value={updateProfileForm.email}
                                                name='email'
                                                className="form-control"
                                                // onChange={handleInputChange}
                                                ReadOnly
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="date"
                                                value={updateProfileForm.dob}
                                                name='dob'
                                                className="form-control"
                                                onChange={handleInputChange}
                                                placeholder="Date of Birth"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                value={updateProfileForm.address}
                                                name="address"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                placeholder="Address"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                value={updateProfileForm.country}
                                                name="country "
                                                className="form-control"
                                                onChange={handleInputChange}
                                                placeholder="Country"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <select
                                                className="form-control"
                                                name='gender'
                                                onChange={handleInputChange}
                                            >
                                                <option className="form-control" value="">{updateProfileForm.gender} </option>
                                                <option className="form-control" value="Male">Male</option>
                                                <option className="form-control" value="Female">Female</option>
                                                {/* <option className="form-control" value="Female">nu</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    {/* <div className={cx('modalGender')}>
                                        <label>Gender: </label>
                                        <select
                                            value={updateProfileForm.gender}
                                            name='gender'
                                            onChange={handleInputChange}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div> */}
                                    <div className="mt-5 text-right">
                                        <button type="submit" className="btn btn-primary profile-button" style={{ float: "right", marginTop: "-12px" }} >Save Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;