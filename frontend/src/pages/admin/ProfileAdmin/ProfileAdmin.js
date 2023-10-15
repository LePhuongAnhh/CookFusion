import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from "./ProfileAdmin.module.scss"
import images from '~/assets/images'
import ChangePassWord from '~/components/Modal/ChangePassword';

const cx = classNames.bind(styles)
function ProfileAdmin() {
    const [showChangePassWordModal, setShowChangePassWordModal] = useState(false)
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
                {/* account  */}
                < div className={cx('layout_page')} >
                    {/* header */}
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
                            <form>
                                <div className={cx('body_container')}>
                                    {/* update avatar  */}
                                    <div className={cx('update_avt')}>
                                        <div className={cx('update_gird')}>
                                            <img src={images.phanh} className={cx('show_avt')} />
                                            <div className={cx('update_right')}>
                                                <label className={cx('update_photo')}>
                                                    Update new photo
                                                </label>
                                                <span className={cx('text_name')}>Allowed PNG or JPEG. Max size of 800K.</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* update info  */}
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <label className={cx('form_control')}>Username</label>
                                            <div className={cx('input_info')}>
                                                <input type='text' className={cx('show_info')}></input>
                                                <fieldset className={cx('outline')}>
                                                    <legend className={cx('css_lg')}>
                                                        <span>Username</span>
                                                    </legend>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <label className={cx('form_control')}>Username</label>
                                            <div className={cx('input_info')}>
                                                <input type='text' className={cx('show_info')}></input>
                                                <fieldset className={cx('outline')}>
                                                    <legend className={cx('css_lg')}>
                                                        <span>Username</span>
                                                    </legend>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <label className={cx('form_control')}>Username</label>
                                            <div className={cx('input_info')}>
                                                <input type='text' className={cx('show_info')}></input>
                                                <fieldset className={cx('outline')}>
                                                    <legend className={cx('css_lg')}>
                                                        <span>Username</span>
                                                    </legend>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <label className={cx('form_control')}>Username</label>
                                            <div className={cx('input_info')}>
                                                <input type='text' className={cx('show_info')}></input>
                                                <fieldset className={cx('outline')}>
                                                    <legend className={cx('css_lg')}>
                                                        <span>Username</span>
                                                    </legend>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <label className={cx('form_control')}>Username</label>
                                            <div className={cx('input_info')}>
                                                <input type='text' className={cx('show_info')}></input>
                                                <fieldset className={cx('outline')}>
                                                    <legend className={cx('css_lg')}>
                                                        <span>Username</span>
                                                    </legend>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('info_item')}>
                                        <div className={cx('info_gird')}>
                                            <label className={cx('form_control')}>Username</label>
                                            <div className={cx('input_info')}>
                                                <input type='text' className={cx('show_info')}></input>
                                                <fieldset className={cx('outline')}>
                                                    <legend className={cx('css_lg')}>
                                                        <span>Username</span>
                                                    </legend>
                                                </fieldset>
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