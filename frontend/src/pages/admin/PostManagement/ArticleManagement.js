import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Table from 'react-bootstrap/Table';
import styles from "../AccountManagement/AccountManagement.module.scss"
import DeletePost from '~/components/Modal/DeletePost';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from "axios"
import CensoredModal from '~/components/Modal/CensoredModal';
import {
    apiUrl,
    ACCESS_TOKEN,
    ACCOUNT_ID,
    ROLE,
    PROFILE_INFORMATION,
    USERNAME
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
                console.log(response.data)
                if (response.data.success) {
                    setTotalPost(response.data.articles.length)
                    setListPost(response.data.articles)
                }
                if (report.data.success) setReport(report.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
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
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Total Article: {totalPost}</h4>
                        <p></p>
                    </div>
                </div>
                <div className={cx('border-table')}>
                    <Table hover responsive>
                        <thead>
                            <tr className={cx('header')}>
                                <th scope='col'>Title</th>
                                <th scope='col'>Author</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPost && listPost.map((article) => (
                                <tr className={cx("hover-actions-trigger")}>
                                    <td>
                                        <div className='d-flex align-items-center mt-1'>
                                            {/* <img
                                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                            alt=''
                                            style={{ width: '50px', height: '50px' }}
                                            className="rounded-2"
                                        /> */}
                                            <div className='ms-3'>
                                                <p className='fw-700 mb-0'>{article.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {/* <div className='ms-3'> */}
                                        <p className={cx('mt-2')}>{article.user[0].name}</p>
                                        {/* </div> */}

                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>{article.timeUpload}</p>
                                    </td>
                                    <td >
                                        <div className={cx('mt-3')}>
                                            <button onClick={() => handleDeleteIconClick(article._id)}>
                                                <i className={cx("bi bi-trash d-inline-block")}></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
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
                                        <td onClick={() => setShowCensoredModal(true)} >
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