import style from './CreateBlog.module.css'

const CreateBlog = ({ setShowCreateBlogModal }) => {

    return (
        <div className={style.modalDeleteIdea}>
            <div className={style.modalContentDeleteIdea}>
                <div>
                    <div className={style.createIdeaHeader}>
                        <h1 className={style.createIdea}>John's Article</h1>
                        <div className={style.exit_cmt_modal} onClick={() => setShowCreateBlogModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog