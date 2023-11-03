
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "./AccountManagement.module.scss"
import classNames from 'classnames/bind'
import axios from "axios"
import {
  apiUrl,
  ACCESS_TOKEN,
  ACCOUNT_ID,
  ROLE,
  PROFILE_INFORMATION,
  USERNAME
} from "../../../constants/constants.js"

import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
const columns = [
  {
    field: 'No.',
    headerName: 'No.',
    width: 70,
    renderCell: (params) => {
      return <div>{params.row.id + 1}</div>; // Adjust to begin numbering from 1
    },
  },

  {
    field: 'name',
    headerName: 'Name',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 200,
    editable: true,
  },
  {
    field: 'dob',
    headerName: 'Birthday',
    width: 140,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 100,
    editable: true,
  },
  {
    field: 'articles',
    headerName: 'Article',
    type: 'number',
    width: 90,
    editable: true,
  },
  {
    field: 'recipes',
    headerName: 'Recipe',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'planmeal',
    headerName: 'Plan meal',
    type: 'number',
    width: 130,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    editable: true,
  },
];
const cx = classNames.bind(styles)
function User() {
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
          const users = response.data.listUsers.map((user, index) => ({
            ...user,
            id: index, // Add unique id starting from 0
          }));
          setTotal(users.length);
          setList(users);
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
            <h4 className={cx('page_title')}>Accounts: {total}</h4>
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
                // đặt kích thước trang ban đầu thành 6
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
                    style: { backgroundColor: 'lightgray', padding: '8px' },
                  },
                }}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;