import styles from './LoginForm.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios';
import { apiUrl, PROFILE_INFORMATION, ROLE, ACCESS_TOKEN } from '~/constants/constants';
import React, { useState, useEffect } from 'react';
import images from '~/assets/images'
import { Link, useNavigate } from 'react-router-dom';
import RoleModal from '~/components/Modal/RoleModal';
import ErrorModal from '~/components/Modal/ErrorModal';

const cx = classNames.bind(styles)

const RegisterForm = () => {
    const navigate = useNavigate();
    //choose role
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [errors, setErrors] = useState({}); // State to manage error messages
    const [error, setError] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowRoleModal(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    const handleRoleSelect = (role) => {
        setCreateAccount((prevState) => ({ ...prevState, role: role }));
        setShowRoleModal(false);
    };

    const handleCancel = () => {
        setShowRoleModal(false);
        navigate('/login');
    };

    const handleOK = () => {
        setShowRoleModal(false);
        navigate('/register');
    };




    //Đồng ý điều khoản 
    const [isChecked, setIsChecked] = useState(false);
    const [showTermsError, setShowTermsError] = useState(false); // State to manage visibility of the terms error message

    const handleCheckboxChange = () => {
        setShowTermsError(false); // Reset the terms error message when the checkbox changes
        setIsChecked(!isChecked);
    };
    function checkName() {
        var full_name = document.getElementById('txt-full-name').value;
        var check_error_fullname = document.getElementById('error-full-name');
        var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
        if (full_name == "" || full_name == null) {
            check_error_fullname.innerHTML = "Full name cannot be left blank";
        } else if (!regexName.test(full_name)) {
            check_error_fullname.innerHTML = "The name does not match";
        } else {
            check_error_fullname.innerHTML = "";
            return full_name;
        }
    }
    function checkUserName() {
        var user_name = document.getElementById('txt-user-name').value;
        var check_error_username = document.getElementById('error-user-name');
        if (user_name == "" || user_name == null) {
            check_error_username.innerHTML = "User name cannot be left blank";
        } else if (user_name.length < 8) {
            check_error_username.innerHTML = "User name cannot be less than 8 characters"
        }
        else {
            check_error_username.innerHTML = "";
            return user_name;
        }
    }
    function checkEmail() {
        var email = document.getElementById('txt-email').value;
        var check_error_email = document.getElementById('error-email');
        var regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (email == "" || email == null) {
            check_error_email.innerHTML = "Email cannot be blank";
        } else if (!regexEmail.test(email)) {
            check_error_email.innerHTML = "Email does not match";
        } else {
            check_error_email.innerHTML = "";
            return email;
        }
    }
    function checkPassword() {
        var password = document.getElementById('txt-password').value;
        var check_error_password = document.getElementById('error-password');
        var regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
        if (password == "" || password == null) {
            check_error_password.innerHTML = "Password cannot be left blank";
        } else if (!regexPassword.test(password)) {
            check_error_password.innerHTML = "Must have at least 8 characters, at least 1 capital letter, 1 number and 1 special character";
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
            check_error_confirm_password.innerHTML = "Confirm Password cannot be left blank";
        } else if (confirm_password != password) {
            check_error_confirm_password.innerHTML = "Confirm Password does not match! Please re-enter";
        } else {
            check_error_confirm_password.innerHTML = "";
            return password;
        }
    }
    const [createAccount, setCreateAccount] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        rePassword: "",
        role: "",
    });
    const handleOnChangeInput = (event, id) => {
        const value = event.target.value;
        setCreateAccount((prevState) => ({ ...prevState, [id]: value }));
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isChecked) {
            setShowTermsError(true);
            return;
        }
        try {
            console.log(createAccount)
            const response = await axios.post(`${apiUrl}/auth/create`, createAccount);
            if (response.data.success) {
                navigate(`/verify?email=${createAccount.email}`);
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    };

    return (
        <>
            <img src={images.Background_logo} className={cx('login_background')} />
            <div className={cx('overlay')}>
                <div className={cx('register_box')}>
                    <h2>Register</h2>
                    <form
                        id="registrationForm"
                        onSubmit={handleRegister}
                    >
                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="text"
                                name="name "
                                id='txt-full-name'
                                onBlur={checkName}
                                onChange={(event) => { handleOnChangeInput(event, "name") }}
                            />
                            <label>Full Name * <span className={cx('txt-red')} id='error-full-name' ></span> </label>
                        </div>

                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="text"
                                name="username"
                                id='txt-user-name'
                                onBlur={checkUserName}
                                onChange={(event) => { handleOnChangeInput(event, "username") }}
                            />
                            <label >Username * <span className={cx('txt-red')} id='error-user-name'></span></label>
                        </div>

                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="email"
                                name="Email"
                                id='txt-email'
                                onBlur={checkEmail}
                                onChange={(event) => { handleOnChangeInput(event, "email") }}
                            />
                            <label>Email * <span className={cx('txt-red')} id='error-email'></span></label>
                        </div>

                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="password"
                                name="Password"
                                id='txt-password'
                                onBlur={checkPassword}
                                onChange={(event) => { handleOnChangeInput(event, "password") }}
                            />
                            <label>Password *    <span className={cx('txt-red-password')} id='error-password'></span>  </label>
                            {/* <span className={cx('txt-red-password')} id='error?-password'></span> */}

                        </div>

                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="password"
                                name="confirmPassword"
                                id='txt-confirm-password'
                                onBlur={checkConfirmPassword}
                                onChange={(event) => { handleOnChangeInput(event, "rePassword") }}
                            />
                            <label>Confirm Password * <span className={cx('txt-red')} id='error-confirm-password'></span> </label>

                        </div>

                        <div className={cx('term_condition')}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />

                            </label>
                            <span className={cx('term')}>
                                &nbsp; Term and Condition
                            </span>
                            {/* <Link to="#" className={cx('term')}> Term and Condition </Link> */}

                            {showTermsError && ( // Conditionally display the terms error message
                                <span className={cx('terms_error')}>
                                    &nbsp; Please agree to the terms.
                                </span>
                            )}
                        </div>
                        <div className={cx('login_btn')} >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <input
                                type="submit"
                                value="Register"
                                className={cx('btn-submit')}
                            />
                        </div>
                        <div className={cx('lb_login', 'd-flex', 'justify-content-center', 'align-items-center')}>
                            <label> Already register? </label>
                            <Link to='/login'> &nbsp;  Sign in </Link>
                        </div>
                    </form>
                </div>
            </div>
            {showRoleModal && (
                <RoleModal
                    onRoleSelect={handleRoleSelect}
                    onClose={handleCancel}
                    onOK={handleOK}
                />
            )}
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
        </>
    )
}

export default RegisterForm