
import images from '~/assets/images'
import React, { useState, useEffect } from "react"
import styles from './DetailCollection.module.scss'
import classNames from 'classnames/bind'
import { apiUrl, ACCESS_TOKEN, PROFILE_INFORMATION } from '~/constants/constants'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function DetailCollection() {
    const { id } = useParams();
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const Account_id = profileInformation._id

    const [collectionData, setCollectionData] = useState(null);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();
    //get one collection
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/collection/getbycollection/65639d1a03df8928ea72d44c`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("data one collection nay:", response.data.collections)
                setCollectionData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        console.log("Fetching data for id:", id);
        fetchData();
    }, [id]);
    return (
        <>
            <div className={cx('detail')}>
                <div className={cx('header-card', 'header_wrapper', 'list-item')}>
                    <div className={cx('action-delete')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                        <span>Delete collection</span>
                    </div>
                    <img className={cx('img-avatar')} src={images.header_planmeal} />
                </div>
                <div className={cx('collection-body')}>
                    <ul>
                        <li></li>

                        <li></li>

                        <li></li>

                        <li></li>
                    </ul>

                </div>
            </div>
        </>
    );
}

export default DetailCollection;