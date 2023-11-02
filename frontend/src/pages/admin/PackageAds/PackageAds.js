
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../AccountManagement/AccountManagement.module.scss"
import classNames from 'classnames/bind'
// import DeleteAccount from '~/components/Modal/DeleteAccount';
import axios from "axios"
import {
    apiUrl,
    ACCESS_TOKEN,
    ACCOUNT_ID,
    ROLE,
    PROFILE_INFORMATION,
    USERNAME
} from "../../../constants/constants.js"

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
const columns = [
    { field: '_id', headerName: 'Id', width: 50 },
    {
        field: 'name',
        headerName: 'name',
        width: 110,
        editable: true,
    },
    {
        field: 'maxUser',
        headerName: 'Max User',
        type: 'number',
        width: 200,
        editable: true,
    },
    {
        field: 'ratingDes',
        headerName: 'Rating Description',
        width: 140,
        editable: true,
    },
    {
        field: 'minPercent',
        headerName: 'Min Percent',
        width: 100,
        editable: true,
    },
    {
        field: 'maxPercent',
        headerName: 'Max Percent',
        type: 'number',
        width: 90,
        editable: true,
    },
    {
        field: 'activePost',
        headerName: 'Active Post',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'banner',
        headerName: 'Banner',
        type: 'number',
        width: 130,
        editable: true,
    },
    {
        field: 'cost',
        headerName: 'Cost',
        width: 100,
        editable: true,
    },
    {
        field: 'dashboard',
        headerName: 'Dashboard',
        width: 100,
        editable: true,
    },

];
const cx = classNames.bind(styles)
function PackageAds() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getUsersInformation`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data)
                if (response.data.success) {
                    setTotal(response.data.listUsers.length)
                    setList(response.data.listUsers)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <div className={cx('container_fluid')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box1')}>
                        <h4 className={cx('page_title')}>Accounts</h4>
                    </div>
                </div>
            </div>
            <div className={cx('py-0 card-body', 'row')}>
                <div className={cx('tab-content')}>
                    <div className={cx('table-responsive')}>
                        <Box
                            sx={{
                                height: 440,
                                width: '100%',
                                fontSize: 20,
                                border: 'none'
                            }}>
                            <DataGrid
                                rows={list}
                                columns={columns}
                                getRowId={(row) => row._id}
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
                                // checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackageAds;