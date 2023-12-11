import React, { useState, useEffect, useRef } from "react"
import styles from "../../pages/packgakeAds/ManageArticles.module.scss"
import classNames from 'classnames/bind'
import images from "~/assets/images";
import { Link } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants";

const cx = classNames.bind(styles)
function ActivePostModal({ setShowActivePostModal, filteredArticles, _id }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const Account_id = profileInformation._id;
    //thêm state lưu ảnh
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isNewImageSelected, setIsNewImageSelected] = useState(false);
    const [fileSend, setFile] = useState(null)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setIsNewImageSelected(true);
                console.log('Selected image:', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };
    const handleImageUpload = (event) => {
        const selectedFiles = event.target.files;
        const filesArray = Array.from(selectedFiles);
        setSelectedImage(filesArray);

        // Update articleData with files

    };


    const handleActivePost = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`${apiUrl}/ads/active`, { _id: _id },
                // const response = await axios.post(`${apiUrl}/auth/createCode`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleActiveBanner = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`${apiUrl}/ads/activeBanner`, { _id: _id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateImage = async (e) => {
        e.preventDefault();
        try {
            if (!isNewImageSelected) {
                console.log('No new image selected.');
                return;
            }
            const formData = new FormData();
            formData.append('file', fileSend);
            formData.append('_id', _id)
            const response = await axios.patch(`${apiUrl}/ads/update`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div className={cx('createIdeaHeader')}>
                    <h1 className={cx('createIdea')}>Article Ads</h1>
                    <div className={cx('exit_cmt_modal')} onClick={() => setShowActivePostModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <div className={cx('bottom-ads')}>
                        <div>
                            Choose a photo for the ads
                        </div>
                        <div className={cx('upload-file')}>
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                            />
                            <label htmlFor="imageInput" className={cx('choose-img-label')}>
                                Choose Image
                            </label>
                        </div>

                    </div>
                    <div className={cx("dz-message-text")}>
                        <div className={cx("upload-banner")}>
                            <div className={cx('choose-img')}>
                                {selectedImage ? (
                                    <div style={{ marginTop: '-74px' }}>
                                        <img
                                            src={selectedImage}
                                            alt="Selected Image"
                                        />
                                    </div>
                                ) : (
                                    filteredArticles.map((article, index) => (
                                        <div key={index}>
                                            {article.ads.map((ads) => (

                                                <div style={{ marginTop: '-95px' }} key={ads._id}>
                                                    {ads._id == _id && ads.image != null && (
                                                        <img
                                                            src={ads.image}
                                                            alt={`Ads ${ads._id}`}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('update-active')}>
                    <button type="button" onClick={handleUpdateImage} className={cx('btn-update')}>
                        Update Image
                    </button>
                </div>
                <div className={cx('active')}>
                    <div>
                        <button type="button" onClick={handleActivePost} style={{ marginRight: "40px" }} className={cx('btn-active')}>
                            Active/Disable ads
                        </button>
                    </div>
                    <div>
                        <button type="submit" onClick={handleActiveBanner} style={{ marginLeft: "70px" }} className={cx('btn-active')} >
                            Active/Disable Banner
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ActivePostModal;