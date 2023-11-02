import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../AccountManagement/AccountManagement.module.scss"
import classNames from 'classnames/bind'
import Table from 'react-bootstrap/Table';
import CreateCategory from '~/components/Modal/CreateCategory';
import UpdateCategory from '~/components/Modal/UpdateCategory';
import DeleteCategory from '~/components/Modal/DeleteCategory';
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
function Category() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
    const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getAllCategory`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data)
                if (response.data.success) {
                    setTotal(response.data.categories.length)
                    setList(response.data.categories)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <>
            <div className={cx('container_fluid')}>
                <div className={cx('row')}>
                    <div className={cx('col_12')}>
                        <div className={cx('page_title_box')}>
                            <h4 className={cx('page_title')}>Total: {total}</h4>
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
                                {
                                    list && list.map((category, index) => (
                                        <tr className={cx("hover-actions-trigger")}>
                                            <td>
                                                <div className='d-flex align-items-center mt-1'>
                                                    <img
                                                        src={category.image}
                                                        style={{ width: '65px', height: '65px' }}
                                                        className="rounded-2"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <p className={cx('mt-2')}>{category.name}</p>
                                            </td>
                                            <td>
                                                <p className={cx('mt-2')}>{category.description}</p>
                                            </td>
                                            <td >
                                                <p className={cx('mt-2')}>
                                                    <i onClick={() => setShowUpdateCategoryModal(true)} className={cx("bi bi-pencil-square")} style={{ marginRight: "15px" }}></i>
                                                    {/* <i onClick={() => setShowDeleteCategoryModal(true)} className={cx("bi bi-trash")}></i> */}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                }

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
                                {
                                    list && list.map((category, index) => (
                                        <tr className={cx("hover-actions-trigger")}>
                                            <td>
                                                <div className='d-flex align-items-center mt-1'>
                                                    <p className={cx('mt-2')}>{category.name}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className={cx('mt-2')}>{category.recipes.length}</p>
                                            </td>
                                            <td>
                                                <div className={cx('c-flex')}>
                                                    <div className={cx('flex-mod')}>
                                                        {category.top.length > 0 && category.top.map((user)=>(
                                                            <Link to='#'>
                                                            <img
                                                                src={user.avatar} title= {user.count + " posts"}
                                                                className={cx("c-rounded-circle")}
                                                            />
                                                        </Link>
                                                        )) }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
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