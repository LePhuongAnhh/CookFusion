
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "./AccountManagement.module.scss"
import classNames from 'classnames/bind'
// import DeleteAccount from '~/components/Modal/DeleteAccount';


import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
const columns = [
  { field: 'id', headerName: 'No.', width: 50 },
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
    width: 200,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 140,
    editable: true,
  },
  {
    field: 'DoB',
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
    field: 'rating',
    headerName: 'Rating',
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
const cx = classNames.bind(styles)
function User() {

  return (
    <div className={cx('container_fluid')}>
      <div className={cx('row')}>
        <div className={cx('col_12')}>
          <div className={cx('page_title_box1')}>
            <h4 className={cx('page_title')}>Account: 234</h4>
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

export default User;