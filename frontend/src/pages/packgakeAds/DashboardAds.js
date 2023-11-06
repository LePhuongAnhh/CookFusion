import classNames from 'classnames/bind'
import styles from './PackageAds.module.scss'

import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import LineChart from './Linechart';

const columns = [
    {
        field: 'spacer', // Tạo một cột trống
        headerName: '',
        width: 8, // Thiết lập độ rộng của cột để tạo khoảng trống
    },
    {
        field: 'No.',
        headerName: 'No.',
        width: 80,
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
        field: 'title',
        headerName: 'Title',
        width: 250,
    },
    {
        field: 'interact',
        headerName: 'Interact',
        width: 150,
    },
    {
        field: 'active',
        headerName: 'Hạn sử dụng',
        width: 150,
    },
];

const rows = [
    { id: 1, package: 'Snow', title: 'Jon', interact: "242", active: 13 },
    { id: 2, package: 'Lannister', title: 'Cersei', interact: "242", active: 24 },
    { id: 3, package: 'Lannister', title: 'Jaime', interact: "242", active: 14 },
    { id: 4, package: 'Stark', title: 'Arya', interact: "242", active: 24 },
    { id: 5, package: 'Targaryen', title: 'Daenerys', interact: "242", active: "Hết hạn" },
    { id: 6, package: 'Melisandre', title: null, interact: "242", active: 23 },
    { id: 7, package: 'Clifford', title: 'Ferrara', interact: "242", active: 24 },
    { id: 8, package: 'Frances', title: 'Rossini', interact: "242", active: 52 },
    { id: 9, package: 'Roxie', title: 'Harvey', interact: "242", active: 53 },
];

const cx = classNames.bind(styles)
function DashboardAds() {
    const [activeTab, setActiveTab] = useState('credit-card');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
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
                                                            <p className={cx('number-article')} >234 bài</p>
                                                            <p className={cx('number-article')}>s lượng package đã mua</p>
                                                        </div>

                                                    </div>
                                                    <div class="col-md-6 d-flex justify-content-center">
                                                        <div class="card insert mr-3 mb-3 container">
                                                            {/* <img src="https://img.icons8.com/color/128/000000/grocery-bag.png" class="center" /> */}
                                                            <span className={cx('title-total')}>Total interaction</span>
                                                            <p className={cx('number-article')}>2645 Lượt</p>
                                                            <p className={cx('number-article')}>số tền đã bỏ ra</p>
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
                                                                <i className="fas fa-credit-card mr-2"></i> Accomplished
                                                            </button>
                                                        </li>
                                                        <li className={cx("nav-item")} style={{ marginRight: "173px" }}>
                                                            <button onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`} style={{ width: "61%", height: "40px" }}>
                                                                <i className="fab fa-paypal mr-2"></i> Line chart
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>


                                                <div className="tab-content">
                                                    {/* //Active */}
                                                    <div id="credit-card" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active pt-3' : ''}`}>
                                                        <div className="row d-flex justify-content-center mt-100 mb-100">
                                                            <div className="col-lg-6" style={{ width: "100%" }}>
                                                                <div className="card">
                                                                    <Box
                                                                        sx={{
                                                                            height: 370,
                                                                            border: 'none'
                                                                        }}>
                                                                        <DataGrid
                                                                            rows={rows} // Pass filteredData instead of the unfiltered rows
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
                                                                            pageSizeOptions={[5]}
                                                                            disableRowSelectionOnClick //Vô hiệu hóa lựa chọn hàng khi nhấp vào một hàng.

                                                                        />
                                                                    </Box>
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

                                                                                <LineChart />

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