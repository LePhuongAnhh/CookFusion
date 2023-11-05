import React, { useState, useEffect } from 'react';
import Inputmask from 'react-input-mask';
import styles from './PackageAds.module.scss'
import classNames from 'classnames/bind'
import images from '~/assets/images'
import UpdateInfoSponsor from '~/components/Modal/UpdateInfoSponsor';
import { Link } from 'react-router-dom'
import PaymentModal from '~/components/Modal/PaymentModal';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { format, isValid, parseISO } from 'date-fns';
const cx = classNames.bind(styles)

function PackageAds() {
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [activeTab, setActiveTab] = useState('credit-card');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    const columns = [
        {
            field: 'No.',
            headerName: 'No.',
            width: 70,
            renderCell: (params) => {
                return <div>{params.row.id + 1}</div>; // Adjust to begin numbering from 1
            },
        },

        {
            field: 'package',
            headerName: 'Package',
            width: 150,
        },
        {
            field: 'payments',
            headerName: 'Payments',
            width: 150,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 200,
        },
        {
            field: 'price',
            headerName: 'Prices',
            width: 100,
            type: 'number'
        }

    ];


    const rows = [
        { id: 1, package: 'Snow', payments: 'Jon', date: "20/11/2023", price: 35 },
        { id: 2, package: 'Lannister', payments: 'Cersei', date: "20/11/2023", price: 42 },
        { id: 3, package: 'Lannister', payments: 'Jaime', date: "20/11/2023", price: 45 },
        { id: 4, package: 'Stark', payments: 'Arya', date: "20/11/2023", price: 16 },
        { id: 5, package: 'Targaryen', payments: 'Daenerys', date: "20/11/2023", price: null },
        { id: 6, package: 'Melisandre', payments: null, date: "20/11/2023", price: 150 },
        { id: 7, package: 'Clifford', payments: 'Ferrara', date: "20/11/2023", price: 44 },
        { id: 8, package: 'Frances', payments: 'Rossini', date: "20/11/2023", price: 36 },
        { id: 9, package: 'Roxie', payments: 'Harvey', date: "20/11/2023", price: 65 },
    ];
    const totalPrice = rows.reduce((total, row) => (row.price ? total + row.price : total), 0);
    return (
        <div className={cx('packageAds')}>
            <div className={cx('packageAds-container')}>
                {/* header package */}
                <div className={cx('create_auto_plan')}>
                    <div className={cx('plan_left')}>
                        <div className={cx('plan_wrapper')}>
                            <div className={cx('automatic_plan')}>
                                <div className={cx('title_wrapper')}>
                                    <div className={cx('text_wrapper')}>
                                        <span className={cx('title')}>Package 1  </span>
                                        <span className={cx('suptitle')}>Recomment</span>
                                    </div>
                                </div>
                                <div className={cx('intr_plan')}>
                                    <span className={cx('intro_text')}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={cx('choose_btn')} onClick={() => setShowPaymentModal(true)}>Giá Ads</span>
                            </div>
                            <div className={cx('automatic_plan')}>
                                <div className={cx('title_wrapper')}>
                                    <div className={cx('text_wrapper')}>
                                        <span className={cx('title')}>Ten Package 2 </span>
                                        <span className={cx('suptitle')}>Recommended</span>
                                    </div>
                                </div>
                                <div className={cx('intr_plan')}>
                                    <span className={cx('intro_text')}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={cx('choose_btn1')} onClick={() => setShowPaymentModal(true)}>Giá Ads</span>
                            </div>
                            <div className={cx('automatic_plan')}>
                                <div className={cx('title_wrapper')}>
                                    <div className={cx('text_wrapper')}>
                                        <span className={cx('title')}>Ten package 3  </span>
                                        <span className={cx('suptitle')}>Recommended</span>
                                    </div>
                                </div>
                                <div className={cx('intr_plan')}>
                                    <span className={cx('intro_text')}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={cx('choose_btn1')} onClick={() => setShowPaymentModal(true)}>Giá Ads</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* //lịch sử thanh toán */}
                <div className={cx("payment-history")}>
                    <div className={cx('header-history')}>
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-6 mx-auto" style={{ width: "80%" }}>
                                    <div className="card">
                                        <div className="card-header">
                                            <div className=" pt-4 pl-2 pr-2 pb-2">
                                                <ul role="tablist" className="nav bg-light nav-pills rounded nav-fill mb-3">
                                                    <li className={cx("nav-item")}>
                                                        <button onClick={() => handleTabChange('credit-card')} className={`nav-link ${activeTab === 'credit-card' ? 'active' : ''}`} style={{ width: "77%" }}>
                                                            <i className="fas fa-credit-card mr-2"></i> Using
                                                        </button>
                                                    </li>
                                                    <li className={cx("nav-item")} style={{ marginRight: "173px" }}>
                                                        <button onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`} style={{ width: "61%" }}>
                                                            <i className="fab fa-paypal mr-2"></i> Payment history
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="tab-content">
                                                <div id="credit-card" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active pt-3' : ''}`}>
                                                    Hello
                                                </div>
                                                <div id="paypal" className={`tab-pane fade ${activeTab === 'paypal' ? 'show active pt-3' : ''}`}>
                                                    {/* //noi dung  */}
                                                    <div className="row d-flex justify-content-center mt-100 mb-100">
                                                        <div className="col-lg-6" style={{ width: "100%" }}>
                                                            <div className="card">
                                                                {/* <div className="card-body text-center">
                                                                    <h4 className="card-title m-b-0">News Updates</h4>
                                                                </div> */}

                                                                <Box
                                                                    sx={{
                                                                        height: 415,
                                                                        width: '100%',
                                                                        fontSize: 20,
                                                                        border: 'none'
                                                                    }}>
                                                                    <DataGrid
                                                                        rows={rows}
                                                                        columns={columns}
                                                                        // đặt kích thước trang ban đầu thành 6
                                                                        initialState={{
                                                                            pagination: {
                                                                                paginationModel: {
                                                                                    pageSize: 5,
                                                                                },
                                                                            },
                                                                        }}
                                                                        sx={{
                                                                            fontSize: '16'
                                                                        }}
                                                                        //Xác định các tùy chọn có sẵn để chọn kích thước trang.
                                                                        pageSizeOptions={[6]}
                                                                        disableRowSelectionOnClick //Vô hiệu hóa lựa chọn hàng khi nhấp vào một hàng.
                                                                    />
                                                                </Box>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ textAlign: 'center' }}>
                                                        <strong>Total Prices: {totalPrice}</strong>
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
            {showPaymentModal && < PaymentModal setShowPaymentModal={setShowPaymentModal} />}
        </div>

    );
}

export default PackageAds;