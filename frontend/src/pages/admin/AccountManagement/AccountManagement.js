import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from "./AccountManagement.module.scss"
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import DeleteAccount from '~/components/Modal/DeleteAccount';
import axios from "axios"
import {
    apiUrl,
    ACCESS_TOKEN,
    ACCOUNT_ID,
    ROLE,
    PROFILE_INFORMATION,
    USERNAME
} from "../../../constants/constants.js"
const cx = classNames.bind(styles)



function AccountManagement() {
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getAllAccount`);
                console.log(response.data)
                if (response.data.success) {
                    setTotal(response.data.listUsers.length)
                    setList(response.data.listUsers)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <div className={cx('container-table')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Account: {total}</h4>
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
                                <th scope="col">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length > 0 && list.map((item) => (
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
                                                <p className='mb-2'>{item.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {/* <div className='ms-3'> */}
                                        <p className='mt-2'>{item.email}</p>
                                        {/* </div> */}

                                    </td>
                                    <td>
                                        <p className='mt-2'>User</p>
                                    </td>
                                    <td >
                                        {/* <div className={cx('status', 'badge-soft-warning', 'mt-3')}>
                                        {/* <span className="fw-400">{item.active}</span>
                                         */}
                                        <div className={cx('status', 'badge-soft-success', 'mt-3')}>
                                            <span className="fw-400">Active</span>
                                            <span className="ms-1 fas fa-check"></span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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