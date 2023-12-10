import classNames from 'classnames/bind'
import styles from './PackageAds.module.scss'

import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import LineChart from './Linechart';
import MixChart from '../admin/Chart/Mixchart';
import axios from "axios"
import {
    apiUrl,
    ACCESS_TOKEN,
    PROFILE_INFORMATION
} from "~/constants/constants"
import AdBarsChart from '../admin/Chart/AdBarChart';

const cx = classNames.bind(styles)
function DashboardAds() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [activeTab, setActiveTab] = useState('credit-card');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    const [ratingCategory, setRatingCategory] = useState([])
    const [total, settotal] = useState({articles:[],likes:0,comments:0})
    useEffect(() => {
        (async () => {
            try {
                const [response, totalArticle] = await Promise.all([
                    axios.get(`${apiUrl}/admin/getDashboard`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }),
                    axios.get(`${apiUrl}/ads/getListAdsBySponsor`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }),
                ])
                if (response.data.success) {
                    setRatingCategory(response.data.rating)
                }
                if (totalArticle.data.success){
                    settotal({articles:totalArticle.data.data.articles, likes:totalArticle.data.data.states,comments:totalArticle.data.data.comments})
                } 
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <>
            <div className={cx('packageAds')}>
                <div className={cx('packageAds-container')}>
                    <div className={cx("payment-history")}>
                        <div className={cx('header-history')}>
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-lg-6 mx-auto" style={{ width: "80%" }}>

                                        <div className="card" style={{ marginTop: "50px" }}>
                                            <div className="card-header">
                                                <h4 className={cx("card-title")} style={{ margin: "20px 7px 15px" }}>Overview of advertising value</h4>
                                                <div class="row" style={{ margin: "20px 0" }}>
                                                    <div class="col-md-6 d-flex justify-content-center">
                                                        <div class="card insert ml-3 mb-3 container">
                                                            {/* <img src="https://img.icons8.com/dotty/128/000000/2012.png" class="center" /> */}
                                                            <span className={cx('title-total')}>Total article</span>
                                                            <p className={cx('number-article')} >{total.articles.length} posts</p>
                                                            <p className={cx('number-article')}></p>
                                                        </div>

                                                    </div>
                                                    <div class="col-md-6 d-flex justify-content-center">
                                                        <div class="card insert mr-3 mb-3 container">
                                                            {/* <img src="https://img.icons8.com/color/128/000000/grocery-bag.png" class="center" /> */}
                                                            <span className={cx('title-total')}>Total interaction</span>
                                                            <p className={cx('number-article')}>{total.likes} likes</p>
                                                            <p className={cx('number-article')}>{total.comments} comments</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card" style={{ marginTop: "50px" }}>
                                            <div className="card-header">
                                                {/* CLICK  */}
                                                <div className=" pt-4 pl-2 pr-2 pb-2">
                                                    <ul role="tablist" className="nav bg-light nav-pills rounded nav-fill mb-3">
                                                        <li className={cx("nav-item")}>
                                                            <button onClick={() => handleTabChange('credit-card')} className={`nav-link ${activeTab === 'credit-card' ? 'active' : ''}`} style={{ width: "77%", marginLeft: "10px", height: "40px" }}>
                                                                <i className="fas fa-credit-card mr-2"></i> Category of recipe
                                                            </button>
                                                        </li>
                                                        <li className={cx("nav-item")} style={{ marginRight: "173px" }}>
                                                            <button onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`} style={{ width: "61%", height: "40px" }}>
                                                                <i className="fab fa-paypal mr-2"></i> Category of meal plan
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>


                                                <div className="tab-content">
                                                    {/* //Active */}
                                                    <div id="paypal" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active pt-3' : ''}`}>
                                                        <div className="page-content page-container" id="page-content">
                                                            <div className="padding">
                                                                <div className="row container d-flex justify-content-center">
                                                                    <div className="col-lg-5 grid-margin stretch-card" style={{ width: "100%" }}>
                                                                        <div className="card">
                                                                            <div className="card-body">
                                                                                <MixChart ratingCategory={ratingCategory}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* HISTORY PAYMENT */}
                                                    <div id="paypal" className={`tab-pane fade ${activeTab === 'paypal' ? 'show active pt-3' : ''}`}>
                                                        <div className="page-content page-container" id="page-content">
                                                            <div className="padding">
                                                                <div className="row container d-flex justify-content-center">
                                                                    <div className="col-lg-5 grid-margin stretch-card" style={{ width: "100%" }}>
                                                                        <div className="card">
                                                                            <div className="card-body">
                                                                                <AdBarsChart/>
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

export default DashboardAds;