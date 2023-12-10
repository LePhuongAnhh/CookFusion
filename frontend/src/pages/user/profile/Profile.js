//import từ thư viện bên ngoài

import React, { useState, useEffect } from "react"
import { useNavigate, useNavigation, useParams, Link } from "react-router-dom"
import axios from "axios"
import { io } from 'socket.io-client'
import { format } from 'date-fns';



//import từ bên trong src
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN, ACCOUNT_ID } from "~/constants/constants"
import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import images from '~/assets/images'
import EditProfile from "./EditProfile"
import CreateBlog from "~/components/Modal/CreateBlog"
import UpdateBlog from "~/components/Modal/UpdateBlog"
import DeleteBlog from "~/components/Modal/DeleteBlog"
import CommentBlog from "~/components/Modal/CommentBlog"
import BlogForm from "~/components/Modal/BlogForm"
import RecipeForm from "../recipe/RecipeForm"
import ChatModal from "~/components/Modal/ChatModal"


const socket = io('http://localhost:9996/', { transports: ['websocket'] })
const sjcl = require('sjcl');
const cx = classNames.bind(styles)
function Profile() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const default_profile = JSON.parse(localStorage.getItem(PROFILE_INFORMATION))

    const { id } = useParams();
    const [profileInformation, setProfile] = useState((default_profile && default_profile._id == id) ? default_profile : [])

    const [isFollower, setIsFollower] = useState(false)
    const [followData, setFollowData] = useState({ following: 0, follower: 0 })
    useEffect(() => {
        (async () => {
            try {
                let [profile, follow] = await Promise.all([
                    axios.get(`${apiUrl}/user/getotherinformation/${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }),
                    axios.get(`${apiUrl}/user/getfollowInformation/${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }),
                ])
                setFollowData({ following: follow.data.following.length, follower: follow.data.followers.length })
                if (follow.data.followers.length > 0) {
                    follow.data.followers.map((follower) => {
                        if (follower.follower_id == accountId) setIsFollower(true)
                    })
                }
                setProfile(profile.data.account)
                setGetAge(profile.data.account)
            } catch (error) {
                console.log(error)
            }
        })()
        socket.on('follow', (follow) => {
            console.log(follow)
            if (id == follow.following_id) profileInformation.followers += 1
            else if (id == follow.follower_id) profileInformation.following += 1
            setIsFollower(true)
        })
        socket.on('unfollow', (follow) => {
            console.log(follow)
            if (id == follow.following_id) profileInformation.followers -= 1
            else if (id == follow.follower_id) profileInformation.following -= 1
            setIsFollower(false)
        })
        return () => {
            socket.off('unfollow')
            socket.off('follow')
        }
    }, [setProfile]
    )


    const navigate = useNavigate()
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt
    const [events, setEvents] = useState([])

    const Account_id = id
    const accountId = localStorage.getItem(ACCOUNT_ID);
    const [resultPlanData, setResultPlanData] = useState([]);
    const [showCollectionData, setShowCollectionData] = useState([]);
    const [isProfile, setIsProfile] = useState(false);
    const updateNewArticle = (data) => {
    }

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };
    const handleMouseLeave = () => {
        setDropdownOpen(false);
    }
    //Thêm một state để lưu trữ danh sách collection
    const [collections, setCollections] = useState([]);

    const [getAge, setGetAge] = useState({
        dob: '',
    });

    //CHUYEN CAC TAB
    const [activeTab, setActiveTab] = useState('article');
    const handleTabChange = (tabId) => {
        if (tabId == 'recipe') setIsProfile(true)
        setActiveTab(tabId);
    };

    //Add collection
    const [collectionData, setCollectionData] = useState({
        Account_id: Account_id,
        name: '',
    });
    const handleChangeCollection = (e) => {
        setCollectionData({
            ...collectionData,
            name: e.target.value,
        });
    }
    //chỉnh sửa gaio diện trong add collection
    const [isEditing, setIsEditing] = useState(false);
    const handleAddCollectionClick = () => {
        setIsEditing(true);
    };
    const handleCancelClick = () => {
        setIsEditing(false);
    };

    //HIỆN COLLECTION
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/collection/getcollection`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("tat ca Dữ liệu từ userCollections: ", response.data);
            const userCollections = response.data.collections.filter(collection => collection.Account_id === Account_id);
            setShowCollectionData(userCollections);
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [accessToken, Account_id]);

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                name: collectionData.name,
                Account_id: Account_id,
            };
            const response = await axios.post(
                `${apiUrl}/collection/addcollection`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data);
            setIsEditing(false);
            setCollectionData({
                name: '',
                Account_id: Account_id,
            });
            fetchData();
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    // Delete collection
    const handleDeleteCollection = async (_id, Account_id) => {
        try {
            console.log(_id)
            const response = await axios.delete(
                `${apiUrl}/collection/deletecollection`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: {
                        _id: _id,
                        Account_id: Account_id,
                    },
                }
            );
            if (response.data.success) {
                fetchData();
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    //SHOW CHAT
    const [showMessage, setShowMessage] = useState(false);
    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };
    const closeMessage = () => {
        setShowMessage(false);
    };

    //Logic
    const [chat, setChat] = useState([])
    const [otherUser, setOtherUSer] = useState([])
    const handleShowMessageModal = async (message, chating) => {
        try {
            if (!chating) setShowMessageModal(false)
            if (message.length == 0) {
                setOtherUSer(profileInformation)
            } else {
                const fetchListMessage = await axios.get(`${apiUrl}/message/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                const newlist = fetchListMessage.data.data.map((messag) => {
                    if (messag._id === message._id) {
                        return { ...messag, seen: true };
                    }
                    return messag;
                })
                setListMessage(newlist)
                setOtherUSer(profileInformation)
                const res = await axios.get(`${apiUrl}/message/getmessage/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if (res.data.success) {
                    setChat(res.data.data)
                }
            }

        }
        catch (error) {
            console.log(error)
        }
        setShowMessageModal(true)
    }
    //modal chart
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [listMessage, setListMessage] = useState([])
    const [listNotifications, setListNotifications] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const [message, notifications] = await Promise.all([
                    axios.get(`${apiUrl}/message/getall`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }),
                    axios.get(`${apiUrl}/user/notification`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                ])

                if (message.data.success && notifications.data.success) {
                    setListMessage(message.data.data)
                    setListNotifications(notifications.data.notifications.sort((a, b) => new Date(b.date) - new Date(a.date)))
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
        socket.on('notification', (notification) => {
            console.log(notification)
            if (accountId == notification.userId) {
                //push new notification
                setListNotifications((prevList) => [notification, ...prevList])
            }
        })
        return () => {
            socket.off('notification')
        }
    }, [setListMessage])


    //tinh tuoi
    useEffect(() => {
        // Tính tuổi từ ngày sinh
        const calculateAge = (dob) => {
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };

        // Cập nhật state với tuổi tính được
        setGetAge((prevInfo) => ({
            ...prevInfo,
            age: calculateAge(prevInfo.dob),
        }));
    }, [getAge.dob]);

    //recipe

    //PLAN MEAL
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id === accountId) {
                    const response = await axios.get(`${apiUrl}/mealplan/getonebyuser`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    setResultPlanData(response.data.data)
                }

            } catch (error) {
                console.error("Error fetching Meal Plans:", error);
            }
        };
        fetchData();
    }, []);
    const filteredPlanMeals = resultPlanData.filter((plan) => plan.category.length > 0);
    // Đếm số lượng planmeal thỏa điều kiện
    const countPlanMealsWithCategory = filteredPlanMeals.length;


    // Hàm để chọn icon dựa trên giới tính
    const getGenderIcon = (gender) => {
        if (gender === 'Male' || gender === 'male') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gender-male" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />
                </svg>
            );
        } else if (gender === 'female' || gender === 'Female') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gender-female" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5" />
                </svg>
            );
        }
        return null;
    };

    const [isBouncing, setIsBouncing] = useState(false);
    const handleBounceButtonClick = () => {
        const data = { following_id: id, follower_id: accountId }
        console.log(data)
        socket.emit('changeFollow', data)
        setIsBouncing(true);
        setTimeout(() => {
            setIsBouncing(false);
        }, 2000);
    };




    return (
        <>
            <div className={cx("w-full", "h-full", "container-profile")}>
                <div className="w-full h-auto shadow bg-white rounded-md">
                    <div className="max-w-6xl h-full mx-auto bg-white p-1">
                        <div
                            className="h-300 max-h-300 w-full rounded-lg relative"
                            style={{
                                backgroundImage: `url('https://random.imagecdn.app/1920/1080')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '5px',
                                height: '300px',
                            }}
                        >
                            <div
                                className="absolute  w-full flex items-center justify-center"
                                style={{ bottom: '-15px' }}
                            >

                                <div className="w-35 h-35 rounded-full bg-gray-300 border-4 border-white d-flex align-items-center justify-content-center">
                                    <img
                                        className="rounded-circle img-fluid"
                                        src={(profileInformation.avatar) ? profileInformation.avatar : 'avt'}
                                        alt="avatar "
                                        style={{ marginTop: "15rem", width: "190px", height: "190px" }}
                                    />
                                </div>
                            </div>
                            {
                                id != accountId && (
                                    <div className={cx('message-bnt')}>
                                        <div className={cx('page-content', 'page-container')} id="page-content">
                                            <div
                                                className={cx('btn', 'color', 'animate__animated', {
                                                    'animate__bounce': isBouncing,
                                                })}
                                            >
                                                <div onClick={handleBounceButtonClick} className={cx("toast", "fade-show", "animate__animated", " animate__fadeIn")}>
                                                    <button type="submit" className={cx('text-color')}>{isFollower ? 'Follow' : 'Unfollow'}</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('page-content', 'page-container')} id="page-content">
                                            <div
                                                className={cx('btn', 'color', 'animate__animated')}
                                            >
                                                <div onClick={() => handleShowMessageModal(listMessage)} className={cx("toast", "fade-show", "animate__animated", " animate__fadeIn")}>
                                                    <button type="submit" className={cx('text-color')}>Message</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>

            </div>

            <div className={("row")} style={{ margin: ' 70px 90px 30px' }}>
                {/* left  */}
                <div className={cx('row-left')}>
                    <div className={cx('row-gird', 'card')}>
                        <div className="p-3 card">
                            <div className={cx('header-show-info')}>
                                <p>Information</p>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "music")}>
                                <div className="d-flex flex-row align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                    </svg> &nbsp;
                                    <span className="ml-2">  {(profileInformation.address) ? profileInformation.address : ''}</span>
                                </div>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "music")}>
                                <div className="d-flex flex-row align-items-center">
                                    {getGenderIcon((profileInformation.gender) ? profileInformation.gender : '')} &nbsp;
                                    <span className="ml-2">{(profileInformation.gender) ? profileInformation.gender : ''}</span>
                                </div>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "music")}>
                                <div className="d-flex flex-row align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cake" viewBox="0 0 16 16">
                                        <path d="m7.994.013-.595.79a.747.747 0 0 0 .101 1.01V4H5a2 2 0 0 0-2 2v3H2a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2h-1V6a2 2 0 0 0-2-2H8.5V1.806A.747.747 0 0 0 8.592.802l-.598-.79ZM4 6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v.414a.911.911 0 0 1-.646-.268 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0A.911.911 0 0 1 4 6.414zm0 1.414c.49 0 .98-.187 1.354-.56a.914.914 0 0 1 1.292 0c.748.747 1.96.747 2.708 0a.914.914 0 0 1 1.292 0c.374.373.864.56 1.354.56V9H4zM1 11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.793l-.354.354a.914.914 0 0 1-1.293 0 1.914 1.914 0 0 0-2.707 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0L1 11.793zm11.646 1.854a1.915 1.915 0 0 0 2.354.279V15H1v-1.867c.737.452 1.715.36 2.354-.28a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.708 0a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.707 0a.914.914 0 0 1 1.293 0Z" />
                                    </svg> &nbsp;
                                    <span className="ml-2">  {getAge.age} years old</span>
                                </div>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "music")}>
                                <div className="d-flex flex-row align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                    </svg> &nbsp;
                                    <span className="ml-2"> {profileInformation.email ? profileInformation.email : ''} </span>
                                </div>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "p-3", "music")} style={{ marginBottom: "10px" }}>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="fa fa-music color"></i>
                                    &nbsp; <span className="ml-2">Following {followData.following} people  </span>
                                </div>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "p-3", "music")} style={{ marginBottom: "10px" }}>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="fa fa-music color"></i>
                                    &nbsp; <span className="ml-2">Followers: {followData.follower} </span>
                                </div>
                            </div>
                            {
                                id == accountId && (
                                    <button className={cx("edit")} onClick={() => setShowUpdateProfileModal(true)}><p> Edit</p></button>
                                )
                            }
                        </div>
                    </div>
                </div>


                {/* right  */}
                <div className={cx('row-right')}>
                    <div className="mb-4">
                        <div className="card-body">
                            <div className={cx('header-right')}>
                                <ul role="tablist" className="nav rounded mb-3">
                                    <li className={cx("nav-item", { 'active': activeTab === 'article' })}>
                                        <div onClick={() => handleTabChange('article')}>
                                            Article
                                        </div>
                                    </li>
                                    <li className={cx("nav-item", { 'active': activeTab === 'recipe' })} style={{ marginLeft: "40px" }}>
                                        <div onClick={() => handleTabChange('recipe')}>
                                            Recipe
                                        </div>
                                    </li>
                                    <li className={cx("nav-item", { 'active': activeTab === 'planmeal' })} style={{ marginLeft: "40px" }}>
                                        {id == accountId && (
                                            <div onClick={() => handleTabChange('planmeal')}>
                                                Plan meal
                                            </div>
                                        )}
                                    </li>
                                    <li className={cx("nav-item", { 'active': activeTab === 'collection' })} style={{ marginLeft: "40px" }}>
                                        {id == accountId && (
                                            <div onClick={() => handleTabChange('collection')}>
                                                Collection
                                            </div>
                                        )}

                                    </li>
                                </ul>
                            </div>
                            {/* HIỂN THỊ TƯƠNG ỨNG */}

                            {/* <div className="max-w-6xl h-full mx-auto bg-white p-1"> */}
                            <div className="tab-content">
                                {/* BLOG  */}
                                <div id="article" className={`tab-pane fade ${activeTab === 'article' ? 'show active pt-3' : ''}`}>
                                    {id == accountId && (
                                        <div className={cx('post_status')}>
                                            <div className={cx('post_hearer')}>
                                                <div className={cx('header_item')}>
                                                    <div className={cx('header_avatar')}>
                                                        <img className={cx('circle_avt')} src={images.Avt} />
                                                    </div>
                                                    <div className={cx('post_create')}>
                                                        <h5 className={cx('create_post')}>{profileInformation.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('post_body')} >
                                                <form onClick={() => setShowCreateBlogModal(true)}>
                                                    <textarea rows="2" placeholder='What do you want to talk about?' className={cx('textarea_post')} >
                                                    </textarea>
                                                </form>
                                            </div>
                                        </div>
                                    )}


                                    <div className={cx('post_status')}>
                                        <BlogForm idProfile={id} />
                                    </div>
                                </div>

                                {/* RECIPE */}
                                <div id="recipe" className={`tab-pane fade ${activeTab === 'recipe' ? 'show active pt-3' : ''}`}>
                                    <div className={cx('header-recipe')}>
                                        <span> </span>
                                    </div>
                                    <div className={cx('body-recipe')}>
                                        <RecipeForm isProfile={isProfile} />
                                    </div>
                                </div>

                                {/* PLAN MEAL  */}
                                <div id="planmeal" className={`tab-pane fade ${activeTab === 'planmeal' ? 'show active pt-3' : ''}`}>
                                    <div className={cx('planMeal-text-header')}>
                                        {profileInformation.name} has created {countPlanMealsWithCategory} plans meal &nbsp;
                                        <img width='20px' height='21px' style={{ marginTop: '-5px' }} src={images.congraduate} /> &nbsp;
                                        <img width='20px' height='21px' style={{ marginTop: '-5px' }} src={images.congraduate} /> &nbsp;
                                        <img width='20px' height='21px' style={{ marginTop: '-5px' }} src={images.congraduate} /> &nbsp;
                                    </div>

                                    <div className={("container-fluid d-flex justify-content-center")}>
                                        <div className={cx("list-row")} id="sortable" data-sortable-id="0">
                                            <div className={cx('card-planmeal')}>
                                                {filteredPlanMeals.map((plan) => (
                                                    <div key={plan._id} className={cx("list-item")} data-id="13" data-item-sortable-id="0" draggable="true" role="option" aria-grabbed="false" >
                                                        <div>
                                                            <a href="#" data-abc="true">
                                                                <span className={cx("w-40", "avatar", "gd-primary")}>P</span>
                                                            </a>
                                                        </div>
                                                        <div className={cx("name")}>
                                                            <Link to={`/detailPlan/${plan._id}`} className={cx("text-name")} data-abc="true">{plan.name}</Link>
                                                        </div>
                                                        <div className={cx("no-wrap")}>
                                                            <div className={("item-date", "text-muted", "text-sm", "d-none", "d-md-block")}>{format(new Date(plan.createAt), 'MM/dd/yyyy')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* COLLECTION  */}
                            <div id="collection" className={`tab-pane fade ${activeTab === 'collection' ? 'show active pt-3' : ''}`}>
                                <div className={cx('collection-card')}>
                                    <div className={cx('collection-add')}>
                                        <h1> General Collection</h1>
                                        <ul className={cx("collection-card", "add-collection", "flex-container")}>
                                            <li className={cx('mr')}>
                                                {isEditing ? (
                                                    <div className={cx("content", "content-add")}>
                                                        <div className={cx("inner-content")} style={{ margin: '70px 0' }}>
                                                            <input
                                                                name="name"
                                                                className={cx('input-collection-name')}
                                                                type="text"
                                                                placeholder="Collection name"
                                                                value={collectionData.name}
                                                                onChange={handleChangeCollection}
                                                            />
                                                            <button style={{ color: "#3a9691" }} className={cx('btn-action')} onClick={handleSaveClick}>Save</button>
                                                            <button className={cx('btn-action')} onClick={handleCancelClick}>Cancel</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={cx("content", "content-add")}>
                                                        <div className={cx("inner-content")} >
                                                            <button
                                                                title="New Collection"
                                                                aria-label="New Collection"
                                                                className={cx("btn-add-collection", "create-collection-button")}
                                                                onClick={handleAddCollectionClick}
                                                            >
                                                                <div style={{ fontSize: '60px' }} className="bi bi-plus-circle"></div>
                                                                <div className={cx("create-collection-text", "font-bold")}>New Collection</div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                            {/* SHOW COLLECTION  */}
                                            {showCollectionData.map(collection => (
                                                <li key={collection._id} className={cx("content", "content-show", "mr")} >
                                                    <div className={cx("inner-content")} >
                                                        <img className={cx('image-collection')} src={images.Background} />
                                                    </div>
                                                    <div className={cx('name-collection')}>
                                                        <Link to={`/detailCollection/${collection._id}`}>
                                                            {/* <Link to='/detailCollection'> */}
                                                            <div className={cx('name-text', 'name')}>{collection.name}</div>
                                                        </Link>
                                                        <div className={cx('dropdown', 'review_action', 'number-recipe')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                                            <div className={cx('like_icon')}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                                </svg>
                                                            </div>
                                                            {isDropdownOpen && (
                                                                <div className={cx('dropdown-content')}>
                                                                    <div className={cx('action-comment')}>
                                                                        <div className={cx('edit-btn')}>
                                                                            {/* Nút Edit */}
                                                                            <span>
                                                                                <svg style={{ margin: '-5px 4px 0 -20px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                                </svg>
                                                                            </span>
                                                                            <span> Edit</span>
                                                                        </div>
                                                                        <div className={cx('edit-btn')} onClick={() => handleDeleteCollection(collection._id, Account_id)} >
                                                                            {/* Nút Delete */}
                                                                            <span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                                </svg>
                                                                            </span>
                                                                            <span> Delete</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            {/* </div> */}

                        </div>
                    </div>
                </div>
                {/* {notification && <div className={cx('notification')}>{notification}</div>} */}
            </div >

            {showMessageModal && <ChatModal setShowMessageModal={setShowMessageModal}
                chat={chat} receiver={otherUser} setListMessage={setListMessage} handleShowMessageModal={handleShowMessageModal} />
            }

            {
                showUpdateProfileModal && < EditProfile setShowUpdateProfileModal={setShowUpdateProfileModal} />
            }
            {showCreateBlogModal && <CreateBlog setShowCreateBlogModal={setShowCreateBlogModal} />}
            {showUpdateBlogModal && < UpdateBlog setShowUpdateBlogModal={setShowUpdateBlogModal} updateNewArticle={updateNewArticle} />}
            {showDeleteModal && <DeleteBlog setShowDeleteModal={setShowDeleteModal} />}
            {showCommentBlogModal && <CommentBlog setShowCommentBlogModal={setShowCommentBlogModal} />}
        </>
    );
}
export default Profile;