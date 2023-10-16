import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from "./AccountManagement.module.scss"
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import images from '~/assets/images'
import DeleteAccount from '~/components/Modal/DeleteAccount';
const cx = classNames.bind(styles)


function AccountManagement() {
    // const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    return (
        <div className={cx('container-table')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Account: 234</h4>
                        <p></p>
                    </div>
                </div>
                <div className={cx('border-table')}>
                    <Table hover responsive>
                        <thead>
                            <tr className={cx('header')}>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                {/* <th scope="col">Rating</th> */}
                                <th scope="col">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={cx("hover-actions-trigger")}>
                                <td>
                                    <div className='d-flex align-items-center mt-1'>
                                        <img
                                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className="rounded-circle"
                                        />
                                        <div className='ms-3'>
                                            <p className='mb-2'>Lee mark</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {/* <div className='ms-3'> */}
                                    <p className='mt-2'>Hand.dh@gmail.com</p>
                                    {/* </div> */}

                                </td>
                                <td>
                                    <p className='mt-2'>Sponsor</p>
                                </td>
                                <td >
                                    <div className={cx('status', 'badge-soft-warning', 'mt-3')}>
                                        <span className="fw-400">Inactive</span>
                                        <span className="ms-1 fas fa-check"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr className={cx("hover-actions-trigger")}>
                                <td>
                                    <div className='d-flex align-items-center mt-1'>
                                        <img
                                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className="rounded-circle"
                                        />
                                        <div className='ms-3'>
                                            <p className='mb-2'>Hana Lee</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='mt-2'>May@gmail.com</p>
                                </td>
                                <td>
                                    <p className='mt-2'>User</p>
                                </td>
                                <td >
                                    <div className={cx('status', 'badge-soft-success', 'mt-3')}>
                                        <span className="fw-400">Active</span>
                                        <span className="ms-1 fas fa-check"></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            {/* {showDeleteAccountModal && <DeleteAccount setShowDeleteAccountModal={setShowDeleteAccountModal} />} */}
        </div>
    )
}
export default AccountManagement