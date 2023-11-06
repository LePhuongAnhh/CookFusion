import React, { useState, useEffect, useRef } from "react"
import EditProfile from "../user/profile/EditProfile";
import BlogForm from "~/components/Modal/BlogForm";
import styles from '../user/profile/Profile.module.scss'
import classNames from 'classnames/bind'
import images from "~/assets/images";
import { Link } from "react-router-dom";
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from '~/constants/constants';
const cx = classNames.bind(styles)
function ProfileAds() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
    const [activeTab, setActiveTab] = useState('credit-card');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };




    return (
        <>
            <div className={cx("w-full", "h-full", "container-profile")}>
                <div className="w-full h-auto shadow rounded-md">
                    <div className="max-w-6xl h-full mx-auto p-1">
                        {/* PHAN DAU  */}
                        <div
                            className="max-h-300 w-full rounded-lg relative"
                            style={{
                                backgroundImage: `url('https://random.imagecdn.app/1920/1080')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '5px',
                                height: '300px',
                                marginTop: "55px",
                            }}
                        >
                            <div
                                className="absolute  w-full flex items-center justify-center"
                                style={{ bottom: '-15px' }}
                            >
                                <div className="w-35 h-35 rounded-full bg-gray-300 border-4  d-flex align-items-center justify-content-center">
                                    <img
                                        className="rounded-circle img-fluid"
                                        src={profileInformation.avatar}
                                        alt="avatar "
                                        style={{ marginTop: "18rem", width: "180px", height: "180px" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-5xl h-full mx-auto">
                            <div className="flex flex-col space-y-2 mt-3 items-center justify-center pb-3 border-b-2">
                                <p
                                    onClick={() => setShowUpdateProfileModal(true)}
                                    className={cx("text-4xl", "font-bold", " d-flex", "align-items-center", "justify-content-center", 'edit-profile')}
                                >
                                    Edit Profile
                                </p>
                                <p className={cx("text-4xl", "font-bold", " d-flex", "align-items-center", "justify-content-center", 'name-account')}>{profileInformation.name}</p>
                            </div>
                            <div className="mt-1 flex items-center justify-between">

                                <div className="flex items-center space-x-2">
                                    <div className={cx("left")}>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-average")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> Average
                                        </button>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-recipe")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> Like
                                        </button>
                                    </div>
                                    <div className={cx("right")}>
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-blog")} >
                                            <i className="fas fa-plus-circle  mr-2"></i>comment
                                        </button>"
                                        <button className={cx("px-3", "py-1.5", " bg-gray-200", "rounded-md", "btn-plan")} >
                                            <i className="bi bi-pencil-square" title="Edit Profile"></i> share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* BODY  */}
                <div className={cx("profile-body")}>
                    <div className={cx("body-right")}>
                        {/* treen  */}
                        <div className="card-top" style={{ marginTop: "30px" }}>
                            <div className="card-header">
                                {/* CLICK  */}
                                <div className=" pt-4 pl-2 pr-2 pb-2">
                                    <ul role="tablist" className="nav rounded mb-3">
                                        <li className={cx("nav-item")}>
                                            <div onClick={() => handleTabChange('credit-card')} className={`${activeTab === 'credit-card' ? 'active' : ''}`} >
                                                <i className="fas fa-credit-card mr-2"></i> Article
                                            </div>
                                        </li>
                                        <li className={cx("nav-item")} style={{ marginLeft: "40px" }}>
                                            <div onClick={() => handleTabChange('paypal')} className={`${activeTab === 'paypal' ? 'active' : ''}`}>
                                                <i className="fab fa-paypal mr-2"></i> Management
                                            </div>
                                        </li>
                                        <li className={cx("nav-item")} style={{ marginLeft: "40px" }}>
                                            <div onClick={() => handleTabChange('profile')} className={`${activeTab === 'paypal' ? 'active' : ''}`}>
                                                <i className="fab fa-paypal mr-2"></i> Profile
                                            </div>
                                        </li>
                                        <li className={cx("nav-item")} style={{ marginLeft: "40px" }}>
                                            <div onClick={() => handleTabChange('setting')} className={`${activeTab === 'paypal' ? 'active' : ''}`}>
                                                <i className="fab fa-paypal mr-2"></i> Setting
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content">
                            {/* //Active */}
                            <div id="credit-card" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active pt-3' : ''}`}>
                                <div className="row d-flex justify-content-center mt-100 mb-100">
                                    <div className="col-lg-6" style={{ width: "100%" }}>
                                        <div className="card">
                                            <BlogForm />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Managmnt */}
                            <div id="paypal" className={`tab-pane fade ${activeTab === 'paypal' ? 'show active pt-3' : ''}`}>
                                <div className="page-content page-container" id="page-content">
                                    {/* <div className="card" style={{marginBottom:"20px"}}>
                                        <div className="row d-flex justify-content-center mt-100 mb-100">
                                            <ul className={cx("list-style")}>
                                                <li className={cx("d-flex", "no-block", "card-body", "border-top")}>
                                                    <input
                                                    className={cx("input-check")}
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <div>
                                                        <img
                                                            src={selectedImage || images.Anh2}
                                                            className={cx("border-round")}
                                                            onClick={handleImageClick}
                                                            title="Select photos to display when advertising"
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            style={{ display: 'none' }}
                                                            ref={imageInputRef}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link to="#" className={cx("title-choose")} data-abc="true">Congratulation to AAA For new investment</Link>
                                                        <span style={{ display: "block" }}>AAA has invested $2M in MMM. we are happy to working forward with AAA.</span>
                                                    </div>
                                                </li><li className={cx("d-flex", "no-block", "card-body", "border-top")}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <div>
                                                        <img
                                                            src={selectedImage || images.Anh2}
                                                            className={cx("border-round")}
                                                            onClick={handleImageClick}
                                                            title="Select photos to display when advertising"
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            style={{ display: 'none' }}
                                                            ref={imageInputRef}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link to="#" className={cx("title-choose")} data-abc="true">Congratulation to AAA For new investment</Link>
                                                        <span style={{ display: "block" }}>AAA has invested $2M in MMM. we are happy to working forward with AAA.</span>
                                                    </div>
                                                </li><li className={cx("d-flex", "no-block", "card-body", "border-top")}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <div>
                                                        <img
                                                            src={selectedImage || images.Anh2}
                                                            className={cx("border-round")}
                                                            onClick={handleImageClick}
                                                            title="Select photos to display when advertising"
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            style={{ display: 'none' }}
                                                            ref={imageInputRef}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link to="#" className="m-b-0 font-medium p-0" data-abc="true">Congratulation to AAA For new investment</Link>
                                                        <span style={{ display: "block" }}>AAA has invested $2M in MMM. we are happy to working forward with AAA.</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            {/* Profile */}
                            <div id="profile" className={`tab-pane fade ${activeTab === 'profile' ? 'show active pt-3' : ''}`}>
                                <div className="page-content page-container" id="page-content">
                                    <div className="card">
                                        hko
                                    </div>
                                </div>
                            </div>

                            {/* Setting */}
                            <div id="setting" className={`tab-pane fade ${activeTab === 'setting' ? 'show active pt-3' : ''}`}>
                                <div className="page-content page-container" id="page-content">
                                    <div className="card">
                                        hko cjsd
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {showUpdateProfileModal && < EditProfile setShowUpdateProfileModal={setShowUpdateProfileModal} />}
        </>
    );
}

export default ProfileAds;