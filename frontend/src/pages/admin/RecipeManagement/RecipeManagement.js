import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "../../admin/ProfileAdmin/ProfileAdmin.module.scss"
import classNames from 'classnames/bind'
// import HeaderAdmin from '../../../components/Layout/DefaulLayout/Header/HeaderAdmin';
import { render } from '@testing-library/react';
import images from '~/assets/images'

const cx = classNames.bind(styles)

function RecipeManagement() {
    const columns = [
        {
            accessor: 'name',
            Header: 'Name'
        },
        {
            accessor: 'email',
            Header: 'Email',
            Cell: rowData => {
                const { email } = rowData.row.original
                return (
                    <a href={'mailto:' + email}>
                        {email}
                    </a>
                )
            }
        },
        {
            accessor: 'age',
            Header: 'Age',
            cellProps: {
                className: 'fw-medium'
            }
        }
    ];

    const data = [
        {
            name: 'Anna',
            email: 'anna@example.com',
            age: 18
        },
        {
            name: 'Homer',
            email: 'homer@example.com',
            age: 35
        },
        {
            name: 'Oscar',
            email: 'oscar@example.com',
            age: 52
        },
        {
            name: 'Emily',
            email: 'emily@example.com',
            age: 30
        },
        {
            name: 'Jara',
            email: 'jara@example.com',
            age: 25
        }
    ];

    return (
        <div className={cx('container_fluid')}>
            <div className={cx('row')}>
                <div className={cx('col_12')}>
                    <div className={cx('page_title_box')}>
                        <h4 className={cx('page_title')}>Article management</h4>
                    </div>
                </div>
            </div>
            {/* <div className={cx('row')}>
                            <AdvanceTableWrapper
                                columns={columns}
                                data={data}
                                sortable
                                pagination
                                perPage={5}
                                selection
                                selectionColumnWidth={30}
                            >
                                <BulAction table />
                                <AdvanceTable
                                    table
                                    headerClassName="bg-200 text-900 text-nowrap align-middle"
                                    rowClassName="align-middle white-space-nowrap"
                                    tableProps={{
                                        striped: true,
                                        className: 'fs--1 mb-0 overflow-hidden'
                                    }}
                                />
                            </AdvanceTableWrapper>
                        </div> */}

        </div>
    )
}
// render{ <AdvanceTableExample /> }
export default RecipeManagement