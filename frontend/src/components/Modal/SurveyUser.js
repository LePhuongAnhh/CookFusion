import React, { useState } from 'react';

import styles from "./SurveyUser.module.scss"
import classNames from 'classnames/bind'
import { Dropdown } from 'react-bootstrap';

const cx = classNames.bind(styles)
function SurveyUSer({ setShowSurveyModal }) {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    // DROPDOWN 
    const [selectedValue, setSelectedValue] = useState('I am healthy');
    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
    };

    //button
    const handleBounceClick = () => {
        const element = document.querySelector('.bouncebutton');
        element.classList.add('animated', 'bounce');
        setTimeout(() => {
            element.classList.remove('bounce');
        }, 2000);
    };
    return (
        <>
            <div className={cx('modalDeleteIdea')}>
                <div className={cx('modalContentDeleteIdea')}>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('createIdea')}>Tell us about your health</h1>
                        <div
                            className={cx('exit_cmt_modal')}
                            onClick={() => setShowSurveyModal(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                    <div className={cx('space')}></div>

                    <div className={cx('post_status')}>
                        <div className="container-fluid" id="grad1">
                            <div className="row justify-content-center mt-0">
                                <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
                                    <div className="px-0 pt-3 pb-0 mb-3">
                                        <p className={cx('back-food')}>You dont't like</p>
                                        <div className={cx("wrap-input100 validate-input")}>
                                            <input className={cx("input100")} type="text" name="baclfood" placeholder='Enter backdfood ...' />

                                        </div>

                                        <p className={cx('beenh')}>Do you have any disease?</p>
                                        <div className="row">
                                            <div className="col-md-12 mx-0">
                                                {/* <form id="msform">
                                                    <ul id="progressbar" style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
                                                        <li className={step === 1 ? "active" : ""} id="account"><strong>Account</strong></li>
                                                        <li className={step === 2 ? "active" : ""} id="personal"><strong>Personal</strong></li>
                                                        <li className={step === 3 ? "active" : ""} id="confirm"><strong>Finish</strong></li>
                                                    </ul>
                                                    {step === 1 && (
                                                        <fieldset>
                                                            <div className="form-card">
                                                                <h2 className="fs-title">Update Information</h2>
                                                                <input type="email" name="email" placeholder="Email Id" />
                                                                <input type="text" name="uname" placeholder="UserName" />
                                                                <input type="password" name="pwd" placeholder="Password" />
                                                                <input type="password" name="cpwd" placeholder="Confirm Password" />
                                                            </div>
                                                            <button type="button" className="next action-button" onClick={nextStep}>
                                                                Next Step
                                                            </button>
                                                        </fieldset>
                                                    )}
                                                    {step === 2 && (
                                                        <fieldset>
                                                            <div className="form-card">
                                                                <h2 className="fs-title">Personal Information</h2>

                                                            </div>
                                                            <button type="button" className="previous action-button-previous" onClick={prevStep}>
                                                                Previous
                                                            </button>
                                                            <button type="button" className="next action-button" onClick={nextStep}>
                                                                Next Step
                                                            </button>
                                                        </fieldset>
                                                    )}

                                                    {step === 3 && (
                                                        <fieldset>
                                                            <div className="form-card">
                                                                <h2 className="fs-title text-center">Success !</h2>
                                                                <br /><br />
                                                                <div className="row justify-content-center">
                                                                    <div className="col-3">
                                                                        <img src="https://img.icons8.com/color/96/000000/ok--v2.png" className="fit-image" alt="success" />
                                                                    </div>
                                                                </div>
                                                                <br /><br />
                                                                <div className="row justify-content-center">
                                                                    <div className="col-7 text-center">
                                                                        <h5>You Have Successfully </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    )}
                                                </form> */}

                                                <Dropdown onSelect={handleSelect}>
                                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                        {selectedValue}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Another action">Another action</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Something else here">Something else here</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </>
    );
}

export default SurveyUSer;