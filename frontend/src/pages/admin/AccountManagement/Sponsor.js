
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "./AccountManagement.module.scss"
import classNames from 'classnames/bind'
import images from '~/assets/images'
import DeleteAccount from '~/components/Modal/DeleteAccount';

// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
// import { useDemoData } from '@mui/x-data-grid-generator';
const rows = [
    {
        id: 1,
        path: ['Account1', 'lần 1'],
        Type: 'Community',
        Renewal: false,
        Expiration: true,
        Price: '$24'
    },
    {
        id: 2,
        path: ['Account1', 'Lần 2'],
        Type: 'Community',
        Renewal: false,
        Expiration: true,
        Price: '$24'
    },
    {
        id: 3,
        path: ['Account1', 'Lần 3'],
        Type: 'Pro',
        Renewal: true,
        Expiration: true,
        Price: '$54'
    },
    {
        id: 4,
        path: ['Account1', 'Lần 4'],
        Type: 'Pro',
        Renewal: true,
        Expiration: true,
        Price: '$54'
    },
    {
        id: 5,
        path: ['Account1', 'Lần 5'],
        Type: 'Pro',
        Renewal: true,
        Expiration: true,
        Price: '$54'
    },
    {
        id: 6,
        path: ['Account2', 'Lần 1'],
        Type: 'Community',
        Renewal: true,
        Expiration: true,
        Price: '$24'
    },
    {
        id: 7,
        path: ['Account2', 'Lần 2'],
        Type: 'Community',
        Renewal: true,
        Expiration: true,
        Price: '$24'
    },
]
const columns = [
    {
        field: 'Type',
        Type: 'singleSelect',
        valueOptions: ['Community', 'Pro', 'Premium'],
    },
    {
        field: 'Renewal',
        // Type: 'boolean',
    },
    {
        field: 'Expiration',
        // type: 'date'
    },
    {
        field: 'Price',
        Type: 'singleSelect',
        valueOptions: ['$24', '$54', '$30'],
    }
];

const groupingColDef = {
    headerName: 'Account',
};

const exceljsPreProcess = ({ workbook, worksheet }) => {
    // Set document meta data
    workbook.creator = 'MUI-X team';
    workbook.created = new Date();

    // Customize default excel properties
    worksheet.properties.defaultRowHeight = 30;

    // Create a custom file header
    worksheet.mergeCells('A1:C2');
    worksheet.getCell('A1').value =
        'This is an helping document for the MUI-X team.\nPlease refer to the doc for up to date data.';

    worksheet.getCell('A1').border = {
        bottom: { style: 'medium', color: { argb: 'FF007FFF' } },
    };

    worksheet.getCell('A1').font = {
        name: 'Arial Black',
        size: 14,
    };
    worksheet.getCell('A1').alignment = {
        vertical: 'top',
        horizontal: 'center',
        wrapText: true,
    };
    worksheet.addRow([]);
};
const exceljsPostProcess = ({ worksheet }) => {
    // add a text after the data
    worksheet.addRow({}); // Add empty row

    worksheet.addRow(['Those data are for internal use only']);
};

const excelOptions = { exceljsPreProcess, exceljsPostProcess };


const cx = classNames.bind(styles)
function Sponsor() {
    
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
                            <DataGridPremium
                                treeData
                                getTreeDataPath={(row) => row.path}
                                rows={rows}
                                columns={columns}
                                groupingColDef={groupingColDef}
                                defaultGroupingExpansionDepth={-1}
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{ toolbar: { excelOptions } }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* {showDeleteAccountModal && <DeleteAccount setShowDeleteAccountModal={setShowDeleteAccountModal} />} */}
        </div >
    );
}

export default Sponsor;