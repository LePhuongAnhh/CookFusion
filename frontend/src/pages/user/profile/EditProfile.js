import styles from './EditProfile.module.scss'
import classNames from 'classnames/bind'
import React, { useRef, useState, Component } from 'react';
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import axios from 'axios'
import { apiUrl } from '~/constants/constants';

const cx = classNames.bind(styles)
function EditProfile({ setShowUpdateProfileModal }) {
    const [gender, setGender] = useState(''); // Trạng thái ban đầu là rỗng

    const handleGenderChange = (event) => {
        setGender(event.target.value); // Cập nhật giới tính khi người dùng thay đổi
    };

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
    return (
        <div className={cx('modalDeleteIdea')} >
            <div className={cx('modalContentDeleteIdea')}>
                <div className="container rounded bg-white mt-5">
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img className="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width="90" />

                                <span className="font-weight-bold" style={{ cursor: "pointer" }}>Edit avatar</span>
                                <span className="text-black-50">Name Account</span>
                                <span>Email</span>
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
                                <form>
                                    <div className="row mt-2">
                                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Full name" /></div>
                                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Username" /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Email" /></div>
                                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Date of Birth" /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Address" /></div>
                                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Country" /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <select className="form-control" value={gender} onChange={handleGenderChange}>
                                                <option className="form-control" value="">Chọn giới tính</option>
                                                <option className="form-control" value="male">Male</option>
                                                <option className="form-control" value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-5 text-right">
                                        <button className="btn btn-primary profile-button" style={{ float: "right", marginTop: "-12px" }} type="button">Save Profile</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;