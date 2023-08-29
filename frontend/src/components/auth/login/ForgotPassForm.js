import style from './LoginForm.module.css'
import { Link } from 'react-router-dom'

const ForgotPassForm = () => {
    return (
        <>
            <div className={style.login_background}>
                <div className={style.overlay}>
                    <div className={style.forgotpass_box}>
                        <h2>Forgot Password</h2>
                        <p>
                            Enter the email address you used to register, and we will send you an email to recover your password in no time.
                        </p>
                        <form>
                            <div className={style.user_box}>
                                <input
                                    className={style.input_field}
                                    type="text"
                                    name="Full Name "
                                    required
                                />
                                <label for="text">Email</label>
                            </div>
                            <div className={style.login_btn}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Conform
                            </div>
                            <div className={style.lb_forgot_password}>
                                <label> Back to </label>
                                <Link to='/'> &nbsp;  Sign in </Link> 
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