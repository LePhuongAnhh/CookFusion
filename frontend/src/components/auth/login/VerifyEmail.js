import React, { useState, useRef, useEffect } from 'react';
import ErrorModal from '~/components/Modal/ErrorModal';
import axios from "axios"
import { apiUrl, PROFILE_INFORMATION } from '~/constants/constants';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import styles from './LoginForm.module.scss'

const cx = classNames.bind(styles)
const VerifyEmail = () => {
    const [code, setOTPValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');
    const displayEmail = `${email.substring(0, 2)}*****${email.slice(-3)}`;
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState(180);

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

    const handleVerify = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/verifyCode`, { email, code: code.join(''), cfMail: true });
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message);
        }
    }


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
        <div className={cx('login_background')}>
            <div className={cx('overlay')}>
                <div className={cx('verify-box')}>
                    <form onSubmit={handleVerify}>
                        <div className=" h-64 rounded text-center">
                            <h1 className="text-2xl font-bold">OTP Verification</h1>
                            <div className="flex flex-col mt-4">
                                <span>Enter the OTP you received at</span>
                                <span className="font-bold"> {displayEmail}</span>
                            </div>
                            <div className={cx('verify-code')}>
                                {`Time remaining: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                            </div>
                            <div className="flex justify-center text-center mt-5">
                                {code.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        id={`otp-${index + 1}`}
                                        className={cx("m-2", " border", "text-center", "wight", "rounded")}
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
                            <a className="flex items-center mt-5">
                                <div style={{ marginTop: '25px', left: "17%" }} className={cx('login_btn1')}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <input
                                        type="submit"
                                        value="Resend OTP"
                                        className={cx('btn-submit')}
                                        onClick={handCreateCode}
                                    />
                                </div>
                            </a>
                            <Link to='/register'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </Link>
                            <div style={{ margin: "17px 0 -35px 0px" }} className={cx('lb_register')}>
                                <label> Back to </label>
                                <Link to='/login'> &nbsp;  Sign in </Link>
                                <p style={{ margin: "0" }} > &nbsp; or</p>
                                <Link to='/register'> &nbsp;  Create an account </Link>
                            </div>
                        </div>
                    </form>
                    {/* <div>
                        <form onSubmit={(event) => handCreateCode(event, 'resend')}>
                            <button type='submit'>Resend Code</button>
                        </form>
                    </div> */}

                    {error && <ErrorModal message={error} onClose={() => setError(null)} />}
                </div>
            </div>
        </div>

    );
};

export default VerifyEmail;
