import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import style from "./AccountManagement.module.css"
import HeaderAdmin from '../HeaderAdmin';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function AccountManagement() {
    const Actions = () => (
        <div className="end-0 top-50 pe-3 translate-middle-y hover-actions">
            <Button variant="light" size="sm" className="border-300 me-1 text-600">
                {/* <FontAwesomeIcon icon="edit" /> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg> */}
            </Button>
            <Button variant="light" size="sm" className="border-300 text-600">
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                </svg> */}
            </Button>
        </div>
    );
    return (
        <body>
            <div id="wrapper">
                <HeaderAdmin />
                <div className={style.content_page}>
                    <div className={style.container_fluid}>
                        <div className={style.row}>
                            <div className={style.col_12}>
                                <div className={style.page_title_box}>
                                    <h4 className={style.page_title}>Article management</h4>
                                </div>
                            </div>
                        </div>
                        <div className={style.row}>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover-actions-trigger">
                                        <td>Ricky Antony</td>
                                        <td>ricky@example.com</td>
                                        <td className="w-auto">
                                            <Actions />
                                        </td>
                                    </tr>
                                    <tr className="hover-actions-trigger">
                                        <td>Emma Watson</td>
                                        <td>emma@example.com</td>
                                        <td className="w-auto">
                                            <Actions />
                                        </td>
                                    </tr>
                                    <tr className="hover-actions-trigger">
                                        <td>Rowen Atkinson</td>
                                        <td>rown@example.com</td>
                                        <td className="w-auto">
                                            <Actions />
                                        </td>
                                    </tr>
                                    <tr className="hover-actions-trigger">
                                        <td>Antony Hopkins</td>
                                        <td>antony@example.com</td>
                                        <td className="w-auto">
                                            <Actions />
                                        </td>
                                    </tr>
                                    <tr className="hover-actions-trigger">
                                        <td>Jennifer Schramm</td>
                                        <td>jennifer@example.com</td>
                                        <td className="w-auto">
                                            <Actions />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
export default AccountManagement