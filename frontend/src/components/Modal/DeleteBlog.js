import axios from 'axios'
import React, { useState, useEffect } from "react"
import styles from './DeleteBlog.module.scss'
import classNames from 'classnames/bind'
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants'

const cx = classNames.bind(styles)
const DeleteBlog = ({ setShowDeleteModal, itemId, itemType, setFilteredItems, filteredItems }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const handleDeleteItem = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/article/delete/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data) {
                console.log("Bài viết đã được xóa");
                const updatedArticles = filteredItems.filter(article => article._id !== itemId);
                setFilteredItems(updatedArticles);
                setShowDeleteModal(false); // Ẩn modal sau khi xóa thành công
            }
        } catch (error) {
            console.error("Lỗi xóa bài viết:", error);
        }
    };

    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div className={cx('header-delete')}>
                    <h2 className={cx('containerDelete')}>Delete</h2>
                    <div onClick={() => setShowDeleteModal(false)} className={cx('icon-exit')}>
                        <i className="bi bi-x"></i>
                    </div>
                </div>
                <hr className={cx('line')} />
                <div className={cx('body-delete')}>
                    <p>Are you sure you want to delete your idea?</p>
                </div>
                <div className={cx('footer-delete')}>
                    <button className={cx('btn_delete')} onClick={handleDeleteItem}>Delete</button>
                    <button className={cx('btn_cancle')} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}


export default DeleteBlog