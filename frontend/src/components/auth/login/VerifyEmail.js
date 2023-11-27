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
