import styles from './DeleteBlog.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants'
const cx = classNames.bind(styles)
function DeletePlan({ setShowDeletePlanModal }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return (
        <div className={cx('modalDeleteIdea')}>
            < div className={cx('modalContentDeleteIdea')}>
                <div className={cx('header-delete')}>
                    <h2 className={cx('containerDelete')}>Delete</h2>
                    <div onClick={() => setShowDeletePlanModal(false)} className={cx('icon-exit')}>
                        <i class="bi bi-x"></i>
                    </div>
                </div>
                <hr className={cx('line')} />
                <div className={cx('body-delete')}>
                    < p>Are you sure you want to delete your idea? </p>
                    {/* <p>This action cannot be undone.</p> */}
                </div>
                <div className={cx('footer-delete')}>
                    < button className={cx('btn_delete')} >Delete</button>
                    < button className={cx('btn_cancle')} onClick={() => setShowDeletePlanModal(false)}>Cancel</button>
                </div>
            </div >
        </div >
    );
}

export default DeletePlan;