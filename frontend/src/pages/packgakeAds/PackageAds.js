import React, { useState, useEffect } from 'react';
import Inputmask from 'react-input-mask';
import styles from './PackageAds.module.scss'
import classNames from 'classnames/bind'
import images from '~/assets/images'
import { useNavigate } from 'react-router-dom'
import UpdateInfoSponsor from '~/components/Modal/UpdateInfoSponsor';
import { Link, useParams } from 'react-router-dom'
import PaymentModal from '~/components/Modal/PaymentModal';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { format, isValid, parseISO } from 'date-fns';
import {
    apiUrl,
    ADS,
    ADS_PAYMENT,
    ACCESS_TOKEN,
} from "../../constants/constants.js"
import axios from 'axios';
const cx = classNames.bind(styles)

function PackageAds() {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [activeTab, setActiveTab] = useState('credit-card');
    const [listHistoryUserPackage, setListHistoryUserPackage] = useState([])
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    const handleShowPaymentModal = (ads) => {
        localStorage.setItem(ADS, JSON.stringify(ads))
        localStorage.setItem(ADS_PAYMENT, true)
        navigate('/payment')
    }
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
            field: 'name',
            headerName: 'Package',
            width: 150,
        },
        {
            field: 'payer',
            headerName: 'Payer',
            width: 150,
        },
        {
            field: 'from',
            headerName: 'Date',
            width: 220,
        }, {
            field: 'type',
            headerName: 'Payment type',
            width: 140,
        },
        {
            field: 'cost',
            headerName: 'Prices ($)',
            width: 140,
            type: 'number'
        }

    ];


    // const totalPrice = listHistoryUserPackage.reduce((total, row) => (row.price ? total + row.price : total), 0);

    //loc du lieu theo tháng
    const [filteredMonth, setFilteredMonth] = useState(null); // State để lưu trữ tháng được lọc
    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value; // Lấy giá trị tháng từ dropdown hoặc input
        setFilteredMonth(selectedMonth);
    };
    const filterDataByMonth = (data, month) => {
        if (month) {
            const filteredData = data.filter((row) => {
                const rowDate = parseISO(row.from); // Parse the date string to a Date object
                return rowDate.getMonth() + 1 === Number(month); // Check the month against the selected month
            });
            return filteredData;
        }
        return data;
    };
    const filteredData = filterDataByMonth(listHistoryUserPackage, filteredMonth);

    //nút button
    const [isBouncing, setIsBouncing] = useState(false);
    const handleBounce = () => {
        setIsBouncing(true);
        setTimeout(() => {
            setIsBouncing(false);
        }, 2000);
    };
    const [paymentPackage, setPaymentPackage] = useState([])
    const [listAdsPackage, setListAdsPackage] = useState([])
    const [currentUserPackage, setCurrentUserPackage] = useState({ package: {}, from: "", to: "" })
    useEffect(() => {
        (async () => {
            try {
                const [adspackage, userpackage] = await Promise.all([
                    axios.get(`${apiUrl}/adspackage/getall`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }),
                    axios.get(`${apiUrl}/userpackage/getHistoryUserPackage`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }),
                ])
                if (adspackage.data.success && userpackage.data.success) {
                    let list = adspackage.data.data.map((ads, index) => { return { ...ads, id: index + 1 } })
                    setListAdsPackage(list)

                    list = userpackage.data.data.list.map((userAds, index) => {
                        return {
                            ...userAds, id: index,
                            from: userAds.from.substring(0, 10),
                            name: userAds.adsName[0].name,
                            cost: userAds.adsName[0].cost,
                            payer: userAds.invoice[0].name,
                            type: userAds.invoice[0].paymentType
                        }
                    })
                    setListHistoryUserPackage(list)
                    const currentpk = adspackage.data.data.find((ads) => { return ads._id == userpackage.data.data.currentPackage.AdsPackage_id })
                    setCurrentUserPackage(
                        {
                            package: currentpk,
                            from: userpackage.data.data.currentPackage.from,
                            to: userpackage.data.data.currentPackage.to
                        }
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (

        <div className={cx('packageAds')}>
            <div className={cx('packageAds-container')}>
                {/* PACKAGE CHOOSE  */}
                <div className={cx("h-screen")}>
                    <div className="container sm:mx-auto py-20 px-3">
                        <div className="grid lg:grid-cols-3 gap-6" style={{ display: 'flex', justifyContent: "center" }}>
                            {listAdsPackage.length > 0 && listAdsPackage.map((ads) => (
                                <div className={cx("p-3", "border", "rounded", "px-5", "py-6")} >
                                    <span className="text-2xl">{ads.name}</span>
                                    <div className="flex row-auto items-center mt-1">
                                        <h2 className={cx("text-3xl", "font-bold")}>{ads.cost} $</h2>
                                        <span className="font-light text-gray-400 ml-1">/month</span>
                                    </div>
                                    <p className="text-gray-500 mt-4">
                                        {/* For most businesses that want to optimize the web series */}
                                    </p>
                                    <div className="flex row-auto items-center mt-4">
                                        <i className="bi bi-check-circle text-info"></i>
                                        <span className="ml-3 text-gray-500">Display ads: {ads.ratingDes}</span>
                                    </div>
                                    <div className="flex row-auto items-center mt-2">
                                        <i className="bi bi-check-circle text-info"></i>
                                        <span className="ml-3 text-gray-500">Active post: {ads.activePost} posts</span>
                                    </div>
                                    <div className="flex row-auto items-center mt-2">
                                        {
                                            (ads.banner == 1) ? <i className="bi bi-check-circle text-info"></i>
                                                : <i className="bi bi-check-circle text-danger"></i>
                                        }
                                        <span className="ml-3 text-gray-500">Banner ads: {(ads.banner == 1) ? "Yes" : "No"}</span>
                                    </div>
                                    <div className="flex row-auto items-center mt-2">
                                        {
                                            (ads.dashboard) ? <i className="bi bi-check-circle text-info"></i>
                                                : <i className="bi bi-check-circle text-danger"></i>
                                        }
                                        <span className="ml-3 text-gray-500">Dashboard: {(ads.dashboard) ? "Yes" : "No"}</span>
                                    </div>
                                    <div className="mt-5">
                                        <button className={cx('choose_btn')} onClick={() => handleShowPaymentModal(ads)}>Buy / Upgrade</button>
                                    </div>
                                </div>
                            ))}
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
                                            {/* CLICK  */}
                                            <div className=" pt-4 pl-2 pr-2 pb-2">
                                                <ul role="tablist" className="nav bg-light nav-pills rounded nav-fill mb-3">
                                                    <li className={cx("nav-item")}>
                                                        <button onClick={() => handleTabChange('credit-card')} className={`nav-link ${activeTab === 'credit-card' ? 'active' : ''}`} style={{ width: "77%", marginLeft: "10px", height: "40px" }}>
                                                            <i className="fas fa-credit-card mr-2"></i> Active
                                                        </button>
                                                    </li>
                                                    <li className={cx("nav-item")} style={{ marginRight: "173px" }}>
                                                        <button onClick={() => handleTabChange('paypal')} className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`} style={{ width: "61%", height: "40px" }}>
                                                            <i className="fab fa-paypal mr-2"></i> Payment history
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>


                                            <div className="tab-content">
                                                {/* //Active */}
                                                <div id="credit-card" className={`tab-pane fade ${activeTab === 'credit-card' ? 'show active pt-3' : ''}`}>
                                                    <div className="page-content page-container" id="page-content">
                                                        <div className="padding">
                                                            <div className="row container d-flex justify-content-center">
                                                                <div className="col-lg-5 grid-margin stretch-card" style={{ width: "100%" }}>
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h4 className="card-title">You are using package {currentUserPackage.package.name}</h4>
                                                                            {/* <p className="card-description"> Details of your advertising package</p> */}
                                                                            <form className="forms-sample">
                                                                                <div className="form-group row">
                                                                                    <div className="col">
                                                                                        <label>Purchase date </label>
                                                                                        <input className={cx("form-control")} disabled value={currentUserPackage.from.substring(0, 10)} />
                                                                                    </div>
                                                                                    <div className="col">
                                                                                        <label>Expiration date</label>
                                                                                        <input className={cx("form-control")} disabled value={currentUserPackage.to.substring(0, 10)} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div className="padding">
                                                                                        <div className="row container d-flex justify-content-center" style={{ marginLeft: "0px" }}>
                                                                                            <button type="button" id="bouncebutton" className={cx('btn-button')} onClick={() => handleShowPaymentModal(currentUserPackage.package)} >Continuation</button>
                                                                                            {/* <button type="button" id="bouncebutton" className={cx('btn-button')} >Update</button> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* HISTORY PAYMENT */}
                                                <div id="paypal" className={`tab-pane fade ${activeTab === 'paypal' ? 'show active pt-3' : ''}`}>
                                                    <div className="row d-flex justify-content-center mt-100 mb-100">
                                                        <div className="col-lg-6" style={{ width: "100%" }}>
                                                            <div className="card">
                                                                <Box
                                                                    sx={{
                                                                        height: 370,
                                                                        border: 'none'
                                                                    }}>
                                                                    <div className={cx('filter-month')} style={{ margin: '15px 10px 15px' }}>
                                                                        <label htmlFor="monthFilter"> Choose Month &nbsp;</label>
                                                                        <select id="monthFilter" onChange={handleMonthChange}>
                                                                            <option value="">All</option>
                                                                            <option value="1">Tháng 1</option>
                                                                            <option value="2">Tháng 2</option>
                                                                            <option value="3">Tháng 3</option>
                                                                            <option value="4">Tháng 4</option>
                                                                            <option value="5">Tháng 5</option>
                                                                            <option value="6">Tháng 6</option>
                                                                            <option value="7">Tháng 7</option>
                                                                            <option value="8">Tháng 8</option>
                                                                            <option value="9">Tháng 9</option>
                                                                            <option value="10">Tháng 10</option>
                                                                            <option value="11">Tháng 11</option>
                                                                            <option value="12">Tháng 12</option>

                                                                        </select>
                                                                    </div>
                                                                    <DataGrid
                                                                        rows={filteredData} // Pass filteredData instead of the unfiltered rows
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

                                                    {/* <div style={{ textAlign: 'center' }}>
                                                        <strong> Total Prices: {totalPrice} $</strong>
                                                    </div> */}
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
            {/* {showPaymentModal && < PaymentModal setShowPaymentModal={setShowPaymentModal} userPackage={paymentPackage} />} */}
        </div>

    );
}

export default PackageAds;