import styles from './LoginForm.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios';
import { apiUrl } from '~/constants/constants';
import React, { useState } from 'react';
import images from '~/assets/images'
import { Link, useNavigate } from 'react-router-dom';
import RoleModal from '~/components/Modal/RoleModal';
const cx = classNames.bind(styles)

const RegisterForm = () => {
    function checkValideInput() {
        let isValid = true;
        let arrInput = ['name', 'username', 'email', 'password', 'rePassword'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log(createAccount[arrInput[i]], arrInput[i])
            if (!createAccount[arrInput[i]]) {
                isValid = false;
                alert("khong dc de trong du lieu  ", + arrInput[i]);
                break
            }
        }
        return isValid;
    }

    function checkName() {
        var full_name = document.getElementById('txt-full-name').value;
        var check_error_fullname = document.getElementById('error-full-name');
        var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
        if (full_name == "" || full_name == null) {
            check_error_fullname.innerHTML = "Họ tên k đc để trống";
        } else if (!regexName.test(full_name)) {
            check_error_fullname.innerHTML = "Ho ten k hop le";
        } else {
            check_error_fullname.innerHTML = "";
            return full_name;
        }
    }
    function checkUserName() {
        var user_name = document.getElementById('txt-user-name').value;
        var check_error_username = document.getElementById('error-user-name');
        if (user_name == "" || user_name == null) {
            check_error_username.innerHTML = "Họ tên k đc để trống";
        } else if (user_name.length < 8) {
            check_error_username.innerHTML = "User name k dc nho hom 8 ky tu"
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
            check_error_email.innerHTML = "Email k đc để trống";
        } else if (!regexEmail.test(email)) {
            check_error_email.innerHTML = "Email k hop le";
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
            check_error_password.innerHTML = "Pasword k đc để trống";
        } else if (!regexPassword.test(password)) {
            check_error_password.innerHTML = "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái in hoa, 1 số và 1 ký tự đặc biệt";
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
            check_error_confirm_password.innerHTML = "Pasword k đc để trống";
        } else if (confirm_password != password) {
            alert('Mật khẩu xác nhận không trùng khớp! Mời nhập lại')
        } else {
            check_error_confirm_password.innerHTML = "";
            return password;
        }
    }
    const navigate = useNavigate();
    const [createAccount, setCreateAccount] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        rePassword: ""
    })

    const handleOnChangeInput = (event, id) => {
        console.log(event.target.value, id)
        const value = event.target.value; //lay gia tri cua mot event
        setCreateAccount((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        const isValid = checkValideInput();
        if (!isValid) {
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/auth/create`, createAccount);
            if (response.data.success) {
                console.log('Đăng ký thành công', response.data);
                alert("Đăng ký thành công");
                navigate('/');
            } else {
                console.error('Lỗi đăng ký:', response.data);
                alert("Đăng ký thất bại");
            }
        } catch (error) {
            if (error.response.data.message === "Username or email address is exsisted") {
                alert("Trùng username hoặc email");
            } else {
                console.error('Lỗi đăng ký:', error);
                alert("Đăng ký thất bại");
            }
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
                                // onBlur={checkUserName}
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
                                // onBlur={checkEmail}
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
                                // onBlur={checkPassword}
                                onChange={(event) => { handleOnChangeInput(event, "password") }}
                            />
                            <label>Password *  </label>
                            <span className={cx('txt-red-password')} id='error-password'></span>

                        </div>

                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="password"
                                name="confirmPassword"
                                id='txt-confirm-password'
                                // onBlur={checkConfirmPassword}
                                onChange={(event) => { handleOnChangeInput(event, "rePassword") }}
                            />
                            <label>Confirm Password  <span className={cx('txt-red')} id='error-confirm-password'></span> *</label>

                        </div>

                        <div className={cx('term_condition')}>
                            <label>
                                <input
                                    type="checkbox"
                                />
                                &nbsp; Agree to &nbsp;
                                <Link to="#" className={cx('term')}> Term and Condition  </Link>
                            </label>
                        </div>
                        <div className={cx('login_btn')} >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <input
                                type="submit"
                                value="Register"
                            />
                            {/* Đăng ký */}
                            {/* </input> */}
                        </div>
                        {/* <RoleModal /> */}
                        <div className={cx('lb_login', 'd-flex', 'justify-content-center', 'align-items-center')}>
                            <label> Already register? </label>
                            <Link to='/'> &nbsp;  Sign in </Link>
                        </div>
                    </form>
                </div>
            </div>
            {/* </img> */}
        </>
    )
}

export default RegisterForm