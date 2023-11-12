import styles from "./DetailRecipe.module.scss"
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl, PROFILE_INFORMATION } from "~/constants/constants";
import axios from "axios";
import { io } from 'socket.io-client'
import Loading from "~/components/Layout/Loading";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar, faStar as fasStar } from '@fortawesome/free-regular-svg-icons';

const socket = io('http://localhost:9996/', { transports: ['websocket'] })

const cx = classNames.bind(styles)
function DetailRecipe() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const userId = profileInformation._id
    const { id } = useParams();
    const scrollingImage = document.querySelector('.detail_left_gird');
    if (scrollingImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const targetPosition = 500;

            if (scrollPosition >= targetPosition) {
                scrollingImage.style.position = 'absolute';
                scrollingImage.style.top = targetPosition + 'px';
            } else {
                scrollingImage.style.position = 'fixed';
                scrollingImage.style.top = '50%';
            }
        });
    }
    //lấy dữ liệu dựa vào id cụ thể
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [recipeIdForComment, setRecipeIdForComment] = useState(null);
    const [recipeData, setRecipeData] = useState(null);
    const [commentData, setCommentData] = useState({
        comment: '',
        userId: userId,
        Recipe_id: null,
    });

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recipe/getone/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setRecipeData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [apiUrl, accessToken, id]);
    // Check if recipeData is not undefined and has at least one item
    if (recipeData === null) {
        return <p><Loading /></p>;
    }
    const totalCookTime = recipeData.data[0].timeCook;
    const totalPrepareTime = recipeData.data[0].timePrepare;
    const totalTime = totalCookTime + totalPrepareTime;
    const totalIngredients = recipeData.data[0].ingredients.length;
    const calo = Math.round(recipeData.data[0].nutrion.calo);
    const protein = recipeData.data[0].nutrion.protein.toFixed(1);
    const carbs = recipeData.data[0].nutrion.carbs.toFixed(1);
    const fat = recipeData.data[0].nutrion.fat.toFixed(1);
    const sugar = recipeData.data[0].nutrion.sugar.toFixed(1);
    const fiber = recipeData.data[0].nutrion.fiber.toFixed(1);
    const sodium = recipeData.data[0].nutrion.sodium.toFixed(1);

    //HIEN NGUYEN LIEU
    const itemsPerGroup = 6;
    // Chia mảng thành các nhóm
    const groupedIngredients = [];
    for (let i = 0; i < recipeData.data[0].ingredients.length; i += itemsPerGroup) {
        groupedIngredients.push(recipeData.data[0].ingredients.slice(i, i + itemsPerGroup));
    }
    //ADD COMMENT
    const handleGetNewComment = (comment) => {
        socket.emit('add_article_comment', { _id: comment._id })
    }
    const handleChangeComment = (e) => {
        const { name, value } = e.target;
        if (name === 'comment') {
            setRecipeIdForComment(e.target.form.elements['_id'].value);
            setCommentData({
                ...commentData,
                [name]: value,
                Recipe_id: e.target.form.elements['_id'].value,
            });
        }
    };
    console.log(
        'input comment: ', commentData
    )

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('comment', commentData.comment);
            formData.append('Recipe_id', recipeIdForComment);
            formData.append('userId', userId);
            const response = await axios.post(`${apiUrl}/addRecipeComment`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('tao thah cong', formData)
            if (response.data.success) {
                console.log('tao thah cong', response.data)
            }
            setCommentData({
                comment: '',
                userId: userId,
                Recipe_id: null,
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };



    return (
        <>
            <div className={cx('detail_recipe')}>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Helmet>
                <div className={cx('home')}>
                    <div className={cx('top')}>
                        <div className={cx('breadcrumb_container')}>
                        </div>
                    </div>
                    {/* BODY  */}
                    <div className={cx('detail_content')}>
                        <nav className={cx('breadcrumb')}>
                            <span className={cx('breadcrumb_link')}>
                                <Link to="/homepage">Home</Link>
                            </span>
                            <span className={cx('breadcrumb_separator')}>/</span>
                            <span className={cx('breadcrumb_link')}>
                                <Link to="/recipe" title>Recipe</Link>
                            </span>
                            <span className={cx('breadcrumb_separator')}>/</span>
                            <span className={cx('breadcrumb_current')}>{recipeData.data[0].name}</span>
                        </nav>
                        {/* phan ben tren  */}
                        <div className={cx('detail_container')}>
                            <div className={cx('detail_right')}>
                                <div className={cx('header_right')}>
                                    <div className={cx('header_right_text')}>
                                        <div className={cx('gird_text')}>
                                            <h1 className={cx('title_recipe')}> {recipeData.data[0].name}</h1>
                                            <span className={cx('atribution')}>
                                                <Link to="" className={cx('source_link')}>{recipeData.data[0].Category}</Link>
                                            </span>
                                            <div className={cx('recipe_rating')}>
                                                TÁc giả
                                                <span className={cx('count_rating')}>{recipeData.data[0].timeUpload}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('description')}>
                                        <div className={cx('review_content')}>
                                            <span className={cx('description_sp')}>Description</span>: "{recipeData.data[0].description}"
                                        </div>
                                    </div>
                                    <div className={cx('count_material')}>
                                        <div className={cx('ingredient')}>
                                            <img src={images.ingredient} />
                                            <span className={cx('value')}>{totalIngredients}</span>
                                            <span className={cx('name_value')}>Ingredients</span>
                                        </div>
                                        <div className={cx('ingredient')}>
                                            <img src={images.time} />
                                            <span className={cx('value')}>{totalTime}</span>
                                            <span className={cx('name_value')}>Minutes</span>
                                        </div>
                                        <div className={cx('ingredient')}>
                                            <img src={images.serving} />
                                            <span className={cx('value')}>{recipeData.data[0].nPerson}</span>
                                            <span className={cx('name_value')}>Serving</span>
                                        </div>
                                    </div>

                                    <div className={cx('note')}>
                                        <p><b>Note:</b>
                                            <span> Suitable for children aged {recipeData.data[0].minAge} years and up</span>
                                        </p>
                                    </div>
                                </div>
                                {/* <div className={cx('line_right')}><hr /></div> */}
                            </div>
                            <div className={cx('detail_left')}>
                                <div className={cx('detail_left_gird')}>
                                    <img src={images.img_article} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('line_right')}><hr /></div>
                        {/* cac nguyen lieu  */}
                        <div className={cx('bottom_recipe')}>
                            <div className={cx('recipe_ingredient_wrapper')}>
                                <div className={cx('ingredient_header')}>
                                    <h3 className={cx('ingrs_header_title')}>Ingredients</h3>
                                    <div className={cx('flex_expand')}></div>
                                </div>

                                <div className={cx('shopping_list_ingrs')}>
                                    {groupedIngredients.map((group, groupIndex) => (
                                        <ul key={groupIndex} className={cx('list_ingrs')}>
                                            {group.map((ingredient, index) => (
                                                <li key={index} className={cx('show_ingrs')}>
                                                    <div className={cx('type_add')}>
                                                        <i className="bi bi-plus-circle"></i>
                                                    </div>
                                                    <li className={cx('ingredient_line')}>
                                                        <span className={cx('name_ingrs')}>{ingredient.name}</span> &nbsp;
                                                        <span className={cx('amount_ingrs')}>
                                                            <span>{ingredient.quantitative} {ingredient.quantitativeUnit}</span>
                                                        </span>

                                                    </li>
                                                </li>
                                            ))}
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* NUTRION */}
                        <div className={cx('nutrition_wrapper')}>
                            <h3 className={cx('nutrition_title')}>Nutrition</h3>
                            <p className={cx('nutrition_info')}>Full nutritional details of the dish</p>
                            <div>
                                <div className={cx('recipe_nutrition')}>
                                    <div className={cx('nutrition_total')}>
                                        <span className={cx('value_nutrition')}>{calo}</span>
                                        <span className={cx('name_nutrition')}>Calories</span>
                                    </div>
                                    <div className={cx('nutrition_value')}>
                                        <span className={cx('value_nutrition')}>{sodium}</span>
                                        <span className={cx('name_nutrition')}>sodium</span>
                                    </div>
                                    <div className={cx('nutrition_value1')}>
                                        <span className={cx('value_nutrition')}>{fat}</span>
                                        <span className={cx('name_nutrition')}>fat</span>
                                    </div>
                                    <div className={cx('nutrition_value2')}>
                                        <span className={cx('value_nutrition')}>{carbs}</span>
                                        <span className={cx('name_nutrition')}>carbs</span>
                                    </div>
                                    <div className={cx('nutrition_value3')}>
                                        <span className={cx('value_nutrition')}>{fiber}</span>
                                        <span className={cx('name_nutrition')}>fiber</span>
                                    </div>
                                    <div className={cx('nutrition_value4')}>
                                        <span className={cx('value_nutrition')}>{protein}</span>
                                        <span className={cx('name_nutrition')}>protein</span>
                                    </div>
                                    <div className={cx('nutrition_value5')}>
                                        <span className={cx('value_nutrition')}>{sugar}</span>
                                        <span className={cx('name_nutrition')}>sugar</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* STEP  */}
                        <div className={cx('step_recipe_wrapper')}>
                            <div className={cx('step_header')}>
                                <h3 className={cx('title_step')}> Step</h3>
                            </div>
                            <div className={cx('step_wrapper')}>
                                <div className={cx('step_1')}>
                                    <div className={cx('step_header1')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-feather" viewBox="0 0 16 16">
                                            <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.765 3.765 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1c-1.95 1.686-3.168 3.724-3.758 5.423-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88.017.04.035.082.056.122A68.362 68.362 0 0 0 .08 15.198a.528.528 0 0 0 .157.72.504.504 0 0 0 .705-.16 67.606 67.606 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.528.528 0 0 0 0-.739l-.729-.744 1.311.209a.504.504 0 0 0 .443-.15c.222-.23.444-.46.663-.684.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.524.524 0 0 0-.112-.172ZM3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196a.526.526 0 0 0-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.282 1.282 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a6.85 6.85 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524-1.581-.25Zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a7.97 7.97 0 0 1 1.564-.173Z" />
                                        </svg>
                                        <h3 className={cx('title_header')}>
                                            Process Materials
                                        </h3>
                                        <span> {recipeData.data[0].timePrepare} minutes</span>
                                    </div>
                                    <div>
                                        <p>{recipeData.data[0].prepare}</p>
                                    </div>
                                </div>
                                <div className={cx('space')}></div>
                                <div className={cx('step_1')}>
                                    <div className={cx('step_header1')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cookie" viewBox="0 0 16 16">
                                            <path d="M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm4.5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                            <path d="M8 0a7.963 7.963 0 0 0-4.075 1.114c-.162.067-.31.162-.437.28A8 8 0 1 0 8 0Zm3.25 14.201a1.5 1.5 0 0 0-2.13.71A7.014 7.014 0 0 1 8 15a6.967 6.967 0 0 1-3.845-1.15 1.5 1.5 0 1 0-2.005-2.005A6.967 6.967 0 0 1 1 8c0-1.953.8-3.719 2.09-4.989a1.5 1.5 0 1 0 2.469-1.574A6.985 6.985 0 0 1 8 1c1.42 0 2.742.423 3.845 1.15a1.5 1.5 0 1 0 2.005 2.005A6.967 6.967 0 0 1 15 8c0 .596-.074 1.174-.214 1.727a1.5 1.5 0 1 0-1.025 2.25 7.033 7.033 0 0 1-2.51 2.224Z" />
                                        </svg>
                                        <h3 className={cx('title_header')}>
                                            Cooking
                                        </h3>
                                        <span>  {recipeData.data[0].timeCook} minutes</span>
                                    </div>
                                    {recipeData.data[0].steps.map((step, index) => (
                                        <div key={index}>
                                            {/* <p>{step.no}</p> */}
                                            <p>{step.detail}</p>
                                            <p>
                                                {step.files[0].fileStep.map((fileInfo, fileInfoIndex) => (
                                                    <div key={fileInfoIndex}>
                                                        {fileInfo.isImage ? (
                                                            <img src={fileInfo.url} alt={`Step ${index + 1}`} className={cx('step_img')} />
                                                        ) : (
                                                            <video controls className={cx('step_video')}>
                                                                <source src={fileInfo.url} />
                                                            </video>
                                                        )}
                                                    </div>
                                                ))}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* //COLEXTION  */}
                        <div className={cx('save_collection')}>
                            <div className={cx('save_btn')}>
                                <span className={cx('icon_save')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                    </svg>
                                </span>
                                <span className={cx('save')}>Save this recipe</span>
                            </div>
                            <div className={cx('add_planmeal')}>
                                <span className={cx('icon_save')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flower2" viewBox="0 0 16 16">
                                        <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4zm3-12c0 .073-.01.155-.03.247-.544.241-1.091.638-1.598 1.084A2.987 2.987 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1.117 1.117 0 0 1 5 4a3 3 0 0 1 6 0zm-.812 6.052A2.99 2.99 0 0 0 11 8a2.99 2.99 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a6.833 6.833 0 0 1-.647-.487zm-3.56.617a3.001 3.001 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084.02.091.03.174.03.247a3 3 0 1 1-6 0c0-.073.01-.155.03-.247.544-.242 1.091-.638 1.598-1.084zm-.816-4.721A2.99 2.99 0 0 0 5 8c0 .794.308 1.516.812 2.052a6.83 6.83 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                    </svg>
                                </span>
                                <span className={cx('save')}>Add to Meal Plan</span>
                            </div>
                        </div>
                        {/* REVIEW  */}
                        <div className={cx('review_wrapper')}>
                            <h3 className={cx('review_h3')}>Reviews
                                <span className={cx('count_review')}>(85)</span>
                            </h3>
                            <div className={cx('rating_average')}>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-half"></span>
                            </div>
                            <div className={cx('write_reviews')}>
                                <form onSubmit={handleSubmitComment}>
                                    <img src={profileInformation.avatar} />
                                    <div className={cx('write_content')}>
                                        <input type="hidden" name="_id" value={recipeData.data[0]._id} />
                                        <input
                                            onChange={handleChangeComment}
                                            name="comment"
                                            // rows="6"
                                            className={cx('review_text')}
                                            placeholder="Write your comment or review here..."
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className={cx("d-block")} data-rater='{"starSize":32,"step":0.5}'></div>

                            {/* HIEN COMMENT  */}
                            <div className={cx('read_review')}>
                                <div className={cx('avt_read')}>
                                    <Link to="#" className={cx('avt_read_review')}>
                                        <img src={images.Avt} />
                                    </Link>
                                </div>
                                <div className={cx('review_content_cmt')}>
                                    <div className={cx('review_name')}>
                                        <Link to="#">Abigail Gilchrist </Link>
                                        <span className={cx('time_review')}>2 hours</span>
                                    </div>
                                    <div className={cx('review_rating')}>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>

                                        <div className={cx('dropdown', 'review_action')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                            <span className={cx('like_icon')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                </svg>
                                            </span>
                                            {isDropdownOpen && (
                                                <div className={cx('dropdown-content')}>
                                                    {/* Nội dung của dropdown */}
                                                    <div className={cx('action-comment')}>
                                                        <div className={cx('edit')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                            </svg> &nbsp; Edit
                                                        </div>
                                                        <div className={cx('edit')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                            </svg> &nbsp; Delete
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={cx('dropdown-content')}>
                                        {/* Nội dung của dropdown */}
                                        <div className={cx('action-comment')}>
                                            <div className={cx('edit')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                </svg> &nbsp; Edit
                                            </div>
                                            <div className={cx('edit')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                </svg> &nbsp; Delete
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('show_review')}>
                                        I tweaked this meal a little I added Knorr Rice Sides Cheddar Broccoli Rice 2 bags, 1 bag of x-small shrimp, bag of chopped onions, than for seasoning I only used three things Peppercorn, Onion Powered, Soy Sauce, and than Fiesta Cheese and my brother loved it
                                    </div>
                                    <div className={cx('emotion_review')}>
                                        <span className={cx('like_icon')} title="Like this review">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                            </svg>
                                        </span>
                                        <span className={cx('count_like_cmt')}>1</span>
                                        <span className={cx('line_action')}></span>
                                        <span className={cx('spam_review')} title="Report">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default DetailRecipe;