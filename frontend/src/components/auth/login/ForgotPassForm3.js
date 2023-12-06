import React, { useState } from 'react';
import styles from './LoginForm.module.scss'
import classNames from 'classnames/bind'
import images from '~/assets/images'
import ErrorModal from '~/components/Modal/ErrorModal';
import axios from 'axios';
import { apiUrl } from '~/constants/constants';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
const ForgotPassForm3 = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [changePasswordForm, setChangePasswordForm] = useState({
        password: "",
        rePassword: "",
    })
    const handlePasswordChange = (event, id) => {
        const value = event.target.value;
        setChangePasswordForm((prevState) => ({ ...prevState, [id]: value }));
    };
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
            alert('Confirmation password does not match! Please re-enter')
        } else {
            check_error_confirm_password.innerHTML = "";
            return password;
        }
    }
    const handleChangePassWord = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/forgetPassword`, changePasswordForm);
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    };
    return (
        <>
            <div className={cx('login_background')}>
                <div className={cx('overlay')}>
                    <div className={cx('forgotpass_box3')}>
                        <h2>Forgot Password</h2>
                        <div className={cx('inform')}>
                            <div className={cx('correct_inform')}>
                                <img src={images.step1} />&nbsp;
                                <p> Account Information </p>
                            </div>
                            <div className={cx('correct_inform')}>
                                <img src={images.step2} />&nbsp;
                                <p> Confirm PIN code </p>
                            </div>
                            <div className={cx('correct_inform')}>
                                <img src={images.step3} />&nbsp;
                                <p>Reset the password </p>
                            </div>
                        </div>
                        <p className={cx('inform_forgotpass3')}>
                            Now, enter a new password for your account.
                        </p>
                        <form onSubmit={handleChangePassWord}>
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="password"
                                    name="Password"
                                    id='txt-password'
                                    onBlur={checkPassword}
                                    onChange={(event) => { handlePasswordChange(event, "password") }}
                                />
                                <label for="text">New Password  <span className={cx('txt-red-password')} id='error-password'></span> </label>
                            </div>
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="password"
                                    name="confirmPassword"
                                    id='txt-confirm-password'
                                    onBlur={checkConfirmPassword}
                                    onChange={(event) => { handlePasswordChange(event, "rePassword") }}
                                />
                                <label for="text">Confirm password <span className={cx('txt-red')} id='error-confirm-password'></span> </label>
                            </div>
                            <button style={{ marginTop: '25px' }} type='submit' className={cx('login_btn1')}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <input className={cx('btn-submit')} type="submit" value='Conform' />
                            </button>
                            <div style={{ marginTop: '8px' }} className={cx('lb_register')}>
                                <label> Back to </label>
                                <Link to='/login'> &nbsp;  Sign in </Link>
                                <p style={{ margin: '0' }}> &nbsp; or</p>
                                <Link to='/register'> &nbsp;  Create an account </Link>
                            </div>
                        </form>
                    </div>
                </div>
                {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            </div >
        </>
    )
}

export default ForgotPassForm3