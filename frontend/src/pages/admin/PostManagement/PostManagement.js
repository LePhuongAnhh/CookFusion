import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind'
import styles from "../AccountManagement/AccountManagement.module.scss"
import Table from 'react-bootstrap/Table';

const cx = classNames.bind(styles)
function PostManagement() {
    return (
        <div className={cx('container-table')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Post: 234</h4>
                        <p></p>
                    </div>
                </div>
                <div className={cx('border-table')}>
                    <Table hover responsive>
                        <thead>
                            <tr className={cx('header')}>
                                <th scope="col">Post</th>
                                <th scope="col">Author</th>
                                <th scope="col">Type</th>
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
                                            className="rounded-2"
                                        />
                                        <div className='ms-3'>
                                            <p className='mb-2'>Cá kho tộ</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {/* <div className='ms-3'> */}
                                    <p className='mt-2'>Le Minh Anh</p>
                                    {/* </div> */}

                                </td>
                                <td>
                                    <p className='mt-2'>Recipe</p>
                                </td>
                            </tr>
                            <tr className={cx("hover-actions-trigger")}>
                                <td>
                                    <div className='d-flex align-items-center mt-1'>
                                        <img
                                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className="rounded-2"
                                        />
                                        <div className='ms-3'>
                                            <p className='mb-2'>Các nhà hàng môit tiếng ở miền Bắc</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='mt-2'>Lê Phương Linh</p>
                                </td>
                                <td>
                                    <p className='mt-2'>Article</p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            {/* {showDeleteAccountModal && <DeleteAccount setShowDeleteAccountModal={setShowDeleteAccountModal} />} */}
        </div>
    );
}

export default PostManagement;