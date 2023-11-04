import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../AccountManagement/AccountManagement.module.scss"
import classNames from 'classnames/bind'
import DeletePlan from '~/components/Modal/DeletePlan';
import images from '~/assets/images'

import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

// const cx = classNames.bind(styles)

const cx = classNames.bind(styles)
function PlanMealManagement() {
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
            width: 110,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 110,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 110,
            type: 'number',
            editable: true,
        },
        {
            field: 'DoB',
            headerName: 'Birthday',
            width: 120,
            editable: true,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 60,
            editable: true,
        },
        {
            field: 'article',
            headerName: 'Article',
            type: 'number',
            width: 90,
            editable: true,
        },
        {
            field: 'recipe',
            headerName: 'Recipe',
            type: 'number',
            width: 90,
            editable: true,
        },
        {
            field: 'planmeal',
            headerName: 'Plan meal',
            type: 'number',
            width: 90,
            editable: true,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            width: 110,
            width: 3.5,
            editable: true,
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
        { id: 1, account: 'le thu', email: 'Snow@gmail.com', phone: '0936947367', DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 2, account: 'le thu', email: 'Lannister@gmail.com', phone: '0936947367', DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 3, account: 'le thu', email: 'Lannister@gmail.com', phone: '0936947367', DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 4, account: 'le thu', email: 'Stark@gmail.com', phone: '0936947367', DoB: null, gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 5, account: 'le thu', email: 'Targaryen@gmail.com', phone: '0936947367', DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 6, account: 'le thu', email: 'Melisandre@gmail.com', phone: null, DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 7, account: 'le thu', email: 'Clifford@gmail.com', phone: '0936947367', DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 8, account: 'le thu', email: 'Frances@gmail.com', phone: '0936947367', DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
        { id: 9, account: 'le thu', email: 'Roxie@gmail.com', phone: '0936947367', DoB: "23/10/2002", gender: 'Male', article: '45', recipe: '63', planmeal: '21', rating: '4.2' },
    ];
    return (
        <div className={cx('container-table')}>
            <div className={cx('row-table')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Account: 234</h4>
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
                            rows={rows}
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