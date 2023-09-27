import style from './DeleteBlog.module.css'

const DeleteBlog = ({ setShowDeleteModal }) => {

    return (
        <div className={style.modalDeleteIdea}>
            <div className={style.modalContentDeleteIdea}>
                <img src="https://cdn-icons-png.flaticon.com/128/9789/9789276.png" className={style.imgResponsive} alt="image" />
                <h2 className={style.containerDelete}>Delete Idea</h2>
                <p className={style.contextDeleteIdea}>Are you sure you want to delete your idea? This action cannot be undone.</p>
                <button className={style.btn_delete} >Delete</button>
                <button className={style.btn_cancle} onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteBlog