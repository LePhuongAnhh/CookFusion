import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind'
import styles from "./AccountManagement.module.scss"
import { Button } from 'react-bootstrap';
import axios from "axios"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {
    apiUrl,
    ACCESS_TOKEN,
} from "../../../constants/constants.js"
import { Avatar } from '@mui/material';

const cx = classNames.bind(styles)
function AccountManagement() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getAllAccount`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data)
                if (response.data.success) {
                    const users = response.data.listUsers.map((user, index) => ({
                        ...user,
                        id: index + 1,
                    }));
                    setTotal(users.length);
                    setList(users);
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [setList])

    const columns = [
        {
            field: 'id',
            headerName: 'No.',
            width: 70,
        },
        {
            field: 'name',
            headerName: 'Username',
            width: 250,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={params.row.name} src={params.row.avatar} />
                        <span style={{ marginLeft: '10px' }}>{params.row.name}</span>
                    </div>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 200,
        },
        {
            field: 'active',
            headerName: 'Status',
            width: 110,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color={params.row.active ? 'primary' : 'secondary'}
                    onClick={() => onClickChangeActive(params.row.id - 1)}
                    sx={{
                        fontSize: '16px', // Điều chỉnh kích thước chữ ở đây
                        borderRadius: '8px', // Điều chỉnh độ cong của góc
                        textTransform: 'none', // Vô hiệu hóa việc viết hoa
                        '&.MuiButton-containedPrimary': {
                            backgroundColor: 'green', // Màu nền cho trạng thái Active
                        },
                        '&.MuiButton-containedSecondary': {
                            backgroundColor: 'red', // Màu nền cho trạng thái Inactive
                        },
                    }}
                >
                    {params.row.active ? 'Active' : 'Inactive'}
                </Button>
            ),
        },

    ];

    const onClickChangeActive = async (index) => {
        try {
            const updatedList = [...list];
            const res = await axios.patch(`${apiUrl}/admin/changeActiveState`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            },
                { active: list[index].active, _id: list[index]._id })
            console.log(res.data)
            if (res.data.success) {
                updatedList[index].active = !updatedList[index].active
                setList(updatedList)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={cx('container_fluid ')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>The website has a total of {total} accounts </h4>
                        <p></p>
                    </div>
                </div>
                <div className={cx('border-table')}>
                    <Box
                        sx={{
                            height: 413,
                            width: '100%',
                            border: 'none',
                            boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
                        }}
                    >
                        <DataGrid
                            rows={list}
                            columns={columns}
                            getRowId={(row) => row._id}
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

        </div >
    )
}
export default AccountManagement