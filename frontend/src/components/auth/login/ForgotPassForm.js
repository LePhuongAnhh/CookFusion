import styles from './LoginForm.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import images from '~/assets/images'
const cx = classNames.bind(styles)

const ForgotPassForm = () => {
    return (
        <>
            <div className={cx('login_background')}>
                <div className={cx('overlay')}>
                    <div className={cx('forgotpass_box')}>
                        <h2>Forgot Password</h2>
                        <p>
                            Enter the email address you used to register, and we will send you an email to recover your password in no time.
                        </p>
                        <form>
                            <div className={cx('user_box')}>
                                <input
                                    className={cx('input_field')}
                                    type="text"
                                    name="Full Name "
                                    required
                                />
                                <label for="text">Email</label>
                            </div>
                            <div className={cx('login_btn')}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Conform
                            </div>
                            <div className={cx('lb_forgot_password')}>
                                <label> Back to </label>
                                <Link to='/login'> &nbsp;  Sign in </Link>
                                <p> &nbsp; or</p>
                                <Link to='/register'> &nbsp;  Create an account </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassForm