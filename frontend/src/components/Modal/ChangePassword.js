import styles from './ChangePassword.module.scss'
import classNames from 'classnames/bind'
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl, PROFILE_INFORMATION } from '~/constants/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';


const cx = classNames.bind(styles)
function ChangePassWord({ setShowChangePassWordModal }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const username = profileInformation.username
    console.log()

    const [changePasswordForm, setChangePasswordForm] = useState({
        username: username,
        oldPassword: '',
        password: "",
        rePassword: "",
    })
    const handlePasswordChange = (event, id) => {
        const value = event.target.value;
        setChangePasswordForm((prevState) => ({ ...prevState, [id]: value }));
    };

    function checkOldPassword() {
        var oldPassword = document.getElementById('txt-oldPassword').value;
        var check_error_oldPassword = document.getElementById('error-oldPassword');
        if (oldPassword == "" || oldPassword == null) {
            check_error_oldPassword.innerHTML = "Password cannot be left blank";
        }
        else {
            check_error_oldPassword.innerHTML = "";
            return oldPassword;
        }
    }
    function checkPassword() {
        var password = document.getElementById('txt-password').value;
        var check_error_password = document.getElementById('error-password');
        var regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
        if (password == "" || password == null) {
            check_error_password.innerHTML = "Password cannot be left blank";
        } else if (!regexPassword.test(password)) {
            check_error_password.innerHTML = "Password must have at least 8 characters, at least 1 capital letter, 1 number and 1 special character";
        } else {
            check_error_password.innerHTML = "";
            return password;
        }
    }
    function checkConfirmPassword() {
        var confirm_password = document.getElementById('txt-confirm-password').value;
        var check_error_confirm_password = document.getElementById('error-confirm-password');
        var password = checkPassword();
        if (confirm_password == "" || confirm_password == null) {
            check_error_confirm_password.innerHTML = "Confirmation password cannot be left blank";
        } else if (confirm_password != password) {
            check_error_confirm_password.innerHTML = 'Confirmation password does not match! Please re-enter'
        } else {
            check_error_confirm_password.innerHTML = "";
            return password;
        }
    }

    const changePassword = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${apiUrl}/user/changePassword`, changePasswordForm, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShowChangePassWordModal(false)
        } catch (error) {
            console.log(error.response.data)
            // if (error.response.status === 401) {
            //     navigate('/error')
            // } else {
            //     setMessage('You have changed password failed, please try again')
            //     setShowMessageModal(true)
            // }
        }
    }

    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div className={cx('createIdeaHeader')}>
                    <h1 className={cx('createIdea')}>Change Password</h1>
                    <div className={cx('exit_cmt_modal')} onClick={() => setShowChangePassWordModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>

                <form className={cx('box-change-password')} id="passwordForm" onSubmit={changePassword} >
                    <input
                        type="password"
                        className={cx('form-input')}
                        name="oldPassword"
                        id="txt-oldPassword"
                        placeholder="Password"
                        onBlur={checkOldPassword}
                        onChange={(event) => { handlePasswordChange(event, "oldPassword") }}
                    />
                    <div className="row">
                        <div className={cx("txt-red")} id='error-oldPassword' >

                        </div>
                    </div>
                    <input
                        type="password"
                        className={cx('form-input')}
                        name="Password"
                        id='txt-password'
                        onBlur={checkPassword}
                        placeholder="New Password"
                        onChange={(event) => { handlePasswordChange(event, "password") }}
                    />

                    <div className="row">
                        <div className={cx("txt-red")} id='error-password' >

                        </div>
                    </div>
                    <input
                        type="password"
                        className={cx('form-input')}
                        name="confirmPassword"
                        id='txt-confirm-password'
                        placeholder="Repeat Password"
                        onBlur={checkConfirmPassword}
                        onChange={(event) => { handlePasswordChange(event, "rePassword") }}
                    />
                    <div className="row">
                        <div className={cx("txt-red")} id='error-confirm-password'>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className={cx("change-btn")}
                        value="Change Password"
                    />
                </form>
            </div>
        </div>
    );
}

export default ChangePassWord;