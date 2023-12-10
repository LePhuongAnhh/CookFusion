import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../AccountManagement/AccountManagement.module.scss"
import classNames from 'classnames/bind'
import DeletePost from '~/components/Modal/DeletePost';
import Table from 'react-bootstrap/Table';
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

function RecipeManagement() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [showDeletePostModal, setShowDeletePostModal] = useState(false);
    const [totalPost, setTotalPost] = useState(0)
    const [listPost, setListPost] = useState([])
    const [postId, setPostId] = useState(null);
    const [report, setReport] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getRecipesInformation`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                const report = await axios.get(`${apiUrl}/report/getRecipeReport`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                console.log(response.data, report.data)
                if (response.data.success) {
                    setTotalPost(response.data.recipes.length)
                    setListPost(response.data.recipes)
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
                        <h4 className={cx('page_title')}>Total Recipe: {totalPost}</h4>
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
                            {listPost && listPost.map((recipe) => (
                                <tr className={cx("hover-actions-trigger")}>
                                    <td>
                                        <div className='d-flex align-items-center mt-1'>
                                            <img
                                                src={recipe.image}
                                                alt=''
                                                style={{ width: '50px', height: '50px' }}
                                                className="rounded-2"
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-700 mb-0'>{recipe.title}</p>
                                                <p className='text-muted mb-0'>{recipe.Category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>{recipe.user[0].name}</p>
                                    </td>
                                    <td>
                                        <p className={cx('mt-2')}>{recipe.timeUpload}</p>
                                    </td>
                                    <td >
                                        <div className={cx('mt-3')}>
                                            <button onClick={() => handleDeleteIconClick(recipe._id)}>
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
            {/* <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Reported recipes are reported</h4>
                        <p></p>
                    </div>
                </div>
                <div className={cx('border-table')}>
                    <Table hover responsive>
                        <thead>
                            <tr className={cx('header')}>
                                <th scope='col'>Annunciator</th>
                                <th scope='col'>Recipe</th>
                                <th scope='col'>Author</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.length > 0 && report.map((report) => (
                                report.userPost.length > 0 && report.recipe.length > 0 && (
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
                                        <td>
                                            <p className={cx('mt-2')}>{report.recipe[0].name}</p>
                                        </td>
                                        <td>
                                            <p className={cx('mt-2')}>{report.userPost[0].name}</p>
                                        </td>
                                        <td >
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
            </div> */}
            {showDeletePostModal && <DeletePost
                setShowDeletePostModal={setShowDeletePostModal}
                postId={postId}
                setTotalPost={setTotalPost}
                setListPost={setListPost}
                listPost={listPost}
                isRecipe={1}
            />}
        </div>
    )
}
export default RecipeManagement