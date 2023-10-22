//import từ thư viện bên ngoài
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

//import từ bên trong src
import {
    apiUrl,
    ACCESS_TOKEN,
    ACCOUNT_ID,
    ROLE,
    PROFILE_INFORMATION,
    USERNAME
} from "../../../constants/constants.js"
import classNames from 'classnames/bind'
import styles from './LoginForm.module.scss'
import images from '~/assets/images'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

const LoginForm = () => {

    function checkUsername() {
        var username = document.getElementById('txt-username').value;
        var errorUsername = document.getElementById('error-username');

        if (username == "" || username == null) {
            errorUsername.innerHTML = "(*) không được để trống";
        } else {
            errorUsername.innerHTML = ""; // Xóa thông báo lỗi nếu hợp lệ.
        }
    }
    function checkPassword() {
        var password = document.getElementById('txt-password').value;
        var errorPassword = document.getElementById('error-password');

        if (password == "" || password == null) {
            errorPassword.innerHTML = "(*) không được để trống";
        } else {
            errorPassword.innerHTML = ""; // Xóa thông báo lỗi nếu hợp lệ.
        }
    }


    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const [incorrectAccount, setIncorrectAccount] = useState(false) //hiển thị modal kki nhập username or password sai
    //theo dõi sự thay đổi trong các trường nhập liệu của mẫu đăng nhập
    //được gọi và cập nhật giá trị tương ứng trong biến trạng thái loginForm.
    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    const login = async event => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
            if (response.data.success) {
                console.log(response.data)
                alert("login thnah cong")
                // setIsDisableAccount(false)
                localStorage.setItem(USERNAME, loginForm.username)
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken)
                localStorage.setItem(ACCOUNT_ID, response.data.accountId)
                localStorage.setItem(ROLE, response.data.role)
                localStorage.setItem(PROFILE_INFORMATION, JSON.stringify(response.data.user))
                navigate = ('/homepage')
            }

        } catch (error) {
            if (error.response.data.message === "Invalid account's information") {
                // alert("Nhập sai username or pasword");
                setIncorrectAccount(true)
            } else {
                console.error(error.response.data.message);
            }
        }
    };


    const { username, password } = loginForm

    return (
        <>
            <img src={images.Background_logo} className={cx('login_background')} />
            <div className={cx('overlay')}>
                <div className={cx('login_box')}>
                    <h2>
                        Login
                    </h2>
                    <form onSubmit={login}>
                        {
                            incorrectAccount &&
                            <div className={cx("warning")}>Incorrect Username or Password, please try again</div>
                        }
                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="text"
                                name="username"
                                value={username}
                                id="txt-username"
                                onBlur={checkUsername}
                                onChange={onChangeLoginForm}

                            />
                            <label>Username <span id="error-username" className="error-username"></span></label>
                        </div>

                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="password"
                                name="password"
                                id="txt-password"
                                onBlur={checkPassword}
                                value={password}
                                onChange={onChangeLoginForm}
                            />
                            <label>Password <span id="error-password" className="error-password"></span></label>
                        </div>
                        <div className={cx('forgot_pass')}>
                            <label>
                                <input
                                    type="checkbox"
                                // checked={agree}
                                // onChange={handleAgreeChange}
                                />
                                &nbsp;
                                <p className={cx('remember')}> Remember me</p>
                            </label>
                            <Link to="/forgotpassword" className={cx('forgot_password')}>Forgot Password?</Link>
                        </div>
                        <div className={cx('login_btn')}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <input type="submit" value='Login' />
                        </div>
                        <h3>Or </h3>
                        <div className={cx('login_other')}>
                            <span> Sign up with </span>
                            <img src={images.google} />
                            {/* <img src={images.facebook} /> */}
                        </div>
                        <div className={cx('lb_register')}>
                            {/* <label> Do you haven't an account? </label> */}
                            <Link to='/register'> &nbsp;  Register</Link>
                        </div>
                    </form>
                </div>
            </div>
            {/* </img > */}
        </>
    )
}

export default LoginForm