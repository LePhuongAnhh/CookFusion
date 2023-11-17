//import từ thư viện bên ngoài
import React, { useState, useEffect } from "react"
import { useNavigate, useNavigation, useParams, Link } from "react-router-dom"
import axios from "axios"

//import từ bên trong src
import { apiUrl, PROFILE_INFORMATION, ACCESS_TOKEN } from "~/constants/constants"
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

const cx = classNames.bind(styles)
function Profile() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const Account_id = profileInformation._id
    const navigate = useNavigate()
    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
    const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false) // trạng thái của modal hiển thị form comment
    const [showDeleteModal, setShowDeleteModal] = useState(false)// trạng thái của modal hiển thị xác nhận xóa
    const [showCommentBlogModal, setShowCommentBlogModal] = useState(false)// trạng thái của modal hiển baif cmt
    const [events, setEvents] = useState([])


    const { id } = useParams();

    const updateNewArticle = (data) => {
    }

    //CHUYEN CAC TAB
    const [activeTab, setActiveTab] = useState('article');
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    const navigator = useNavigate();

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
            console.log(response.data)
            setIsEditing(false);
            setCollectionData({
                name: '',
                Account_id: Account_id,
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };


    //Read Collection

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
                                        src={profileInformation.avatar}
                                        alt="avatar "
                                        style={{ marginTop: "18rem", width: "165px", height: "165px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={("row")} style={{ margin: ' 30px 90px' }}>
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
                                    <span className="ml-2"> Đến từ {profileInformation.address}</span>
                                </div>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "music")}>
                                <div className="d-flex flex-row align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                    </svg> &nbsp;
                                    <span className="ml-2"> {profileInformation.email} </span>
                                </div>
                            </div>
                            <div className={cx("d-flex", "justify-content-between", "align-items-center", "p-3", "music")} style={{ marginBottom: "10px" }}>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="fa fa-music color"></i>
                                    &nbsp; <span className="ml-2">Following 3 people  </span>
                                </div>
                            </div>
                            <button className={cx("edit")} onClick={() => setShowUpdateProfileModal(true)}><p> Edit</p></button>
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
                                        <div onClick={() => handleTabChange('planmeal')}>
                                            Plan meal
                                        </div>
                                    </li>
                                    <li className={cx("nav-item", { 'active': activeTab === 'collection' })} style={{ marginLeft: "40px" }}>
                                        <div onClick={() => handleTabChange('collection')}>
                                            Collection
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* HIỂN THỊ TƯƠNG ỨNG */}

                            {/* <div className="max-w-6xl h-full mx-auto bg-white p-1"> */}
                            <div className="tab-content">
                                {/* BLOG  */}
                                <div id="article" className={`tab-pane fade ${activeTab === 'article' ? 'show active pt-3' : ''}`}>
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

                                    <div className={cx('post_status')}>
                                        <BlogForm idProfile={id} />
                                    </div>
                                </div>

                                {/* RECIPE */}
                                <div id="recipe" className={`tab-pane fade ${activeTab === 'recipe' ? 'show active pt-3' : ''}`}>
                                    <div className={cx('header-recipe')}>
                                        <span> Wow, you have created 43 recipes</span>
                                    </div>
                                    <div className={cx('body-recipe')}>
                                        <RecipeForm idProfile={id} />
                                    </div>
                                </div>

                                {/* PLAN MEAL  */}
                                <div id="planmeal" className={`tab-pane fade ${activeTab === 'planmeal' ? 'show active pt-3' : ''}`}>
                                    <div>
                                        các plam meal
                                    </div>

                                    <div className={("container-fluid d-flex justify-content-center")}>
                                        <div className={cx("list", "list-row", "card")} id="sortable" data-sortable-id="0" aria-dropeffect="move">
                                            <div className={cx('card-planmeal')}>
                                                <div className={cx("list-item")} data-id="13" data-item-sortable-id="0" draggable="true" role="option" aria-grabbed="false" >
                                                    <div>
                                                        <a href="#" data-abc="true">
                                                            <span className={cx("w-40", "avatar", "gd-primary")}>P</span>
                                                        </a>
                                                    </div>
                                                    <div className={cx("flex")}>
                                                        <a href="#" className={cx("item-author", "text-color")} data-abc="true">Ten Plan meal</a>
                                                    </div>
                                                    <div className={cx("no-wrap")}>
                                                        <div className={("item-date", "text-muted", "text-sm", "d-none", "d-md-block")}>3 weeks ago
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                </div>


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
                                        <ul className={cx("collection-card", "add-collection")}>
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
                                            <li className={cx("content", "content-show", "mr")} >
                                                <div className={cx("inner-content")} >
                                                    <img className={cx('image-collection')} src={images.Background} />
                                                </div>
                                                <div className={cx('name-collection')}>
                                                    <div className={cx('name-text', 'name')}>mua thi trơi </div>
                                                    <div className={cx('number-recipe', 'name')}>3 recipes</div>
                                                </div>
                                            </li>

                                            <li className={cx("content", "content-show", "mr")} >
                                                <div className={cx("inner-content")} >
                                                    <img className={cx('image-collection')} src={images.Background} />
                                                </div>
                                                <div className="container">
                                                    <div className={cx('name-collection')}>
                                                        <div className={cx('name-text', 'name')}>Name</div>
                                                        <div className={cx('number-recipe', 'name')}>3 recipes</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            {/* </div> */}

                        </div>
                    </div>
                </div>
            </div >


            {showUpdateProfileModal && < EditProfile setShowUpdateProfileModal={setShowUpdateProfileModal} />
            }
            {showCreateBlogModal && <CreateBlog setShowCreateBlogModal={setShowCreateBlogModal} />}
            {showUpdateBlogModal && < UpdateBlog setShowUpdateBlogModal={setShowUpdateBlogModal} updateNewArticle={updateNewArticle} />}
            {showDeleteModal && <DeleteBlog setShowDeleteModal={setShowDeleteModal} />}
            {showCommentBlogModal && <CommentBlog setShowCommentBlogModal={setShowCommentBlogModal} />}
        </>
    );
}
export default Profile;