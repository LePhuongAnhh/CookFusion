import classNames from 'classnames/bind'
import styles from './ErrorPage.module.scss'
import images from '~/assets/images'
import { Link, useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
function ErrorPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Sử dụng navigate với giá trị -1 để quay lại trang trước đó
    };
    return (
        <>
            <img src={images.backgroundError} className={cx('login_background')} />
            <div className={cx('overlay')}>
                <div className={cx('login_box')}>
                    <div className={cx('text-404')}>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </div>
                    <h2 className={cx('text-wrong')}>Something went wrong!</h2>
                    <div className={cx('text-show')}>
                        <span className={cx('text-detail')}>We're sorry, the page you requested could not be found. Please go back to the homepage.</span>
                    </div>
                    <div className={cx('btn-back')}>
                        <div className={cx('text-back')}>
                            <Link to="/">
                                <span style={{ marginRight: '117px' }} className={cx('link-back', 'go-home')} >Go Back Homepage</span>
                            </Link>
                            <Link to="#" onClick={handleGoBack}>
                                <span className={cx('link-back', 'go-back')}>Back</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ErrorPage;