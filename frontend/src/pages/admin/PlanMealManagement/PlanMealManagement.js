import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../AccountManagement/AccountManagement.module.scss"
import classNames from 'classnames/bind'
import DeletePlan from '~/components/Modal/DeletePlan';
import images from '~/assets/images'

import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { apiUrl, ACCESS_TOKEN, } from '~/constants/constants';

// const cx = classNames.bind(styles)

const cx = classNames.bind(styles)
function PlanMealManagement() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [showDeletePlanModal, setShowDeletePlanModal] = useState(false);

    const handleDeleteIconClick = () => {
        setShowDeletePlanModal(true);
    };
    const columns = [
        // { field: 'id', headerName: 'No.', width: 50 },
        {
            field: 'No.',
            headerName: 'No.',
            width: 70,
            renderCell: (params) => {
                return <div>{params.row.id + 1}</div>; // Adjust to begin numbering from 1
            },
        },
        {
            field: 'account',
            headerName: 'Account',
            width: 200,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 300,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 200,
        },
        {
            field: 'days',
            headerName: 'Days',
            width: 120,
        },
        {
            field: 'public',
            headerName: 'Public',
            width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <div className={cx('mt-3')}>
                    <button onClick={() => handleDeleteIconClick(params.id)}>
                        <i className={cx("bi bi-trash d-inline-block")}></i>
                    </button>
                </div>
            ),
        }
    ];

    const rows = [
        { id: 1, account: 'le thu', name: 'Snow@gmail.com', category: '0936947367', days: "23/10/2002", public: 'Male' }
    ];
    const [list, setList] = useState(rows)
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${apiUrl}/mealplan/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if (res.data.success) {
                    console.log(res.data.data)
                    let resList = []
                    res.data.data.map((mealplan, index) => {
                        const data = {
                            account: mealplan.user[0].name,
                            id: index,
                            name: mealplan.name,
                            category: mealplan.category[0],
                            days: mealplan.days.length,
                            public: mealplan.public
                        }
                        resList.push(data)
                    })
                    if (resList.length > 0) setList(resList)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <div className={cx('container-table')}>
            <div className={cx('row-table')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Total: {list.length}</h4>
                        <p></p>
                    </div>
                </div>
                <div className={cx('border-table')}>
                    <Box
                        sx={{
                            height: 440,
                            width: '100%',
                            fontSize: 20,
                            // border: '2px solid rgba(58, 53, 65, 0.1)'
                        }}>
                        <DataGrid
                            rows={list}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 6,
                                    },
                                },
                            }}
                            sx={{
                                fontSize: '16'
                            }}
                            pageSizeOptions={[6]}
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            slots={{ toolbar: GridToolbar }}//chỉ định vị trí thanh công cụ bằng thành phần GridToolbar
                            slotProps={{//Cung cấp cấu hình cho thanh công cụ.
                                toolbar: {
                                    // components: {
                                    //   Toolbar: GridToolbarExport, // export
                                    // },
                                    showQuickFilter: true,
                                    // style: { backgroundColor: 'lightgray', padding: '8px' },
                                },
                            }}

                        />
                    </Box>
                </div>
            </div>
            {showDeletePlanModal && <DeletePlan
                setShowDeletePlanModal={setShowDeletePlanModal}
            />}
        </div>
    );
}

export default PlanMealManagement;