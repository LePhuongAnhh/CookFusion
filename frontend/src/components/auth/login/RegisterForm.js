import styles from './LoginForm.module.scss'
import classNames from 'classnames/bind'
import React, { useState } from 'react';
import images from '~/assets/images'
import { Link } from 'react-router-dom';
import RoleModal from '~/components/Modal/RoleModal';
const cx = classNames.bind(styles)

const RegisterForm = () => {

    return (
        <>
            <div className={cx('login_background')}>
                <div className={cx('overlay')}>
                    <div className={cx('register_box')}>
                        <h2>Register</h2>
                        <form>
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="text"
                                    name="name "
                                    required
                                />

                                <label for="text">Full Name *</label>
                            </div>

                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="text"
                                    name="username"
                                    required
                                />
                                <label>Username *</label>
                            </div>
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="password"
                                    name="Password"
                                    required
                                />
                                <label>Password *</label>
                            </div>

                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="password"
                                    name="Confirm Password"
                                    required
                                />
                                <label>Confirm Password *</label>
                            </div>
                            <div className={cx('term_condition')}>
                                <label>
                                    <input
                                        type="checkbox"
                                    // checked={agree}
                                    // onChange={handleAgreeChange}
                                    />
                                    &nbsp; Agree to
                                    <Link to="#" className={cx('term')}>  </Link>
                                </label>
                            </div>
                            <div className={cx('login_btn')} >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Create
                            </div>
                            {/* <RoleModal /> */}
                            <div className={cx('lb_register')}>
                                <label> Already register? </label>
                                <Link to='/'> &nbsp;  Sign in </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterForm