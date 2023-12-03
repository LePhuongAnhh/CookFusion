// import React, { useState, useRef } from 'react';
// import ErrorModal from '~/components/Modal/ErrorModal';
// import axios from "axios"
// import { apiUrl, PROFILE_INFORMATION } from '~/constants/constants';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import classNames from 'classnames/bind'
// import styles from './LoginForm.module.scss'

// const cx = classNames.bind(styles)
// const VerifyEmail = () => {
//     const [code, setOTPValues] = useState(['', '', '', '', '', '']);
//     const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
//     const navigate = useNavigate();
//     const location = useLocation();
//     const email = new URLSearchParams(location.search).get('email');
//     const displayEmail = `${email.substring(0, 2)}*****${email.slice(-3)}`;
//     const [error, setError] = useState(null);

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

//     const handleVerify = async (event) => {
//         event.preventDefault();
//         try {
//             console.log('Entered OTP:', code.join(''));
//             const response = await axios.post(`${apiUrl}/auth/verifyCode`, { email, code });
//             navigate('/login');
//         } catch (error) {
//             setError(error.response.data.message);
//         }
//     }


//     return (
//         <div className={cx('login_background')}>
//             <div className={cx('overlay')}>
//                 <div className={cx('verify-box')}>
//                     <form onSubmit={handleVerify}>
//                         <div className=" h-64 py-3 rounded text-center">
//                             <h1 className="text-2xl font-bold">OTP Verification</h1>
//                             <div className="flex flex-col mt-4">
//                                 <span>Enter the OTP you received at</span>
//                                 <span className="font-bold"> {displayEmail}</span>
//                             </div>
//                             <div className="flex justify-center text-center mt-5">
//                                 {code.map((value, index) => (
//                                     <input
//                                         key={index}
//                                         ref={(ref) => (inputRefs.current[index] = ref)}
//                                         id={`otp-${index + 1}`}
//                                         className={cx("m-2", " border", "text-center", "wight", "rounded")}
//                                         type="text"
//                                         maxLength="1"
//                                         value={value}
//                                         onInput={(e) => handleInput(index, e.target.value)}
//                                         onKeyDown={(e) => handleKeyDown(index, e)}
//                                         onFocus={(e) => {
//                                             e.target.select();
//                                             if (index > 0 && code[index - 1] === '') {
//                                                 inputRefs.current[index - 1].focus();
//                                             }
//                                         }}
//                                     />
//                                 ))}
//                             </div>
//                             <a className="flex items-center mt-5">
//                                 <div style={{ marginTop: '25px', left: "17%" }} className={cx('login_btn1')}>
//                                     <span></span>
//                                     <span></span>
//                                     <span></span>
//                                     <span></span>
//                                     <input type="submit" value=' Resend OTP' />


//                                 </div>
//                             </a>
//                             <Link to='/register'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
//                                     <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
//                                 </svg>
//                             </Link>
//                             {/* </div> */}
//                         </div>
//                     </form>

//                     {error && <ErrorModal message={error} onClose={() => setError(null)} />}
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default VerifyEmail;


import React, { useState, useRef } from 'react';

const VerifyEmail = () => {
    const [otpValues, setOTPValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

    const handleInput = (index, value) => {
        const newOTPValues = [...otpValues];
        newOTPValues[index] = value;
        setOTPValues(newOTPValues);

        // Focus on the next input and set its value if the current input has a value
        if (index < otpValues.length - 1 && value !== '') {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        // If Enter is pressed, move to the next input
        if (event.key === 'Enter' && index < otpValues.length - 1) {
            event.preventDefault(); // Prevent the default Enter behavior (form submission)
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <div className="h-screen bg-blue-500 py-20 px-3">
            <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                    <div className="w-full">
                        <div className="bg-white h-64 py-3 rounded text-center">
                            <h1 className="text-2xl font-bold">OTP Verification</h1>
                            <div className="flex flex-col mt-4">
                                <span>Enter the OTP you received at</span>
                                <span className="font-bold">+lw ******.com</span>
                            </div>
                            <div className="flex flex-row justify-center text-center px-2 mt-5">
                                {otpValues.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        id={`otp-${index + 1}`}
                                        className="m-2 border h-10 w-10 text-center form-control rounded"
                                        type="text"
                                        maxLength="1"
                                        value={value}
                                        onInput={(e) => handleInput(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onFocus={(e) => {
                                            e.target.select();
                                            if (index > 0 && otpValues[index - 1] === '') {
                                                // If the previous input is empty, focus on it instead
                                                inputRefs.current[index - 1].focus();
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center text-center mt-5">
                                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                                    <button className="font-bold">Resend OTP</button>
                                    <i className="bx bx-caret-right ml-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
