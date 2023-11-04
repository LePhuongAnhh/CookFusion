import styles from './EditProfile.module.scss'
import classNames from 'classnames/bind'
import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import images from '~/assets/images'
import { useNavigate } from 'react-router-dom';
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from '~/constants/constants';

const cx = classNames.bind(styles)
function EditProfile({ setShowUpdateProfileModal }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    profileInformation.dob = new Date(profileInformation.dob).toISOString().substr(0, 10);

    //chọn và hiển thị ảnh
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };
    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedImage(URL.createObjectURL(selectedFile));
        }
    };

    const [updateProfileForm, setUpdateProfileForm] = useState(profileInformation);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateProfileForm({ ...updateProfileForm, [name]: value });
    };

    const updateProfile = async (event) => {
        // Ngăn chặn sự kiện mặc định của form
        event.preventDefault();
        const formData = new FormData();
        formData.append('_id', updateProfileForm._id);
        formData.append('name', updateProfileForm.name);
        formData.append('username', updateProfileForm.username);
        formData.append('email', updateProfileForm.email);
        formData.append('dob', updateProfileForm.dob);
        formData.append('gender', updateProfileForm.gender);
        formData.append('country', updateProfileForm.country);
        formData.append('address', updateProfileForm.address);
        formData.append('avatar', updateProfileForm.avatar);

        console.log(formData)
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
                // Cập nhật profileInformation từ updateProfileForm
                profileInformation._id = updateProfileForm._id;
                profileInformation.name = updateProfileForm.name;
                profileInformation.username = updateProfileForm.username;
                profileInformation.email = updateProfileForm.email;
                profileInformation.dob = updateProfileForm.dob;
                profileInformation.gender = updateProfileForm.gender;
                profileInformation.country = updateProfileForm.country;
                profileInformation.address = updateProfileForm.address;
                profileInformation.avatar = updateProfileForm.avatar;

                localStorage.setItem(PROFILE_INFORMATION, JSON.stringify(profileInformation));
                setShowUpdateProfileModal(false);
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
                <div className={cx('exit')} onClick={() => setShowUpdateProfileModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                                <ol className="breadcrumb mb-0">
                                    <li style={{ color: '#292e32' }} className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li style={{ color: '#292e32' }} className="breadcrumb-item"><Link to="#" onClick={() => setShowUpdateProfileModal(false)}>Profile</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{profileInformation.name} Profile's</li>
                                </ol>

                            </nav>
                        </div>
                    </div>
                    <form onSubmit={updateProfile}>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        {selectedImage ? (
                                            <img src={selectedImage} className="rounded-circle img-fluid" style={{ width: "150px", height: "150px" }} />
                                        ) : (
                                            <img src={profileInformation.avatar} alt='avt ne' className="rounded-circle img-fluid" style={{ width: "150px", height: "150px" }} />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="fileInput"
                                            style={{ display: 'none' }}
                                            onChange={handleImageUpload}
                                        />
                                        <h5 onClick={handleImageClick} className="my-3">Update avatar</h5>
                                        <p className="text-muted mb-1 my-3">{profileInformation.name}</p>
                                        <p className="text-muted mb-4">{profileInformation.email}</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button style={{ fontSize: '15px' }} type="submit" className="btn btn-outline-primary ms-1">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <input
                                            type='text'
                                            value={updateProfileForm._id}
                                            name='name'
                                            onChange={handleInputChange}
                                            className="text-muted mb-0"
                                            hidden
                                        />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    type='text'
                                                    value={updateProfileForm.name}
                                                    name='name'
                                                    onChange={handleInputChange}
                                                    className="text-muted mb-0" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Username</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    type='text'
                                                    className="text-muted mb-0"
                                                    value={updateProfileForm.username}
                                                    name='username'
                                                // onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    type='email'
                                                    className="text-muted mb-0"
                                                    value={updateProfileForm.email}
                                                    name='email'
                                                // onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Date of Birth</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    type="date"
                                                    value={updateProfileForm.dob}
                                                    name='dob'
                                                    className="text-muted mb-0"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Gender</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <select
                                                    style={{ border: 'none', padding: '0', background: 'transparent' }}
                                                    className="text-muted mb-0"
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
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    value={updateProfileForm.address}
                                                    name='address'
                                                    type='text'
                                                    onChange={handleInputChange}
                                                    className="text-muted mb-0"
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Country</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    value={updateProfileForm.country}
                                                    name='country'
                                                    type='text'
                                                    onChange={handleInputChange}
                                                    className="text-muted mb-0"
                                                />
                                            </div>
                                        </div>
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