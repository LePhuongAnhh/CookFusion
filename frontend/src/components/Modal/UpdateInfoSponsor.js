import styles from './UpdateInfoSponsor.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { apiUrl, ACCESS_TOKEN } from '~/constants/constants';

const cx = classNames.bind(styles);
function UpdateInfoSponsor({ setShowBuyPackageModal }) {
    const [activeTab, setActiveTab] = useState('credit-card');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalCreateCategory')}>
                <div className={cx('createIdeaHeader')}>
                    <h1 className={cx('createIdea')}>Create new a Category</h1>
                    <div className={cx('exit_cmt_modal')} onClick={() => setShowBuyPackageModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div className={cx('card-body')}>
                    <div class="container py-5">
                        <div class="row">
                            <div class="col-lg-6 mx-auto">
                                <div class="card ">
                                    <div class="card-header">
                                        <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                                            <ul role="tablist" className="nav bg-light nav-pills rounded nav-fill mb-3">
                                                <li className="nav-item">
                                                    <a href="#credit-card" onClick={() => handleTabChange('credit-card')} className={`nav-link ${activeTab === 'credit-card' ? 'active' : ''}`}>
                                                        <i className="fas fa-credit-card mr-2"></i> Credit Card
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#paypal" onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`}>
                                                        <i className="fab fa-paypal mr-2"></i> Paypal
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-content">
                                            <div id="credit-card" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active' : ''}`}>
                                                <form role="form" onsubmit="event.preventDefault()">
                                                    <div class="form-group"> <label for="username">
                                                        <h6>Card Owner</h6>
                                                    </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control " /> </div>
                                                    <div class="form-group"> <label for="cardNumber">
                                                        <h6>Card number</h6>
                                                    </label>
                                                        <div class="input-group"> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required />
                                                            <div class="input-group-append"> <span class="input-group-text text-muted"> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-8">
                                                            <div class="form-group"> <label><span class="hidden-xs">
                                                                <h6>Expiration Date</h6>
                                                            </span></label>
                                                                <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required /> <input type="number" placeholder="YY" name="" class="form-control" required /> </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                                                <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                                            </label> <input type="text" required class="form-control" /> </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-footer">
                                                        <button type="button" class="subscribe btn btn-primary btn-block shadow-sm"> Confirm Payment </button>
                                                    </div>
                                                </form>

                                            </div>

                                            <div id="paypal" className={`tab-pane fade ${activeTab === 'paypal' ? 'show active' : ''}`}>
                                                <h6 class="pb-2">Select your paypal account type</h6>
                                                <div class="form-group "> <label class="radio-inline">
                                                    <input type="radio" name="optradio" checked /> Domestic </label> <label class="radio-inline"> <input type="radio" name="optradio" class="ml-5" />International </label></div>
                                                <p> <button type="button" class="btn btn-primary "><i class="fab fa-paypal mr-2"></i> Log into my Paypal</button> </p>
                                                <p class="text-muted"> Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateInfoSponsor;