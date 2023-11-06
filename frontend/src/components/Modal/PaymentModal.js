import React, { useState, useEffect } from "react"
import styles from './PaymentModal.module.scss'
import { Link,useNavigate } from 'react-router-dom'
import { PayPalButton } from "react-paypal-button-v2";
import classNames from 'classnames/bind'
import images from "~/assets/images"

import axios from 'axios'
import {
    apiUrl,
    ACCESS_TOKEN,
    ADS,
    PROFILE_INFORMATION,
    ADS_PAYMENT
} from "~/constants/constants"

const cx = classNames.bind(styles)
const accessToken = localStorage.getItem(ACCESS_TOKEN);



function PaymentModal({}) {
    const [ads,setAds] = useState([])
    const isPayment = localStorage.getItem(ADS_PAYMENT)
    const navigate = useNavigate();
    const [sdk, setSdk] = useState(false)
    const addPaypalScript = async () => {
        const data = await axios.get(`${apiUrl}/userpackage/getPaypalClientId`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data.data.data}`
        script.async = true;
        script.onload = () => {
            setSdk(true)
        }
        document.body.appendChild(script)
    }
    const handleAddUserPackage = async (details) => {
        try {
            const res = await axios.post(`${apiUrl}/userpackage/addnew`, {
                data: details,
                userPackage: {
                    AdsPackage_id: ads._id
                }
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            localStorage.setItem(ADS_PAYMENT,false)
            navigate('/packageAds')
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        try{
            setAds(JSON.parse(localStorage.getItem(ADS)))
            if (isPayment != 'true') navigate('/packageAds')
            else if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdk(true)
            }
        }catch(error){
            navigate('/packageAds')
        }
        
    }, [])
    return (
        <>

            <div className={cx('modalDeleteIdea')}>
                <div div className={cx('modalContentDeleteIdea')}>
                    <div className={cx("row")}>
                        <div className={cx("container", "d-flex", "justify-content-center")}>
                            <div className="col-md-6" style={{ width: "65%" }}>
                                <div className={cx("card", " text-center")} style={{ borderRadius: "10px" }}>
                                    <div className={cx("card-body")}>
                                        {/* <img src={images.payment} className={cx('img-payment')} /> */}
                                        <h5 className={cx("title")}>How will you pay for advertising?</h5>
                                        <p className={cx("description")}>You need a payment method to advertise. Of course, we'll only charge you when your ads start running.</p>
                                        <div className={cx("row")}>
                                            {sdk == true && (
                                                <PayPalButton
                                                    amount={(ads)?ads.cost:0}
                                                    onSuccess={(details, data) => {
                                                        alert("Transaction completed by " + details.payer.name.given_name);
                                                        handleAddUserPackage(details)
                                                    }}
                                                    onError={() => {
                                                        alert("Số dư không đủ hoặc xảy ra lỗi")
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className={cx("text-center", "mt-30")}>
                                            <div id="close-modal"><Link to="/packageAds">Not Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentModal;