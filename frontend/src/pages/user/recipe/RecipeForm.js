import styles from './RecipeForm.module.scss'
import classNames from 'classnames/bind'
import { ACCESS_TOKEN, ROLE, apiUrl, PROFILE_INFORMATION } from '~/constants/constants'
import images from '~/assets/images'
import DeleteBlog from '~/components/Modal/DeleteBlog'
import DeleteRecipe from '~/components/Modal/DeleteRecipe'
import Loading from '~/components/Layout/Loading'
import EditRecipeModal from './EditRecipeModal'

//import ngoi thu vien
import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'


const cx = classNames.bind(styles)
const RecipeForm = ({ idProfile }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const Account_id = profileInformation._id;
    const [recipeAllData, setAllRecipeData] = useState([]);
    const [showUpdateRecipeModal, setShowUpdateRecipeModal] = useState(false)
    const [selectedUpdateRecipe, setSelectedUpdateRecipe] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // Trạng thái xác định xem recipe đã được lưu hay chưa
    const [showCollections, setShowCollections] = useState(false);
    const [collectionData, setCollectionData] = useState([]);
    const [currentRecipeId, setCurrentRecipeId] = useState(null);



    const handleButtonClick = (e, recipe) => {
        e.preventDefault();
        setShowCollections(!showCollections);
        setCurrentRecipeId(recipe._id); // Set the current recipe ID
    };

    //READ MORE
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    //horver setting
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const handleMouseEnter = () => {
        setDropdownOpen(true);

    };
    const handleMouseLeave = () => {
        setDropdownOpen(false);

    };
    //delete recipe
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [showDeleteRecipeModal, setShowDeleteRecipeModal] = useState(false);
    const [recipeIdToDelete, setRecipeIdToDelete] = useState(null);
    const handleDeleteIconClick = (recipeId) => {
        setRecipeIdToDelete(recipeId);
        setShowDeleteRecipeModal(true);
    };

    //GOI COLLECTION CUA MINH TAO
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/collection/getcollection`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const userCollections = response.data.collections.filter(collection => collection.Account_id === Account_id);
                setCollectionData(userCollections);
            } catch (error) {
                console.error("Error fetching Meal Plans:", error);
            }
        };
        fetchData();
    }, [accessToken, Account_id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (idProfile) {
                    const response = await axios.get(`${apiUrl}/recipe/getallbyuser`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    console.log("bai cua t ne", response.data);
                } else {
                    const [response, recommend] = await Promise.all([
                        axios.get(`${apiUrl}/recipe/getall`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }),
                        axios.get(`${apiUrl}/recommend/getListRecommend`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }),
                    ]);
                    console.log(recommend.data); // recommend data with 4 recipes => list recommend category
                    setAllRecipeData(response.data); // get first 4 recipes to display => list new category

                    // Lấy danh sách công thức đã lưu
                    const savedRecipes = response.data.savedRecipes;

                    // Cập nhật trạng thái lưu cho từng công thức
                    const updatedRecipes = response.data.map((recipe) => {
                        return {
                            ...recipe,
                            isSaved: savedRecipes.includes(recipe._id),
                        };
                    });

                    setAllRecipeData(updatedRecipes);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [idProfile, accessToken]); // Thêm idProfile và accessToken vào dependency array để tránh warning và cập nhật khi chúng thay đổi
    if (!recipeAllData || !recipeAllData.data || recipeAllData.data.length === 0) {
        return <p className={cx('loading')}><Loading /> </p>;
    }
    //NHÓM RECIPE THEO CATEGORY
    const recipesByCategory = {};
    recipeAllData.data.forEach((recipe) => {
        const category = recipe.Category;
        if (!recipesByCategory[category]) {
            recipesByCategory[category] = [];
        }
        recipesByCategory[category].push(recipe);
    });

    //SAVE COLLECTION
    // SAVE COLLECTION
    const handleCollectionClick = async (e, _id, collection, nameRecipe) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${apiUrl}/collection/saveRecipeCollection`,
                { _id, Collection_id: collection._id, isRecipe: true },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(`Clicked on collection for recipe: ${nameRecipe}`);
            if (response.data) {
                setIsSaved(true); // Cập nhật trạng thái đã lưu
                console.log('response.data:', response.data);
            }
        } catch (error) {
            console.error('Error saving recipe to collection:', error);
        }
    };

    return (
        <>
            <div className={cx('horizontal-scroll-container')} >
                {Object.entries(recipesByCategory).map(([category, recipes]) => (
                    <div key={category} className={cx('category-container')}>
                        <div className={cx('filter-cate')}>
                            <div>{category}</div>
                        </div>
                        <div className={cx('recipe-list-horizontal')}>
                            {recipes.slice(0, showAll ? recipes.length : 4).map((recipe, index) => (
                                <div key={recipe._id} className={cx('recipe-item-horizontal')}>
                                    <div className={cx('blog_card')}>
                                        <Link
                                            to={`/detail/${recipe._id}`}
                                            className={cx('recipe-item-horizontal')}
                                        >
                                            <div className={cx('blog_img')}>
                                                <img className={cx("blogImg")} src={recipe.image} alt={`Recipe ${index + 1}`} />
                                            </div>
                                        </Link>
                                        <div className={cx('blog_tag')}>
                                            <Link to="#"
                                                className={cx('recipe-item-horizontal')}
                                            >
                                                <div className={cx('blog_date')}>
                                                    <Link to="#" className={cx('recipe_rating')}>

                                                        {/* <span>{avg}</span> */}
                                                        <span class={(recipe.avgRating >= 1) ?
                                                            "bi bi-star-fill text-warning" : ((recipe.avgRating == null) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                        &nbsp;<span class={(recipe.avgRating >= 2) ?
                                                            "bi bi-star-fill text-warning" : ((recipe.avgRating == 1 || recipe.avgRating < 1) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                        &nbsp;<span class={(recipe.avgRating >= 3) ?
                                                            "bi bi-star-fill text-warning" : ((recipe.avgRating == 2 || recipe.avgRating < 2) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                        &nbsp;<span class={(recipe.avgRating >= 4) ?
                                                            "bi bi-star-fill text-warning" : ((recipe.avgRating == 3 || recipe.avgRating < 3) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>
                                                        &nbsp;<span class={(recipe.avgRating == 5) ?
                                                            "bi bi-star-fill text-warning" : ((recipe.avgRating == 4 || recipe.avgRating < 4) ? "bi bi-star" : "bi bi-star-half text-warning")}></span>

                                                        &nbsp; <span className={cx('count_rating')}>({recipe.ratings})</span>
                                                    </Link>
                                                    <button onClick={(e) => handleButtonClick(e, recipe)}>
                                                        {isSaved ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f46708" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098z" />
                                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098z" />
                                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                                            </svg>
                                                        )}
                                                    </button>

                                                </div>
                                                <h3 className={cx('blog_heading')}>
                                                    {recipe.name}
                                                </h3>
                                            </Link>
                                            <hr />
                                            <div className={cx('view_and_like')}>
                                                <div className={cx('view')}>
                                                    {/* <p>15.3K Views</p> */}
                                                    <p className={cx('b_comm', "cursor")}>{recipe.comments} comments</p>
                                                </div>
                                                <div className={cx('like')}>
                                                    {/* <p className={cx('count-save')}>{recipe.collections}</p> */}
                                                    {showCollections && currentRecipeId === recipe._id && (
                                                        <div className={cx('notification-popup')}>
                                                            {/* Nội dung của dropdown */}
                                                            <div className={cx('card-list')}>
                                                                <div className={cx('card-item')}>
                                                                    <span>Add to a collection </span>
                                                                    {collectionData.map((collection) => (
                                                                        <div className={cx('list-item')} key={collection._id} onClick={(e) => handleCollectionClick(e, recipe._id, collection, recipe.name)}>
                                                                            {collection.name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <span className={cx('dropdown', 'review_action')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                        </svg>
                                                        {isDropdownOpen && (
                                                            <div className={cx('dropdown-content')}>
                                                                {/* Nội dung của dropdown */}
                                                                <div className={cx('action-comment')}>
                                                                    {recipe.User_id === Account_id && (
                                                                        <div className={cx('edit')} onClick={() => handleDeleteIconClick(recipe._id)} >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                            </svg> &nbsp; Delete
                                                                        </div>
                                                                    )}

                                                                    {recipe.User_id !== Account_id && (
                                                                        <div style={{ display: "none" }} className={cx('dropdown', 'review_action')}>
                                                                            <span className={cx('like_icon')}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                                </svg>
                                                                            </span>
                                                                            {isDropdownOpen && (
                                                                                <div className={cx('dropdown-content')}>
                                                                                    <div className={cx('action-comment')}>
                                                                                        <div className={cx('edit')}>
                                                                                            {/* Nút Edit */}
                                                                                            <span>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                                                </svg>
                                                                                            </span>
                                                                                            <span> Edit</span>
                                                                                        </div>
                                                                                        <div className={cx('edit')} >
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
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* </Slider> */}
                        </div>
                        {recipes.length > 4 && (
                            <div className={cx('action-readmore')} onClick={toggleShowAll}>
                                {showAll ? 'Show Less' : 'Read More'}
                            </div>
                        )}
                        {showDeleteRecipeModal && (
                            <DeleteRecipe
                                setShowDeleteRecipeModal={setShowDeleteRecipeModal}
                                itemId={recipeIdToDelete}
                                itemType="recipe"
                                setFilteredItems={setFilteredRecipes}
                                filteredItems={filteredRecipes}
                            />
                        )}
                        {showUpdateRecipeModal && (
                            <EditRecipeModal
                                setShowUpdateRecipeModal={setShowUpdateRecipeModal}
                            />
                        )}
                    </div>

                ))}
            </div >
        </>
    )
}

export default RecipeForm