//import từ thư viện bên ngoài
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
import facebook from '../../../image/facebook.png'
import google from '../../../image/google.png'

import style from './LoginForm.module.css'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    return (
        <>
            <div className={style.login_background}>
                <div className={style.overlay}>
                    <div className={style.login_box}>
                        <h2>Login</h2>
                        <form>
                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="text"
                                    name="Username"
                                    required
                                />
                                <label for="text">Username</label>
                            </div>

                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="password"
                                    name="Password"
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className={style.forgot_pass}>
                                <label>
                                    <input
                                        type="checkbox"
                                    // checked={agree}
                                    // onChange={handleAgreeChange}
                                    />
                                    &nbsp;  Remember me
                                </label>
                                <Link to="/forgotpassword" className={style.forgot_password}>Forgot Password?</Link>
                            </div>
                            <div className={style.login_btn}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Login
                            </div>
                            <h3>Using social networking accounts </h3>
                            <div className={style.login_other}>
                                <img src={google} />
                                <img src={facebook} />
                            </div>
                            <div className={style.lb_register}>
                                <label> Do you haven't an account? </label>
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