import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from "./PostManagement.module.scss"
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import images from '~/assets/images'

const cx = classNames.bind(styles)

function ArticleManagement() {

    return (
        <div className={cx('container_fluid')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Article management</h4>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Recipe</th>
                            <th scope='col'>Author</th>
                            <th scope='col'>Accept</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className="rounded-2"
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-700 mb-0'>Mặt trời ngủ trong mây</p>
                                        <p className='text-muted mb-0'>Món chay</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-0'>Link Chi</p>
                                <p className='text-muted mb-0'>10/16/2023</p>
                            </td>
                            <td>
                                <Form.Check
                                    type='switch'
                                    id='checkedSwitch'
                                    defaultChecked
                                />
                            </td>
                            <td>
                                <p className='mt-1' >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512">
                                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className="rounded-2"
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-0'>Rồng xanh vượt đại dương</p>
                                        <p className='text-muted mb-0'>Món chay</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-0'>Grack</p>
                                <p className='text-muted mb-0'>10/16/2023</p>
                            </td>
                            <td>
                                <Form.Check
                                    type='switch'
                                    id='checkedSwitch'
                                    defaultChecked
                                />
                            </td>
                            <td>
                                <p className='mt-1' >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512">
                                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className="rounded-2"
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-0'>Bạch băng dầm thủy </p>
                                        <p className='text-muted mb-0'>Nóm Việt</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-0'>Mark</p>
                                <p className='text-muted mb-0'>10/16/2023</p>
                            </td>
                            <td>
                                <Form.Check
                                    type='switch'
                                    id='checkedSwitch'
                                    defaultChecked
                                />
                            </td>
                            <td>
                                <p className='mt-1' >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512">
                                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                </p>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>

                <br />


            </div>

        </div>
    )
}
export default ArticleManagement