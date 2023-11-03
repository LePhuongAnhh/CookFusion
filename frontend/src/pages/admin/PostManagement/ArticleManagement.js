import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Table from 'react-bootstrap/Table';
import styles from "../AccountManagement/AccountManagement.module.scss"
import DeletePost from '~/components/Modal/DeletePost';
import axios from "axios";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { format, isValid, parseISO } from 'date-fns';

import CensoredModal from '~/components/Modal/CensoredModal';
import {
    apiUrl,
    ACCESS_TOKEN,
} from "../../../constants/constants.js"


const cx = classNames.bind(styles)

function ArticleManagement() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [showDeletePostModal, setShowDeletePostModal] = useState(false);
    const [showCensoredModal, setShowCensoredModal] = useState(false);
    const [totalPost, setTotalPost] = useState(0);
    const [listPost, setListPost] = useState([]);
    const [postId, setPostId] = useState(null);
    const [report, setReport] = useState([])
    const [reportCensored, setReportToCensored] = useState(null)
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
            field: 'title',
            headerName: 'Title',
            width: 340,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            renderCell: (params) => (
                <p className={cx('mt-2')}>
                    {params.row.user[0].name}
                </p>
            ),
        },
        {
            field: 'timeUpload',
            headerName: 'Date',
            width: 180,
            renderCell: (params) => {
                const dobDate = parseISO(params.row.timeUpload); // Chuyển đổi ngày tháng thành kiểu Date
                const isDateValid = isValid(dobDate);

                // Nếu ngày tháng hợp lệ, hiển thị theo định dạng 'dd/MM/yyyy'
                const formattedDate = isDateValid ? format(dobDate, 'dd/MM/yyyy') : params.row.timeUpload;

                return <div>{formattedDate}</div>;
            },
        },
        {
            field: 'gender',
            headerName: 'Reject',
            width: 100,
            renderCell: (params) => (
                <div className={cx('mt-3')}>
                    <button onClick={() => handleDeleteIconClick(params.row._id)}>
                        <i className={cx("bi bi-trash d-inline-block")}></i>
                    </button>
                </div>
            ),
        }

    ];
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getArticlesInformation`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const report = await axios.get(`${apiUrl}/report/getArticleReport`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                console.log(response.data,report.data)
                if (response.data.success) {
                    const articles = response.data.articles.map((article, index) => ({
                        ...article,
                        id: index, // Thêm id duy nhất bắt đầu từ 0
                    }));
                    setTotalPost(articles.length);
                    setListPost(articles);
                }
                if (report.data.success)
                    setReport(report.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])

    const handleCensored = (rp) =>{
        setReportToCensored(rp)
        setShowCensoredModal(true)
    }
    const handleDeleteIconClick = (_id) => {
        setPostId(_id);
        setShowDeletePostModal(true);
    };
    return (
        <div className={cx('container_fluid')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Article management</h4>
                    </div>
                </div>
            </div>

            {/* Quản lý bài đăng */}
            <div className={cx('row')}>
                <Box
                    sx={{
                        height: 415,
                        width: '100%',
                        fontSize: 20,
                        border: 'none'
                    }}>
                    <DataGrid
                        rows={listPost}
                        columns={columns}
                        getRowId={(row) => row._id}
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
                        //các chức năng liên quan đến bộ lọc cột, bộ chọn cột và bộ chọn mật độ tương ứng
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector

                        slots={{ toolbar: GridToolbar }}//chỉ định vị trí thanh công cụ bằng thành phần GridToolbar
                        slotProps={{//Cung cấp cấu hình cho thanh công cụ.
                            toolbar: {
                                // components: {
                                //   Toolbar: GridToolbarExport, // export
                                // },
                                showQuickFilter: true,
                                style: { padding: '8px' },
                            },
                        }}
                    />
                </Box>
            </div>

            {/* Quản lý bài bị báo cáo  */}
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Reported articles are reported</h4>
                        <p></p>
                    </div>
                </div>
                <div className={cx('border-table')}>
                    <Table hover responsive>
                        <thead>
                            <tr className={cx('header')}>
                                <th scope='col'>Annunciator</th>
                                {/* <th scope='col'>Report content</th> */}
                                <th scope='col'>Article</th>
                                <th scope='col'>Author</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {report && report.map((report) => (
                                report.userPost.length > 0 && report.article.length > 0 && (
                                    <tr className={cx("hover-actions-trigger")}>
                                        <td>
                                            <div className='d-flex align-items-center mt-1'>
                                                <img
                                                    src={report.userReport[0].avatar}
                                                    alt=''
                                                    style={{ width: '45px', height: '45px' }}
                                                    className="rounded-circle"
                                                />
                                                <div className='ms-3'>
                                                    <p className='mb-2'>{report.userReport[0].name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td>
                                        <p className={cx('mt-2')}>Tôi thấy bài viết này có một số nọi dung không đúng như các nguyên liệu chưa đc xác thực rõ ràng là có ảnh hưởng đến người mắc bệnh tiểu đường hay không. </p>
                                    </td> */}
                                        <td>
                                            <p className={cx('mt-2')}>{report.article[0].title}</p>
                                        </td>
                                        <td>
                                            <p className={cx('mt-2')}>{report.userPost[0].name}</p>
                                        </td>
                                        <td onClick={() => handleCensored(report)} >
                                            <div className={cx('status', 'badge-soft-warning', 'mt-3')}>
                                                <span className="fw-400">Censored</span>
                                                <span className="ms-1 fas fa-check"></span>
                                            </div>
                                        </td>
                                    </tr>
                                )

                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>

            {showCensoredModal && < CensoredModal
                report={reportCensored}
                setReport={setReport}
                listreport={report}
                setShowCensoredModal={setShowCensoredModal} />}

            {showDeletePostModal && <DeletePost
                setShowDeletePostModal={setShowDeletePostModal}
                postId={postId}
                setTotalPost={setTotalPost}
                setListPost={setListPost}
                listPost={listPost}
            />}
        </div>
    )
}
export default ArticleManagement