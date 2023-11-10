// ipmpot tu ngoai thu vin
import React, { useState, useEffect } from "react"

//import ben trong thu vienm
import images from '~/assets/images'
import styles from './ChatModal.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from "axios"
import { apiUrl, ACCOUNT_ID, ACCESS_TOKEN, PROFILE_INFORMATION } from "~/constants/constants";

const socket = io('http://localhost:9996/', { transports: ['websocket'] })

const cx = classNames.bind(styles)
function ChatModal({ setShowMessageModal, chat, receiver, setListMessage, handleShowMessageModal }) {
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const accountId = localStorage.getItem(ACCOUNT_ID);
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // const handleUnState = (state) => {
    //     setChangeArticle(state.Article_id)
    //     socket.emit('setheart', state)
    // }
    const [list, setList] = useState(chat.sort((a, b) => new Date(a.time) - new Date(b.time)))
    const [index, setIndex] = useState(1)
    const [sendMessage, setSendMessage] = useState("")
    const handleSendMessage = () => {
        if (sendMessage.trim() != "") {
            //send message
            const data = { sender_id: accountId, content: sendMessage, receiver_id: receiver._id }
            setSendMessage("")
            socket.emit('sendMessage', data)
        }
    }
    //update list at index layout
    const updateListInNav = () => {
        handleShowMessageModal(list[list.length - 1], true)
    }
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            if (accountId == message.data.sender_id || accountId == message.data.receiver_id) {
                //push new message
                setList((prevList) => [...prevList, message.data])
                // call useEffect at index layout
                setListMessage([])
            }
        })
        return () => {
            socket.off('receiveMessage')
        }
    }, [])
    return (
        <div className={cx('modalDeleteIdea')}>
            <div div className={cx('modalContentDeleteIdea')}>
                <div className={cx('cart-chat')}>
                    {/* header  */}
                    <div className={cx('header-chat')}>
                        <div className={cx('header-left')}>
                            <img src={receiver.avatar}
                                alt="avatar" className="rounded-circle" width="35" height='35' />
                            <span className={cx('name-account-header')}>
                                {receiver.name}
                            </span>
                        </div>
                        <div className={cx('header-right')} onClick={() => setShowMessageModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                    {/* //body  */}
                    <div className={cx('body-chat')}>
                        <div className={cx('body-card')}>
                            {list.length > 0 && list.map((message, index) => (
                                // message.time.substring(0,10) == new Date().toString().substring(0,10) && (
                                // <div className={cx("divider", "d-flex", "align-items-center", "mb-4")}>
                                //    <p className={cx("text-center", "mx-3", "mb-0")}>Today</p>
                                // </div> 
                                // )
                                (message.sender_id != accountId) ? (
                                    <div className={cx('d-flex', 'flex-row', 'justify-content-start', 'chat-box')}>
                                        {
                                            (index > 1 && message.sender_id == list[index - 1].sender_id) ?
                                                <div style={{ marginRight: "30px" }}></div> :
                                                <img src={receiver.avatar} className="rounded-circle" width="30" height='30' />
                                        }
                                        <div style={{ marginRight: "20px" }}>
                                            <p className={cx("content-chart", 'color')}>{message.content}</p>
                                            {
                                                (index == list.length - 1 || list[index + 1].sender_id !== message.sender_id) && (
                                                    <p className={cx("content-chart", "time-chat")}>{message.time.substring(0, 10)}</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                ) :
                                    <div className={cx("d-flex", "flex-row", "justify-content-end", "chat-box-right")}>
                                        <div style={{ marginLeft: "20px" }}>
                                            <p className={cx('content-chat-right', 'background')}>{message.content}</p>
                                            {
                                                (index == list.length - 1 || list[index + 1].sender_id !== message.sender_id) && (
                                                    <p className={cx('content-chat-right', 'time-chat-right')}>{message.time.substring(0, 10)}</p>
                                                )
                                            }
                                        </div>
                                        {
                                            (index > 1 && message.sender_id == list[index - 1].sender_id) ?
                                                <div style={{ marginLeft: "30px" }}></div> :
                                                <img src={profileInformation.avatar} className="rounded-circle" width="30" height='30' />
                                        }
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('footer-chat')}>
                        <img src={profileInformation.avatar} className="rounded-circle" width="35" height='35' />
                        <input type="text" className={cx("input-text")} value={sendMessage}
                            placeholder="Type message"
                            onChange={(e) => setSendMessage(e.target.value)}
                            onClick={() => updateListInNav()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }} />
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" onClick={() => handleSendMessage()}>
                            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" /></svg>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ChatModal;