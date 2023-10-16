
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import styles from "./AccountManagement.module.scss"
import classNames from 'classnames/bind'
import images from '~/assets/images'
import DeleteAccount from '~/components/Modal/DeleteAccount';

const cx = classNames.bind(styles)
function User() {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  return (
    <>
      <div className={cx('container_fluid')}>
        <div className={cx('row')}>
          <div className={cx('col_12')}>
            <div className={cx('page_title_box')}>
              <h4 className={cx('page_title')}>Manage user accounts</h4>
            </div>
          </div>
        </div>


        <div className={cx('py-0 card-body', 'row')}>
          <div className={cx('tab-content')}>
            <div className={cx('table-responsive')}>
              <table className={cx('table table-hover')}>
                <thead>
                  <tr className={cx('header')}>
                    <th className={cx('text-color')} scope='col'>Account</th>
                    <th className={cx('text-color')} scope='col' >Emali</th>
                    <th className={cx('text-color')} scope='col' >Phone</th>
                    <th className={cx('text-color')} scope='col'>Birthday</th>
                    <th className={cx('text-color')} scope='col'>Gender</th>
                    <th className={cx('text-color')} scope='col'>Article</th>
                    <th className={cx('text-color')} scope='col'>Recipe</th>
                    <th className={cx('text-color')} scope='col'>Plan Meal</th>
                    <th className={cx('text-color')} scope='col'>Rating</th>
                    <th className={cx('text-color')} scope='col'>Disable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cx('align-middle', 'hover-actions-trigger')}>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '25px' }}>
                      <div className='d-flex align-items-center'>
                        <div className='avatar avatar-1'>
                          <img
                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className={cx('rounded-circle')}
                          />
                        </div>
                        <div className='ms-2'>Nguyễn Qunag Linh </div>
                      </div>
                    </td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '35px' }}> linh.th@gmail.com</td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '35px' }}> 0987627371  </td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '40px' }}> 29/10/2002 </td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '45px' }}> Female  </td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '65px' }}> 333   </td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '65px' }}> 145   </td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '75px' }}>4257   </td>
                    <td className={cx('text-nowrap', 'text-color')} style={{ paddingRight: '65px' }}>9.0  </td>
                    <td className={cx('text-nowrap', 'text-color')}>
                      <div onClick={() => setShowDeleteAccountModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512">
                          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
      {showDeleteAccountModal && <DeleteAccount setShowDeleteAccountModal={setShowDeleteAccountModal} />}
    </>
  );
}

export default User;