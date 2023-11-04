import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { apiUrl, ACCESS_TOKEN, PROFILE_INFORMATION } from '~/constants/constants';
import classNames from 'classnames/bind'
import styles from "./ProfileAdmin.module.scss"
import images from '~/assets/images'
import ChangePassWord from '~/components/Modal/ChangePassword';

const cx = classNames.bind(styles)
function ProfileAdmin() {
    const [showChangePassWordModal, setShowChangePassWordModal] = useState(false)
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    profileInformation.dob = new Date(profileInformation.dob).toISOString().substr(0, 10);

    const [updateProfileForm, setUpdateProfileForm] = useState(profileInformation);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateProfileForm({ ...updateProfileForm, [name]: value });
    };

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
            // Cập nhật avatar trong state
            setUpdateProfileForm({ ...updateProfileForm, avatar: selectedFile });
        }
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
                profileInformation._id = updateProfileForm._id;
                profileInformation.name = updateProfileForm.name;
                profileInformation.username = updateProfileForm.username;
                profileInformation.email = updateProfileForm.email;
                profileInformation.dob = updateProfileForm.dob;
                profileInformation.gender = updateProfileForm.gender;
                profileInformation.address = updateProfileForm.address;
                profileInformation.avatar = updateProfileForm.avatar;

                localStorage.setItem(PROFILE_INFORMATION, JSON.stringify(profileInformation));
            }
        } catch (error) {
            if (error.response.statusCode === 401) {
                alert('Unauthorized');
            }
            console.log(error.response.data.message)
        }
    };

    return (
        <div>
            {/* <!-- start page title --> */}
            < div className={cx('row')} >
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Dashboard</h4>
                    </div>
                </div>
            </ div>
            {/* <!-- end page title -->  */}
            < div className={cx('row')} >
                < div className={cx('layout_page')} >
                    <div div className={cx('header_info')} >
                        <div className={cx('header_gird')}>
                            <div className={cx('account_setting')}>
                                <button className={cx('action_btn')}>
                                    <div className={cx('item_setting')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                        </svg>
                                        <span className={cx('title_account')}> Account</span>
                                    </div>
                                </button>
                                <button onClick={() => setShowChangePassWordModal(true)} className={cx('action_btn')}>
                                    <div className={cx('item_setting')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                                        </svg>
                                        <span > Security</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div >
                    {/* body  */}
                    < div className={cx('body_info')} >
                        <div className={cx('body_info_card')}>
                            <form onSubmit={updateProfile}>
                                <div className={cx('body_container')}>
                                    {/* update avatar  */}
                                    <div className={cx('update_avt')}>
                                        <div className={cx('update_gird')}>
                                            {selectedImage ? (
                                                <img src={selectedImage} className={cx('show_avt')} />
                                            ) : (
                                                <img src={profileInformation.avatar} alt='avt ne' className={cx('show_avt')} />
                                            )}
                                            <div className={cx('update_right')}>
                                                <label onClick={handleImageClick} className={cx('update_photo')}>
                                                    Update new photo
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="fileInput"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageUpload}
                                                />
                                                <span className={cx('text_name')}>
                                                    Allowed PNG or JPEG. Max size of 800Kb.
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    {/* update info  */}
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <div className={cx('input_info')}>
                                                <div className="form-outline" style={{ background: 'inherit' }}>
                                                    <input type="text" id="typeText" className={cx('form-control')} style={{ backgroundColor: 'transparent', fontSize: '16px', padding: '1rem 0.75rem' }}
                                                        placeholder='Username'
                                                        value={updateProfileForm.username}
                                                        name='username'
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type='text'
                                        value={updateProfileForm._id}
                                        name='name'
                                        onChange={handleInputChange}
                                        className="text-muted mb-0"
                                        hidden
                                    />
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <div className={cx('input_info')}>
                                                <div className="form-outline" style={{ background: 'inherit' }}>
                                                    <input type="email" id="typeText" className={cx('form-control')} style={{ backgroundColor: 'transparent', fontSize: '16px', padding: '1rem 0.75rem' }} placeholder='Email'
                                                        value={updateProfileForm.email}
                                                        name='email'
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <div className={cx('input_info')}>
                                                <div className="form-outline" style={{ background: 'inherit' }}>
                                                    <input type="text" className={cx('form-control')} style={{ backgroundColor: 'transparent', fontSize: '16px', padding: '1rem 0.75rem' }}
                                                        placeholder='Full Name'
                                                        value={updateProfileForm.name}
                                                        name='name'
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <div className={cx('input_info')}>
                                                <div className="form-outline" style={{ background: 'inherit' }}>
                                                    <input type="date" id="typeText" className={cx('form-control')} style={{ backgroundColor: 'transparent', fontSize: '16px', padding: '1rem 0.75rem' }}
                                                        placeholder='Birthday'
                                                        value={updateProfileForm.dob}
                                                        name='dob'
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <div className={cx('input_info')}>
                                                <div className="form-outline" style={{ background: 'inherit' }}>
                                                    <input type="text" id="typeText" className={cx('form-control')} style={{ backgroundColor: 'transparent', fontSize: '16px', padding: '1rem 0.75rem' }} placeholder='Address'
                                                        name='address'
                                                        onChange={handleInputChange}
                                                        value={updateProfileForm.address} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <div className={cx('input_info')}>
                                                <div className="form-outline" style={{ background: 'inherit' }}>
                                                    <select id="genderSelect" className={cx('form-control')} style={{ backgroundColor: 'transparent', fontSize: '16px', padding: '1rem 0.75rem' }}
                                                        name='gender'
                                                        onChange={handleInputChange}>
                                                        <option className="form-control" value="">{updateProfileForm.gender} </option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('save_change')}>
                                        <button className={cx('btn_save')}>Save changes</button>
                                        <button className={cx('btn_reset')}>Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            </div >
            {showChangePassWordModal && < ChangePassWord setShowChangePassWordModal={setShowChangePassWordModal} />}
        </div>
    )
}
export default ProfileAdmin