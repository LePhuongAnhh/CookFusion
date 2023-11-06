import React, { useState, useEffect, useRef } from "react"
import styles from "./ManageArticles.module.scss"
import classNames from 'classnames/bind'
import images from "~/assets/images";
import { Link } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

const cx = classNames.bind(styles)
function ManageArticles() {
    //checkbox
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    //chon image
    const [selectedImage, setSelectedImage] = useState(null);
    const imageInputRef = useRef(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageClick = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    //choose banner
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);
    const bannerImageInputRef = useRef(null);

    const handleBannerChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                setSelectedBannerImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerClick = () => {
        if (bannerImageInputRef.current) {
            bannerImageInputRef.current.click();
        }
    };

    const handleUpdateBannerImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                setSelectedBannerImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };




    return (
        <>
            <div className={cx('manageArticles')}>
                <div className={cx('manageArticles-container')}>
                    <div className="card-article" style={{ marginTop: "120px", marginBottom: '30px' }}>
                        <div className={cx('header-title-card')}>
                            <div className={cx('header-title-text')}>
                                Set up advertising
                            </div>
                        </div>
                        <div className={cx('header2')}>
                            <div className={cx('header2-title')}>
                                <i class="bi bi-alexa"></i>
                                &nbsp; Select article and banners
                            </div>
                        </div>
                        <div className={cx('modal-choose')}>
                            <div className={cx('border-choose')}>
                                {/* //dau */}
                                <div className={cx('header-body')}>
                                    <div className={cx('header-body--title')}>So great! It looks like your account is already on Ads</div>
                                    <div className={cx('header-body--text')}>You can boost your posts as you choose. You can also now create new Banners for your posts.</div>
                                    <div className={cx('body-ads-gird')}>
                                        <div className={cx('header-left')}>
                                            Select articles to advertise
                                        </div>
                                        <div className={cx('header-right')}>
                                            Hoan thanh
                                        </div>
                                    </div>
                                </div>


                                {/* than */}
                                <div className={cx('body-ads')}>
                                    <ul className={cx("list-style")}>
                                        <li className={cx("d-flex", "no-block", "card-body", "border-top")}>
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
                                            <div>
                                                <div className={cx('setting-ads')} onClick={handleDropdownClick}>
                                                    <i class="bi bi-three-dots"></i>
                                                </div>

                                                {isDropdownOpen && (
                                                    <div className={cx('dropdown-menu')}>
                                                        <ul className={cx('card-item')}>
                                                            <div className={cx('drop-item')}>
                                                                <li className={cx("item-setting")} >Update</li>
                                                                <li className={cx("item-setting")} >Delete</li>
                                                                <li className={cx("item-setting")}>Active Post</li>
                                                                <li className={cx("item-setting")}>Active Banner</li>
                                                            </div>
                                                        </ul>
                                                    </div>
                                                )}

                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* cuoi   */}
                                <div className={cx('bottom-ads')}>
                                    <div>
                                        Choose a photo for the banner
                                    </div>
                                    {selectedBannerImage && (
                                        <div className={cx('upload-file')} onClick={() => bannerImageInputRef.current && bannerImageInputRef.current.click()}>
                                            Update image
                                        </div>
                                    )}
                                </div>
                                <div className={cx("dz-message-text")}>
                                    {selectedBannerImage ? (
                                        <div className={cx('uploaded-banner')} onClick={handleBannerClick}>
                                            <img className={cx('show-img')} src={selectedBannerImage} alt="Uploaded Banner" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleUpdateBannerImage}
                                                style={{ display: 'none' }}
                                                ref={bannerImageInputRef}
                                            />
                                        </div>
                                    ) : (
                                        <div className={cx("upload-banner")} onClick={handleBannerClick}>
                                            <div className={cx('choose-img')}>
                                                <i className="bi bi-cloud-arrow-up"></i> &nbsp; Choose banner
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleBannerChange}
                                                    style={{ display: 'none' }}
                                                    ref={bannerImageInputRef}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ManageArticles;