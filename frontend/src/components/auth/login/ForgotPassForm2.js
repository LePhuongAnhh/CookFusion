// import styles from './LoginForm.module.scss'
// import React, { useState, useRef } from 'react';
// import ErrorModal from '~/components/Modal/ErrorModal';
// import classNames from 'classnames/bind'
// import images from '~/assets/images'
// import axios from "axios"
// import { apiUrl, PROFILE_INFORMATION } from '~/constants/constants';
// import { useLocation, useNavigate, Link } from 'react-router-dom';

// const cx = classNames.bind(styles)
// const ForgotPassForm2 = () => {
//     const [code, setOTPValues] = useState(['', '', '', '', '', '']);
//     const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();


//     const handleInput = (index, value) => {
//         const newOTPValues = [...code];
//         newOTPValues[index] = value;
//         setOTPValues(newOTPValues);
//     };

//     const handleKeyDown = (index, event) => {
//         // If Enter is pressed, move to the next input
//         if (event.key === 'Enter' && index < code.length - 1) {
//             event.preventDefault(); // Prevent the default Enter behavior (form submission)
//             inputRefs.current[index + 1].focus();
//         }
//     };


//     const handVerifyCode = async (event) => {
//         console.log('Conform button clicked');
//         event.preventDefault();
//         try {
//             const response = await axios.post(`${apiUrl}/auth/createCode`, { email });
//             navigate('/forgotpassword3');
//         } catch (error) {
//             console.error('Error creating code:', error);
//             setError(error.response.data.message);
//         }
//     };
//     return (
//         <>
//             <div className={cx('login_background')}>
//                 <div className={cx('overlay')}>
//                     <div className={cx('forgotpass_box')}>
//                         <h2>Forgot Password</h2>
//                         <div className={cx('send_email')}>
//                             <img src={images.email} />
//                         </div>
//                         <p className={cx('inform_email')}>
//                             Please check your email for further instructions.
//                         </p>
//                         <form onSubmit={handVerifyCode} >
//                             <div className={cx('verify-code')}>
//                                 {code.map((value, index) => (
//                                     <input
//                                         key={index}
//                                         ref={(ref) => (inputRefs.current[index] = ref)}
//                                         id={`otp-${index + 1}`}
//                                         className={cx("m-2", " border", "text-center", "wight", "rounded", 'input_field')}
//                                         type="text"
//                                         maxLength="1"
//                                         value={value}
//                                         onInput={(e) => handleInput(index, e.target.value)}
//                                         onKeyDown={(e) => handleKeyDown(index, e)}
//                                         onFocus={(e) => {
//                                             e.target.select();
//                                             if (index > 0 && code[index - 1] === '') {
//                                                 // If the previous input is empty, focus on it instead
//                                                 inputRefs.current[index - 1].focus();
//                                             }
//                                         }}
//                                     />

//                                 ))}

//                                 {/* <label for="text">Enter PIN code</label> */}
//                             </div>
//                             <div className={cx('login_btn1')}>
//                                 <span></span>
//                                 <span></span>
//                                 <span></span>
//                                 <span></span>
//                                 <input type="submit" value='Conform' />
//                             </div>

//                             <Link to='/forgotpassword'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
//                                     <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
//                                 </svg>
//                             </Link>

//                             <div className={cx('lb_register')}>
//                                 <label> Back to </label>
//                                 <Link to='/login'> &nbsp;  Sign in </Link>
//                                 <p> &nbsp; or</p>
//                                 <Link to='/register'> &nbsp;  Create an account </Link>
//                             </div>
//                         </form>
//                         {error && <ErrorModal message={error} onClose={() => setError(null)} />}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ForgotPassForm2


import styles from './LoginForm.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import images from '~/assets/images'
const cx = classNames.bind(styles)
const ForgotPassForm2 = () => {
    return (
        <>
            <div className={cx('login_background')}>
                <div className={cx('overlay')}>
                    <div className={cx('forgotpass_box')}>
                        <h2>Forgot Password</h2>
                        <div className={cx('send_email')}>
                            <img src={images.email} />
                        </div>
                        <p className={cx('inform_email')}>
                            Please check your email for further instructions.
                        </p>
                        <form>
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="text"
                                    name="pin code"
                                    required
                                />
                                <label for="text">Enter PIN code</label>
                            </div>
                            <div className={cx('login_btn1')}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Conform
                            </div>

                            <Link to='/forgotpassword'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </Link>

                            <div className={cx('lb_register')}>
                                <label> Back to </label>
                                <Link to='/login'> &nbsp;  Sign in </Link>
                                <p> &nbsp; or</p>
                                <Link to='/register'> &nbsp;  Create an account </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassForm2