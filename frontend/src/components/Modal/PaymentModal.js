import React, { useState, useEffect } from "react"
import styles from './PaymentModal.module.scss'
import classNames from 'classnames/bind'
import images from "~/assets/images"
const cx = classNames.bind(styles)


function PaymentModal({ setShowPaymentModal }) {
    return (
        <div className={cx('modalDeleteIdea')}>
            <div div className={cx('modalContentDeleteIdea')}>
                <div className={cx("row")}>
                    <div className={cx("container", "d-flex", "justify-content-center")}>
                        <div className="col-md-6" style={{ width: "65%" }}>
                            <div className={cx("card", " text-center")} style={{ borderRadius: "10px" }}>
                                <div className={cx("card-body")}>
                                    {/* <img src={images.payment} className={cx('img-payment')} /> */}
                                    <h5 className={cx("title")}>Payment</h5>
                                    <p className={cx("description")}>Please select the payment method for package PACKAGE NAME to complete the purchasing process.</p>
                                    <div className={cx("row")}>
                                        <div className="col-sm-6 mb-2  mb-md-0">
                                            <button className={cx("btn", "color-credit")}><i class="bi bi-credit-card-2-back"></i> Credit Cart</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <button className={cx("btn", "color-pay")}><i class="bi bi-paypal"></i> Online Pay</button>
                                        </div>
                                    </div>
                                    <div className={cx("text-center", "mt-30")}>
                                        <div onClick={() => setShowPaymentModal(false)} id="close-modal">Not Now</div>
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

export default PaymentModal;