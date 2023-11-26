
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "./AccountManagement.module.scss"
import classNames from 'classnames/bind'
import axios from "axios"
import { format, isValid, parseISO } from 'date-fns';
import {
    apiUrl,
    ACCESS_TOKEN,
} from "~/constants/constants"


// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
const row = [
    {
        id: 1,
        path: ['Account1', 'lần 1'],
        Type: 'Community',
        Renewal: false,
        Expiration: true,
        Price: '$24'
    },
]
const columns = [
    {
        headerName: 'No.',
        width: 70,
        renderCell: (params) => (
            <div>
                {params.row.id}
            </div>
        ),
    },
    {
        field: 'name',
        headerName: 'Account',
        width: 200,
    },
    {
        field: 'Package',
        width: 150,
    },
    {
        headerName: 'From',
        width: 200,
        field: 'from',
        renderCell: (params) => (
            <div>
                {isValid(parseISO(params.value)) ? format(parseISO(params.value), 'dd/MM/yyyy') : 'Invalid Date'}
            </div>
        ),
    },
    {
        headerName: 'To',
        width: 200,
        field: 'to',
        renderCell: (params) => (
            <div>
                {isValid(parseISO(params.value)) ? format(parseISO(params.value), 'dd/MM/yyyy') : 'Invalid Date'}
            </div>
        ),
    },
    {
        field: 'Price',
    }
];


const cx = classNames.bind(styles)
function Sponsor() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [rows, setRow] = useState(row)
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getSponsorList`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                console.log(response.data)
                if (response.data.success) {
                    let rowInput = []
                    let id = 1;
                    response.data.list.map((data) => {
                        let count = 1;
                        if (data.packages.length > 0) data.packages.map((pk) => {
                            const rowdata = {
                                id: id,
                                path: [data.name, count],
                                name: data.name,
                                Package: pk.package.name,
                                from: pk.from, to: pk.to,
                                Price: pk.cost.payment
                            }
                            rowInput[rowInput.length] = rowdata
                            id++
                            count++
                        })
                    })
                    console.log(rowInput)
                    setRow(rowInput)
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
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Manage sponsor accounts</h4>
                    </div>
                </div>
            </div>
            <div className={cx('py-0 card-body', 'row')}>
                <div className={cx('tab-content')}>
                    <div className={cx('table-responsive')}>
                        <div style={{ height: 500, width: '100%' }}>
                            <Box
                                sx={{
                                    height: 413,
                                    width: '100%',
                                    border: 'none',
                                    boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
                                }}
                            >
                                <DataGrid
                                    treeData
                                    getTreeDataPath={(row) => row.path}
                                    rows={rows}
                                    columns={columns}


                                    // đặt kích thước trang ban đầu thành 6
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    sx={{
                                        fontSize: '16',
                                        rowHeight: 100,
                                        border: 'none',
                                        boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
                                    }}
                                    //Xác định các tùy chọn có sẵn để chọn kích thước trang.
                                    pageSizeOptions={[6]}
                                    disableRowSelectionOnClick //Vô hiệu hóa lựa chọn hàng khi nhấp vào một hàng.
                                    //các chức năng liên quan đến bộ lọc cột, bộ chọn cột và bộ chọn mật độ tương ứng
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
                                            style: { padding: '8px' },
                                        },
                                    }}
                                />
                            </Box>

                        </div>
                    </div>
                </div>
            </div>
            {/* {showDeleteAccountModal && <DeleteAccount setShowDeleteAccountModal={setShowDeleteAccountModal} />} */}
        </div >
    );
}

export default Sponsor;