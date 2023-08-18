import style from './LoginForm.module.css'
import { Link } from 'react-router-dom'
import step1 from '../../../image/correct.png'
import step2 from "../../../image/number-2.png"
import step3 from "../../../image/number-3.png"
const ForgotPassForm3 = () => {
    return (
        <>
            <div className={style.login_background}>
                <div className={style.overlay}>
                    <div className={style.forgotpass_box}>
                        <h2>Forgot Password</h2>
                        <div className={style.inform}>
                            <div className={style.correct_inform}>
                                <img src={step1} />&nbsp;
                                <p> Account Information </p>
                                {/* <div className={style.step1}>Account Information</div> */}
                            </div>  
                            <div className={style.correct_inform}>
                                <img src={step2} />&nbsp;
                                <p> Confirm PIN code </p>
                            </div>
                            <div className={style.correct_inform}>
                                <img src={step3} />&nbsp;
                                <p>Reset the password </p>
                            </div>
                        </div>
                        <p className={style.inform_forgotpass3}>
                            Now, enter a new password for your account.
                        </p>
                        <form>
                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="pass"
                                    name="New Password "
                                    required
                                />
                                <label for="text">New Password</label>
                            </div>
                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="pass"
                                    name="ConfirmPassword "
                                    required
                                />
                                <label for="text">Confirm password</label>
                            </div>
                            <div className={style.login_btn}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Conform
                            </div>
                            <Link to='/forgotpassword2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </Link>
                            <div className={style.lb_register}>
                                <label> Back to </label>
                                <Link to='/'> &nbsp;  Sign in </Link>
                                <p> &nbsp; or</p>
                                <Link to='/register'> &nbsp;  Create an account </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ForgotPassForm3