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
                    // setOriginalList(response.data.categories);
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])

    //search
    const [searchTermCategory, setSearchTermCategory] = useState(''); // State cho bảng Category
    const [searchTermContributor, setSearchTermContributor] = useState(''); // State cho bảng Contributor
    // Filter the list based on the search term for each table
    const filteredListCategory = list.filter(category =>
        category.name.toLowerCase().includes(searchTermCategory.toLowerCase())
    );
    const filteredListContributor = list.filter(category =>
        category.name.toLowerCase().includes(searchTermContributor.toLowerCase())
    );

    const [selectedCategory, setSelectedCategory] = useState(null);
    // Thay thế categoryData bằng selectedCategory khi mở modal chỉnh sửa

    const handleEditCategory = (category) => {
        console.log("Edit icon clicked", category); // Log to check if the function is triggered
        setSelectedCategory(category);
        setShowUpdateCategoryModal(true);
    };

    console.log("showUpdateCategoryModal value: ", showUpdateCategoryModal); // Log to check the state just before rendering the modal


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
                            <div className="input-group rounded" style={{ display: 'flex', float: 'right', marginTop: "-58px", width: "200px" }}>
                                <input
                                    style={{ fontSize: " 14px" }}
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    value={searchTermCategory}
                                    onChange={e => setSearchTermCategory(e.target.value)}
                                />
                                <span className={cx("input-group-text", "border-0")} id="search-addon" style={{ backgroundColor: "none" }}>
                                    <i className="bi bi-search-heart"></i>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className={cx('border-table')}>
                        <Table hover responsive style={{ height: '505px', overflowY: "auto" }} >
                            <thead>
                                <tr className={cx('header')}>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredListCategory && filteredListCategory.map((category, index) => (
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
                                                <i onClick={() => handleEditCategory(category)} className={cx("bi bi-pencil-square")} style={{ marginRight: "15px" }}></i>
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
                <div className={cx('row')} style={{ marginTop: "35px" }}>
                    <div className={cx('col_12')}>
                        <div className={cx('page_title_box')}>
                            <h4 className={cx('page_title')}>Contributor</h4>
                        </div>

                    </div>
                    <div className="input-group rounded" style={{ display: 'flex', float: 'right', marginTop: "-58px", width: "200px" }}>
                        <input
                            style={{ fontSize: " 14px" }}
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={searchTermContributor}
                            onChange={e => setSearchTermContributor(e.target.value)}
                        />
                        <span className={cx("input-group-text", "border-0")} id="search-addon" style={{ backgroundColor: "none" }}>
                            <i className="bi bi-search-heart"></i>
                        </span>
                    </div>
                    <div className={cx('border-table')}>
                        <Table hover responsive>
                            <thead>
                                <tr className={cx('header')}>
                                    <th scope="col">No.</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Post</th>
                                    <th scope="col">Contributor</th>
                                    {/* <th scope="col"></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredListContributor && filteredListContributor.map((category, index) => (
                                    <tr className={cx("hover-actions-trigger")}>
                                        <td className={cx('no-column')}>
                                            <div className='d-flex align-items-center mt-1'>
                                                <p className={cx('mt-2')}>{index + 1}</p>
                                            </div>
                                        </td>
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
                                                    {category.top.length > 0 && category.top.map((user) => (
                                                        <Link to='#'>
                                                            <img
                                                                src={user.avatar} title={user.count + " posts"}
                                                                className={cx("c-rounded-circle")}
                                                            />
                                                        </Link>
                                                    ))}
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
            {showUpdateCategoryModal && (
                <UpdateCategory
                    showUpdateCategoryModal={showUpdateCategoryModal}
                    setShowUpdateCategoryModal={setShowUpdateCategoryModal}
                    categoryData={selectedCategory}
                />
            )}
            {showDeleteCategoryModal && < DeleteCategory setShowDeleteCategoryModal={setShowDeleteCategoryModal} />}

        </>
    );
}

export default Category;