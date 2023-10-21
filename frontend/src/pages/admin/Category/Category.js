import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../AccountManagement/AccountManagement.module.scss"
import classNames from 'classnames/bind'
import Table from 'react-bootstrap/Table';
import CreateCategory from '~/components/Modal/CreateCategory';
import UpdateCategory from '~/components/Modal/UpdateCategory';
import DeleteCategory from '~/components/Modal/DeleteCategory';

const cx = classNames.bind(styles)
function Category() {
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
    const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    return (
        <>
            <div className={cx('container_fluid')}>
                <div className={cx('row')}>
                    <div className={cx('col_12')}>
                        <div className={cx('page_title_box')}>
                            <h4 className={cx('page_title')}>Total: 234</h4>
                            <div onClick={() => setShowCreateCategoryModal(true)} className={cx('add-cate')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                                <span>Add category</span>
                            </div>

                        </div>
                    </div>
                    <div className={cx('border-table')}>
                        <Table hover responsive>
                            <thead>
                                <tr className={cx('header')}>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
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
                                        <p className={cx('mt-2')}>là loại thực phẩm được chế biến và thực hiện từ các nguồn thực phẩm không chứa thịt hoặc sản phẩm từ động vật</p>
                                    </td>
                                    <td >
                                        <p className={cx('mt-2')}>
                                            <i onClick={() => setShowUpdateCategoryModal(true)} className={cx("bi bi-pencil-square")} style={{ marginRight: "15px" }}></i>
                                            {/* <i onClick={() => setShowDeleteCategoryModal(true)} className={cx("bi bi-trash")}></i> */}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>

                {/* những người đóng góp vào category  */}
                <div className={cx('row')}>
                    <div className={cx('col_12')}>
                        <div className={cx('page_title_box')}>
                            <h4 className={cx('page_title')}>Contributor</h4>
                        </div>
                    </div>
                    <div className={cx('border-table')}>
                        <Table hover responsive>
                            <thead>
                                <tr className={cx('header')}>
                                    <th scope="col">Category</th>
                                    <th scope="col">Post</th>
                                    <th scope="col">Contributor</th>
                                    {/* <th scope="col"></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={cx("hover-actions-trigger")}>
                                    <td>
                                        <div className='d-flex align-items-center mt-1'>
                                            <p className={cx('mt-2')}>Vegetarian food</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>34</p>
                                    </td>
                                    <td>
                                        <div className={cx('c-flex')}>
                                            <div className={cx('flex-mod')}>
                                                <Link to='#'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                        className={cx("c-rounded-circle")}
                                                    />
                                                </Link>
                                                <Link to='#'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                        className={cx("c-rounded-circle")}
                                                    />
                                                </Link>
                                                <Link to='#'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                        className={cx("c-rounded-circle")}
                                                    />
                                                </Link>
                                                <Link to='#'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                        className={cx("c-rounded-circle")}
                                                    />
                                                </Link>
                                                <Link to='#'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                        className={cx("c-rounded-circle")}
                                                    />
                                                </Link>
                                                <Link to='#'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                        className={cx("c-rounded-circle")}
                                                    />
                                                </Link>
                                                <Link to='#'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                        className={cx("c-rounded-circle")}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div >
            {showCreateCategoryModal && < CreateCategory setShowCreateCategoryModal={setShowCreateCategoryModal} />}
            {showUpdateCategoryModal && < UpdateCategory setShowUpdateCategoryModal={setShowUpdateCategoryModal} />}
            {showDeleteCategoryModal && < DeleteCategory setShowDeleteCategoryModal={setShowDeleteCategoryModal} />}

        </>
    );
}

export default Category;