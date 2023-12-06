import styles from './LoginForm.module.scss'
import React, { useState, useRef, useEffect } from 'react';
import ErrorModal from '~/components/Modal/ErrorModal';
import classNames from 'classnames/bind'
import images from '~/assets/images'
import axios from "axios"
import { apiUrl } from '~/constants/constants';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const cx = classNames.bind(styles)
const ForgotPassForm2 = () => {
    const [code, setOTPValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [countdown, setCountdown] = useState(180);
    const email = new URLSearchParams(location.search).get('email');

    //dem nguoc thoi gian
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown > 0) {
                    return prevCountdown - 1;
                } else {
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const resetCountdown = () => {
        setCountdown(180);
    };

    const handleInput = (index, value) => {
        const newOTPValues = [...code];
        newOTPValues[index] = value;
        setOTPValues(newOTPValues);
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Enter' && index < code.length - 1) {
            event.preventDefault();
            inputRefs.current[index + 1].focus();
        }
    };


    const handVerifyCode = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/verifyCode`, { email, code: code.join('') });
            navigate('/forgotpassword3');
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    const handCreateCode = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/createCode`, { email, isVerify: true });
            resetCountdown();
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    return (
        <>
            <div className={cx('login_background')}>
                <div className={cx('overlay')}>
                    <div style={{ paddingTop: '30px' }} className={cx('forgotpass_box')}>
                        <h2>Forgot Password</h2>
                        <div className={cx('send_email')}>
                            <img src={images.email} />
                        </div>
                        <p className={cx('inform_email')}>
                            Please check your email for further instructions.
                        </p>
                        <div className={cx('verify-code', 'count-down')}>
                            {`Time remaining: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                        </div>
                        <form onSubmit={handVerifyCode} >
                            <div className={cx('verify-code')}>
                                {code.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        id={`otp-${index + 1}`}
                                        className={cx("m-2", " border", "text-center", "wight", "rounded", 'input_field')}
                                        type="text"
                                        maxLength="1"
                                        value={value}
                                        onInput={(e) => handleInput(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onFocus={(e) => {
                                            e.target.select();
                                            if (index > 0 && code[index - 1] === '') {
                                                inputRefs.current[index - 1].focus();
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                            <div className={cx('login_btn1')}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <input className={cx('btn-submit')} type="submit" value='Conform' />
                            </div>

                            <Link to='/forgotpassword'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </Link>
                            <div className={cx('verify-code', 'send-code')}>
                                <button onClick={handCreateCode} className={cx('btn-resend')} type='submit'>Resend Code</button>
                            </div>

                            <div style={{ margin: "5px" }} className={cx('lb_register')}>
                                <label> Back to </label>
                                <Link to='/login'> &nbsp;  Sign in </Link>
                                <p style={{ margin: "0" }} > &nbsp; or</p>
                                <Link to='/register'> &nbsp;  Create an account </Link>
                            </div>
                        </form>
                        {error && <ErrorModal message={error} onClose={() => setError(null)} />}
                    </div>
                </div >
            </div >
        </>
    )
}

export default ForgotPassForm2


