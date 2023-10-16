import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from "./PostManagement.module.scss"
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import images from '~/assets/images'

const cx = classNames.bind(styles)
function PostManagement() {
    const Actions = () => (
        <div className={cx("end-0 top-50 pe-3 translate-middle-y hover-actions mt-3 ")}>
            <Button variant="none" size="sm" className={cx("border-300")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 448 512">
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </svg>
            </Button>
        </div>
    );
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
                                <th scope="col">No.</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={cx("hover-actions-trigger")}>
                                <td></td>
                                <td>Ricky Antony</td>
                                <td>ricky@example.com</td>
                                <td>User</td>
                                <td className="w-auto">
                                    <Actions />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default PostManagement;