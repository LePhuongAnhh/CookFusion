//import từ thư viện bên ngoài
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
// import Modal from './Modal';

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
    //validation
    function checkValideInput() {
        let isValid = true;
        let arrInput = ['username', 'password'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log(loginForm[arrInput[i]], arrInput[i])
            if (!loginForm[arrInput[i]]) {
                isValid = false;
                alert("khong dc de trong du lieu  ", + arrInput[i]);
                break
            }
        }
        return isValid;
    }

    const [showModal, setShowModal] = useState(false); // Trạng thái để kiểm soát việc hiển thị modal
    const [modalMessage, setModalMessage] = useState(''); // Nội dung thông báo modal

    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const [incorrectAccount, setIncorrectAccount] = useState(false) //hiển thị modal kki nhập username or password sai
    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    console.log("hi:", loginForm)
    const login = async event => {
        event.preventDefault();
        const isValid = checkValideInput();
        if (!isValid) {
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
            if (response.data.success) {
                console.log(response.data);
                alert("Login thành công");

                // Lưu thông tin người dùng vào localStorage
                // localStorage.setItem('username', loginForm.username);
                localStorage.setItem('username', response.data.account.username);
                localStorage.setItem('accessToken', response.data.token);
                // localStorage.setItem('accountId', response.data.account._id);
                localStorage.setItem('accountId', response.data.account);

                navigate('/homepage');
            }
        } catch (error) {
            if (error.response.data.message === "Invalid account's information") {
                alert("Sai tên đăng nhập hoặc mật khẩu");
                setIncorrectAccount(true); // Hiển thị Modal
            } else {
                console.error(error.response.data.message);
                alert("Đã xảy ra lỗi");
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
                        {/* {
                            incorrectAccount &&
                            <div className={cx("warning")}>Incorrect Username or Password, please try again</div>
                            // <Modal show={showModal} onClose={() => setShowModal(false)} />
                        } */}
                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="text"
                                name="username"
                                value={username}
                                id="txt-username"
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
                                value={password}
                                onChange={onChangeLoginForm}
                            />
                            <label>Password <span id="error-password" className="error-password"></span></label>
                        </div>
                        <div className={cx('forgot_pass')}>
                            <label>
                                <input
                                    type="checkbox"
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
                            <label> Do you haven't an account? </label>
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