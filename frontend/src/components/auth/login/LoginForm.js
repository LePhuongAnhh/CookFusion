//import từ thư viện bên ngoài
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ErrorModal from "~/components/Modal/ErrorModal.js"
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
import { io } from 'socket.io-client'

const socket = io('http://localhost:9996/', { transports: ['websocket'] })
const cx = classNames.bind(styles)

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const [errors, setErrors] = useState({}); // State to manage error messages
    const [error, setError] = useState(null);
    // Validation function to check for empty username and password
    const checkValideInput = () => {
        let errors = {};
        let isValid = true;
        if (!loginForm.username) {
            errors.username = "Please enter a username";
            isValid = false;
        }
        if (!loginForm.password) {
            errors.password = "Please enter a password";
            isValid = false;
        }
        setErrors(errors); // Update the state with error messages
        return isValid;
    };
    const handleLoginGoogle = async () => {
        try {
            window.location.href = `${apiUrl}/auth/google/callback`
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const handleLoginFacebook = async () => {
        try {
            window.location.href = `${apiUrl}/auth/facebook/callback`
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const login = async event => {
        event.preventDefault();
        const isValid = checkValideInput();
        if (!isValid) {
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
            console.log("hel", response.data.success);
            if (response.data.success) {
                console.log(response.data);
                localStorage.setItem(USERNAME, response.data.account.username);
                localStorage.setItem(ACCOUNT_ID, response.data.account._id)
                localStorage.setItem(ACCESS_TOKEN, response.data.token);
                localStorage.setItem(PROFILE_INFORMATION, JSON.stringify(response.data.account))
                localStorage.setItem(ROLE, response.data.account.role);
                const role = response.data.account.role
                if (role === "653b77c46139d7a2604cedb5") {
                    navigate("dashboard");
                } else if (role === "653b77c46139d7a2604cedb7") {
                    navigate('/homepage');
                } else {
                    navigate('/homepage')
                }
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    const { username, password } = loginForm
    useEffect(() => {

        const fetchData = async () => {
            try {
                localStorage.setItem(ACCESS_TOKEN, token);
                const response = await axios.get(`${apiUrl}/auth/getinformation`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    localStorage.setItem(USERNAME, response.data.account.username);
                    localStorage.setItem(ACCOUNT_ID, response.data.account._id)
                    localStorage.setItem(PROFILE_INFORMATION, JSON.stringify(response.data.account))
                    localStorage.setItem(ROLE, response.data.account.role);
                    const role = response.data.account.role
                    if (role === "653b77c46139d7a2604cedb5") {
                        navigate("dashboard");
                    } else if (role === "653b77c46139d7a2604cedb7") {
                        navigate('/homepage');
                    } else {
                        navigate('/homepage')
                    }
                }

            } catch (error) {
                console.log(error);
            }
        };
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token')
        if (token !== 'false') fetchData();
        else setError("Please try again")
    }, []);

    return (
        <>
            <img src={images.Background_logo} className={cx('login_background')} />
            <div className={cx('overlay')}>
                <div className={cx('login_box')}>
                    <h2>
                        Login
                    </h2>
                    <form onSubmit={login}>
                        <div className={cx('user_box')}>
                            <input
                                className={cx('input_field')}
                                type="text"
                                name="username"
                                value={username}
                                id="txt-username"
                                onChange={onChangeLoginForm}
                            />
                            <label>Username {errors.username && <span className="error-message">{errors.username}</span>}</label>
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
                            <label>Password  {errors.password && <span className="error-message">{errors.password}</span>}</label>
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
                            <img onClick={handleLoginGoogle} src={images.google} />
                            <img onClick={handleLoginFacebook} src={images.facebook} />
                        </div>
                        <div className={cx('lb_register')}>
                            <label> Do you haven't an account? </label>
                            <Link to='/register'> &nbsp;  Register</Link>
                        </div>
                    </form>
                </div>
            </div>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
        </>
    )
}

export default LoginForm