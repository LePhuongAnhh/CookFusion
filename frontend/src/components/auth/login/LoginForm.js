//import từ thư viện bên ngoài
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

//import từ bên trong src
import { apiUrl, ACCESS_TOKEN, ACCOUNT_ID, ROLE, PROFILE_INFORMATION, USERNAME } from "../../../constants/constants.js"
import classNames from 'classnames/bind'
import styles from './LoginForm.module.scss'
import images from '~/assets/images'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const [incorrectAccount, setIncorrectAccount] = useState(false)
    //theo dõi sự thay đổi trong các trường nhập liệu của mẫu đăng nhập
    //được gọi và cập nhật giá trị tương ứng trong biến trạng thái loginForm.
    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    const login = async event => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
            if (response) { // Kiểm tra xem response tồn tại
                if (response.data && response.data.success) { // Kiểm tra xem response.data và response.data.success tồn tại
                    console.log(response.data);
                    localStorage.setItem(USERNAME, loginForm.username);
                    localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                    localStorage.setItem(ACCOUNT_ID, response.data.accountId);
                    localStorage.setItem(ROLE, response.data.role);
                    localStorage.setItem(PROFILE_INFORMATION, JSON.stringify(response.data.user));
                    const role = response.data.role;
                    if (role === 'User') {
                        navigate("/homepage");
                    } else if (role === 'Admin') {
                        navigate('/profileAdmin');
                    }
                } else {
                    console.error("Response is missing 'data' or 'success' property");
                }
            } else {
                console.error("Response is undefined");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "Username or password is invalid") {
                setIncorrectAccount(true);
            }
            console.error(error.response.data.message)
        }
    };


    const { username, password } = loginForm

    return (
        <>
            <div className={cx('login_background')}>
                <div className={cx('overlay')}>
                    <div className={cx('login_box')}>
                        <h2>
                            Login
                        </h2>
                        <form onSubmit={login}>
                            {
                                incorrectAccount && <div className={cx("warning")}>Incorrect Username or Password</div>
                            }
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="text"
                                    name="username"
                                    required
                                    value={username}
                                    onChange={onChangeLoginForm}

                                />
                                <label for="text">Username</label>
                            </div>

                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={onChangeLoginForm}
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
                                <input type="submit" value='Login' />
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