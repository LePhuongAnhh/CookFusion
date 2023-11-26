import React, { useState, useEffect } from "react"
import styles from './BlogForm.module.scss'
import classNames from 'classnames/bind'
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants"
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
import axios from "axios"
import images from "~/assets/images"

const cx = classNames.bind(styles)
const CensoredModal = ({ setShowCensoredModal, report, setReport, listreport }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    console.log('h:', report)

    const handleAccept = async (state) => {
        try {
            const response = await axios.patch(`${apiUrl}/report/censored`, {
                _id: report._id,
                pass: state,
                badwords: []
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.data.success) {
                const updateReport = [...listreport]
                setReport(updateReport.filter((rp) => { return rp._id != report._id }))
                setShowCensoredModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const timeUpload = report.article[0].timeUpload;
    const formattedTime = timeUpload ? format(parseISO(timeUpload), 'dd/MM/yyyy') : '';
    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <div className={cx('createIdea')}>
                            <p>{report.userPost[0].name}'s' Article</p>
                            <span> {formattedTime}</span>
                        </div>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowCensoredModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={cx('post_status')}>
                    <div className={cx('report-card')}>
                        <div className={cx('image-card')}>
                            {/* {report.files && report.files[0] && report.files[0].length > 0 && report.files[0].map((fileInfor, index) => {
                                        return <img key={index} src={fileInfor.url} alt={`Image ${index}`} className={cx('img_img')} />
                                    })
                                    } */}
                            <img className={cx('images')} src={images.article2} />
                        </div>
                        <div className={cx('content')}>
                            <div>
                                {report.article[0].content}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('action')}>
                    <div className={cx('action-accept')} onClick={() => handleAccept(false)}>
                        <button className={cx('btn-pass', " btn btn-info")}>Pass</button>
                    </div>
                    <div className={cx('action-accept')} onClick={() => handleAccept(true)}>
                        <button className={cx('btn-pass', 'btn btn-secondary')}>Accept</button>
                    </div>
                </div>
            </div >
        </div >


    )
}

export default CensoredModal