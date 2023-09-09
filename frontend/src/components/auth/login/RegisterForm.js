import style from './LoginForm.module.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoleModal from '~/components/user/modals/RoleModal';


const RegisterForm = () => {
    // const [isModalOpenChooSeRole, setIsModalOpenChooSeRole] = useState(false);

    // const openModalChooSeRole = () => {
    //     setIsModalOpenChooSeRole(true);
    // };

    // const closeModalChooSeRole = () => {
    //     setIsModalOpenChooSeRole(false);
    // };
    return (
        <>
            <div className={style.login_background}>
                <div className={style.overlay}>
                    <div className={style.register_box}>
                        <h2>Register</h2>
                        <form>
                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="text"
                                    name="name "
                                    required
                                />

                                <label for="text">Full Name *</label>
                            </div>

                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="text"
                                    name="username"
                                    required
                                />
                                <label>Username *</label>
                            </div>
                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="password"
                                    name="Password"
                                    required
                                />
                                <label>Password *</label>
                            </div>

                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="password"
                                    name="Confirm Password"
                                    required
                                />
                                <label>Confirm Password *</label>
                            </div>
                            <div className={style.term_condition}>
                                <label>
                                    <input
                                        type="checkbox"
                                    // checked={agree}
                                    // onChange={handleAgreeChange}
                                    />
                                    &nbsp; Agree to
                                    <Link to="#" className={style.term}>  </Link>
                                </label>
                            </div>
                            <div className={style.login_btn} >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Create
                            </div>
                            {/* <RoleModal /> */}
                            <div className={style.lb_register}>
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