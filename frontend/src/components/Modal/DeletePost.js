import styles from './DeleteBlog.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants'
const cx = classNames.bind(styles)
function DeletePost({ setShowDeletePostModal, postId, setListPost, setTotalPost, listPost, isRecipe }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const handleDeletePost = async () => {
        try {
            const api = (isRecipe) ? "deleteRecipe" : "deleteArticle"
            const response = await axios.delete(`${apiUrl}/admin/${api}/${postId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data) {
                console.log("Bài viết đã được xóa");
                const updatedPosts = listPost.filter(article => article._id !== postId);
                setTotalPost(updatedPosts.length)
                setListPost(updatedPosts);
                setShowDeletePostModal(false);
            }
        } catch (error) {
            console.error("Lỗi xóa bài viết:", error);
        }
    };
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
                    < p>Are you sure you want to delete your idea? </p>
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

export default DeletePost;