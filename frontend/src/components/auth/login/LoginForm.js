//import từ thư viện bên ngoài
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import facebook from '../../../image/facebook.png'
// import google from '../../../image/google.png'
import classNames from 'classnames/bind'
import styles from './LoginForm.module.scss'
import images from '~/assets/images'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

const LoginForm = () => {
    return (
        <>
            <div className={cx('login_background')}>
                <div className={cx('overlay')}>
                    <div className={cx('login_box')}>
                        <h2>
                            Login
                        </h2>
                        <form>
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="text"
                                    name="Username"
                                    required
                                />
                                <label for="text">Username</label>
                            </div>

                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="password"
                                    name="Password"
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className={cx('forgot_pass')}>
                                <label>
                                    <input
                                        type="checkbox"
                                    // checked={agree}
                                    // onChange={handleAgreeChange}
                                    />
                                    &nbsp;  Remember me
                                </label>
                                <Link to="/forgotpassword" className={cx('forgot_password')}>Forgot Password?</Link>
                            </div>
                            <div className={cx('login_btn')}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Login
                            </div>
                            <h3>Or </h3>
                            <div className={cx('login_other')}>
                                <img src={images.google} />
                                <img src={images.facebook} />
                            </div>
                            <div className={cx('lb_register')}>
                                {/* <label> Do you haven't an account? </label> */}
                                <Link to='/register'> &nbsp;  Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm