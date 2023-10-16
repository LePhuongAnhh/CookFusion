import styles from './DeleteBlog.module.scss'
import classNames from 'classnames/bind'
import images from '~/assets/images'

const cx = classNames.bind(styles)
function DeleteAccount({ setShowDeleteAccountModal }) {
    return (
        <div className={cx('modalDeleteIdea')}>
            < div className={cx('modalContentDeleteIdea')}>
                < img src="https://cdn-icons-png.flaticon.com/128/9789/9789276.png" className={cx('imgResponsive')} alt="image" />
                < h2 className={cx('containerDelete')}>Delete Idea</h2>
                < p className={cx('contextDeleteIdea')}>Are you sure you want to delete your idea? This action cannot be undone.</p>
                < button className={cx('btn_delete')} >Delete</button>
                < button className={cx('btn_cancle')} onClick={() => setShowDeleteAccountModal(false)}>Cancel</button>
            </div >
        </div >
    );
}

export default DeleteAccount;