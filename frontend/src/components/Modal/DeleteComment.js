import styles from './DeleteBlog.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'

import { ACCESS_TOKEN, apiUrl } from '~/constants/constants'
const cx = classNames.bind(styles)
function DeleteComment({ setShowDeletePostModal }) {
    return (
        <div className={cx('modalDeleteIdea')}>
            < div className={cx('modalContentDeleteIdea')}>
                <div className={cx('header-delete')}>
                    <h2 className={cx('containerDelete')}>Delete</h2>
                    <div onClick={() => setShowDeletePostModal(false)} className={cx('icon-exit')}>
                        <i class="bi bi-x"></i>
                    </div>
                </div>
                <hr className={cx('line')} />
                <div className={cx('body-delete')}>
                    < p>Are you sure you want to delete your comment? </p>
                    {/* <p>This action cannot be undone.</p> */}
                </div>
                <div className={cx('footer-delete')}>
                    < button onClick={handleDeletePost} className={cx('btn_delete')} >Delete</button>
                    < button className={cx('btn_cancle')} onClick={() => setShowDeletePostModal(false)}>Cancel</button>
                </div>
            </div >
        </div >
    );
}

export default DeleteComment;