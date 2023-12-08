
import images from '~/assets/images'
import React, { useState, useEffect } from "react"
import styles from '../recipe/RecipeForm.module.scss'
import classNames from 'classnames/bind'
import { apiUrl, ACCESS_TOKEN, PROFILE_INFORMATION } from '~/constants/constants'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import DeleteRecipe from '~/components/Modal/DeleteRecipe'

const cx = classNames.bind(styles)
function DetailCollection() {
    const { id } = useParams();
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const Account_id = profileInformation._id

    const [collectionData, setCollectionData] = useState(null);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [showDeleteRecipeModal, setShowDeleteRecipeModal] = useState(false);
    const [recipeIdToDelete, setRecipeIdToDelete] = useState(null);
    const handleDeleteIconClick = (recipeId) => {
        setRecipeIdToDelete(recipeId);
        setShowDeleteRecipeModal(true);
    };
    const handleMouseEnter = () => {
        setDropdownOpen(true);

    };
    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };
    //get one collection
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/collection/getbycollection/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("data one collection nay:", response.data)
                setCollectionData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    // console.log("Fetching data for id:", collectionData.collections.name);
    console.log("data one name:", collectionData.collections[0].name)
    return (
        <>
            <div className={cx('detail')}>
                <div className={cx('header-card', 'header_wrapper', 'list-item')}>
                    <img className={cx('img-avatar')} src={images.header_planmeal} />
                </div>
                {collectionData.collections[0].name}
                <div className={cx('collection-body')}>
                    <div className={cx('horizontal-scroll-container')} >
                        {/* {collectionData.collections[0].listRecipe.map((recipe) => ( */}
                        <div className={cx('category-container')}>
                            <div className={cx('recipe-list-horizontal')}>

                                <div className={cx('recipe-item-horizontal')}>
                                    <div className={cx('blog_card')}>
                                        <Link
                                            // to={`/detail/${recipe._id}`}
                                            className={cx('recipe-item-horizontal')}
                                        >
                                            <div className={cx('blog_img')}>
                                                <img className={cx("blogImg")} src={images.Anh2} />
                                            </div>
                                        </Link>
                                        <div className={cx('blog_tag')}>
                                            <Link to="#"
                                                className={cx('recipe-item-horizontal')}
                                            >
                                                <div className={cx('blog_date')}>
                                                    <Link to="#" className={cx('recipe_rating')}>

                                                        {/* <span>{avg}</span> */}
                                                        {/* <span class={(recipe.avgRating >= 1) ?
                                                                "bi bi-star-fill text-warning" : ((recipe.avgRating == null) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                            &nbsp;<span class={(recipe.avgRating >= 2) ?
                                                                "bi bi-star-fill text-warning" : ((recipe.avgRating == 1 || recipe.avgRating < 1) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                            &nbsp;<span class={(recipe.avgRating >= 3) ?
                                                                "bi bi-star-fill text-warning" : ((recipe.avgRating == 2 || recipe.avgRating < 2) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                            &nbsp;<span class={(recipe.avgRating >= 4) ?
                                                                "bi bi-star-fill text-warning" : ((recipe.avgRating == 3 || recipe.avgRating < 3) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                            &nbsp;<span class={(recipe.avgRating == 5) ?
                                                                "bi bi-star-fill text-warning" : ((recipe.avgRating == 4 || recipe.avgRating < 4) ? "bi bi-star" : "bi bi-star-half text-warning")}></span> */}

                                                        &nbsp; <span className={cx('count_rating')}> rating</span>
                                                    </Link>
                                                </div>
                                                <h3 className={cx('blog_heading')}>
                                                    {/* {recipe.name} */} name
                                                </h3>
                                            </Link>
                                            <hr />
                                            <div className={cx('view_and_like')}>
                                                <div className={cx('view')}>
                                                    {/* <p>15.3K Views</p> */}
                                                    <p className={cx('b_comm', "cursor")}> comments</p>
                                                </div>
                                                <div className={cx('like')}>

                                                    <span className={cx('dropdown', 'review_action')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                        </svg>
                                                        {isDropdownOpen && (
                                                            <div className={cx('dropdown-content')}>
                                                                {/* Nội dung của dropdown */}
                                                                <div className={cx('action-comment')}>
                                                                    {/* {recipe.User_id === Account_id && (
                                                                            <div className={cx('edit')} onClick={() => handleDeleteIconClick(recipe._id)} >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                                </svg> &nbsp; Delete
                                                                            </div>
                                                                        )} */}

                                                                    {/* {recipe.User_id !== Account_id && (
                                                                            <div style={{ display: "none" }} className={cx('dropdown', 'review_action')}>
                                                                                <span className={cx('like_icon')}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                                    </svg>
                                                                                </span>
                                                                                {isDropdownOpen && (
                                                                                    <div className={cx('dropdown-content')}>
                                                                                        <div className={cx('action-comment')}>
                                                                                            <div className={cx('edit')} >
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
                                                                        )} */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* </Slider> */}
                            </div>

                            {showDeleteRecipeModal && (
                                <DeleteRecipe
                                    setShowDeleteRecipeModal={setShowDeleteRecipeModal}
                                    itemId={recipeIdToDelete}
                                    itemType="recipe"
                                    setFilteredItems={setFilteredRecipes}
                                    filteredItems={filteredRecipes}
                                />
                            )}
                        </div>
                        {/* ))} */}
                    </div >
                </div>
            </div>
        </>
    );
}

export default DetailCollection;