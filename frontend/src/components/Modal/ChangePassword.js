import styles from './ChangePassword.module.scss'
import classNames from 'classnames/bind'
import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { ACCESS_TOKEN } from '~/constants/constants';

const cx = classNames.bind(styles)
function ChangePassWord({ setShowChangePassWordModal }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>Change Password</h1>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowChangePassWordModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <form id="passwordForm">
                    <input type="password" className={cx('change-form-control')} name="password1" id="password1" placeholder="Current Password" autocomplete="off" />
                    <input type="password" className={cx('change-form-control')} name="password1" id="password1" placeholder="New Password" autocomplete="off" />
                    {/* <div className="row">
                        <div className="col-sm-6">
                            <span id="8char" className="glyphicon glyphicon-remove" style="color:#FF0004;"></span> 8 Characters Long<br />
                            <span id="ucase" className="glyphicon glyphicon-remove" style="color:#FF0004;"></span> One Uppercase Letter
                        </div>
                        <div className="col-sm-6">
                            <span id="lcase" className="glyphicon glyphicon-remove" style="color:#FF0004;"></span> One Lowercase Letter<br />
                            <span id="num" className="glyphicon glyphicon-remove" style="color:#FF0004;"></span> One Number
                        </div>
                    </div> */}
                    <input type="password" className={cx('change-form-control')} name="password2" id="password2" placeholder="Repeat Password" autocomplete="off" />
                    {/* <div className="row">
                        <div className="col-sm-12">
                            <span id="pwmatch" className="glyphicon glyphicon-remove" style="color:#FF0004;"></span> Passwords Match
                        </div>
                    </div> */}
                    <input type="submit" className={cx('change-form-control', 'change-password')} data-loading-text="Changing Password..." value="Save" />
                </form>
            </div>
        </div>
    );
}

export default ChangePassWord;