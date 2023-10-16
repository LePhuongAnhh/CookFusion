import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../AccountManagement/AccountManagement.module.scss"
import classNames from 'classnames/bind'
import Table from 'react-bootstrap/Table';
import images from '~/assets/images'

const cx = classNames.bind(styles)
function Category() {
    return (
        <>
            <div className={cx('container-table')}>

                <div className={cx('row')}>

                    <div className={cx('col_12')}>
                        <div className={cx('page_title_box')}>
                            <h4 className={cx('page_title')}>Total: 234</h4>

                        </div>
                        <div className={cx('page_title_box')}>
                            <div className={cx('select-type')}>
                                <select className={cx("form-select", " form-select-sm", "mb-2", "select")} data-list-filter="data-list-filter">
                                    <option selected="" value="">Select type</option>
                                    <option value="Pending">Recipe</option>
                                    <option value="Blocked">Article</option>
                                </select>
                            </div>
                            <div className={cx('add-cate')}>
                                <div>
                                    add
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={cx('border-table')}>
                        <Table hover responsive>
                            <thead>
                                <tr className={cx('header')}>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={cx("hover-actions-trigger")}>
                                    <td>
                                        <div className='d-flex align-items-center mt-1'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                alt=''
                                                style={{ width: '65px', height: '65px' }}
                                                className="rounded-2"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>Vegetarian food</p>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>Recipe</p>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>là loại thực phẩm được chế biến và thực hiện từ các nguồn thực phẩm không chứa thịt hoặc sản phẩm từ động vật</p>
                                    </td>
                                    <td >
                                        <p className={cx('mt-2')}>
                                            <i className={cx("bi bi-pencil-square")} style={{ marginRight: "15px" }}></i>
                                            <i className={cx("bi bi-trash")}></i>
                                        </p>
                                    </td>
                                </tr>
                                <tr className={cx("hover-actions-trigger")}>
                                    <td>
                                        <div className='d-flex align-items-center mt-1'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                alt=''
                                                style={{ width: '65px', height: '65px' }}
                                                className="rounded-2"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>Fast Food</p>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>Recipe</p>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>Các món ăn nhanh bao gồm bánh hamburger, pizza, sandwich, giai đoạn và các món ăn chiên xù.
                                        </p>
                                    </td>
                                    <td >
                                        <p className={cx('mt-2 d-inline')}>
                                            <i className={cx("bi bi-pencil-square d-inline-block")} style={{ marginRight: "15px" }}></i>
                                            <i className={cx("bi bi-trash d-inline-block")}></i>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                {/* {showDeleteAccountModal && <DeleteAccount setShowDeleteAccountModal={setShowDeleteAccountModal} />} */}
            </div >
        </>
    );
}

export default Category;