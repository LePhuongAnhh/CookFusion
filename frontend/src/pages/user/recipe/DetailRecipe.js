import styles from "./DetailRecipe.module.scss"
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet"
import images from '~/assets/images'
import { ACCESS_TOKEN, apiUrl, PROFILE_INFORMATION } from "~/constants/constants";
import axios from "axios";
import { io } from 'socket.io-client'
import Loading from "~/components/Layout/Loading";
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const socket = io('http://localhost:9996/', { transports: ['websocket'] })
const cx = classNames.bind(styles)
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const CustomStarIcon = () => (
    <StarIcon fontSize="inherit" />
);


const EditComment = ({ comment, onSave, onCancel, recipeData }) => {
    const [editedComment, setEditedComment] = useState(comment.comment);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));

    const handleInputChange = (e) => {
        const newEditedComment = e.target.value;
        setEditedComment(newEditedComment);
    };

    const handleSave = () => {
        console.log("Data to be saved:", {
            _id: comment._id,
            Account_id: profileInformation._id,
            comment: editedComment,
            Recipe_id: recipeData.data[0]._id,
        });
        onSave(comment._id, profileInformation._id, editedComment, comment.Recipe_id);
    };

    return (
        <div className={cx('modalDeleteIdea')}>
            <div div className={cx('modalContentDeleteIdea')}>
                <div className={cx('header-delete')}>
                    <h2 className={cx('containerDelete')}>Edit</h2>
                    <div onClick={onCancel} className={cx('icon-exit')}>
                        <i class="bi bi-x"></i>
                    </div>
                </div>
                <hr className={cx('line')} />
                <div className={cx('body-delete')}>
                    <img src={profileInformation.avatar} alt="Avatar" className={cx("edit-comment-avatar")} />
                    <input
                        type="text"
                        value={editedComment}
                        onChange={handleInputChange}
                        className={cx("edit-comment-input")}
                    />
                </div>
                <div className={cx('footer-delete')}>
                    <div className={cx('btn_delete')} onClick={handleSave}>
                        Save
                    </div>
                </div>
            </div>

        </div >
    );
};



function DetailRecipe() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileInformation = JSON.parse(localStorage.getItem(PROFILE_INFORMATION));
    const Account_id = profileInformation._id
    const { id } = useParams();
    const scrollingImage = document.querySelector('.detail_left_gird');
    const [avg, setAvg] = useState(0)
    const [isChange, setIsChange] = useState(false)
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
    const navigate = useNavigate();
    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const [comments, setComments] = useState([]);
    //lấy dữ liệu dựa vào id cụ thể
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [recipeIdForComment, setRecipeIdForComment] = useState(null);
    const [recipeData, setRecipeData] = useState(null);
    const [commentData, setCommentData] = useState({
        comment: '',
        Account_id: Account_id,
        Recipe_id: null,
    });
    const [value, setValue] = useState(5);
    const [hover, setHover] = useState(-1);

    const [editingCommentId, setEditingCommentId] = useState(null);
    const handleEditComment = (_id) => {
        setEditingCommentId(_id);
    };

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };
    const handleRate = (val) => {
        setValue(val)
        const data = {
            rating: val,
            Recipe_id: id,
            Category: recipeData.data[0].Category,
            Account_id: Account_id,
            _id: null
        }
        const _id = recipeData.data[0].ratings.find((rating) => { return rating.Account_id == Account_id })
        if (_id) data._id = _id._id
        socket.emit('create_Or_Update_Rating', { Account_id: Account_id, rating: data })
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isChange) setIsChange(false)
                const response = await axios.get(`${apiUrl}/recipe/getone/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data.data[0].ratings.length > 0) {
                    const rate = response.data.data[0].ratings.reduce((sum, rating) => sum + rating.rating, 0) / response.data.data[0].ratings.length
                    setAvg(rate)
                }
                setRecipeData(response.data);
                const _id = response.data.data[0].ratings.find((rating) => { return rating.Account_id == Account_id })
                if (_id) setValue(_id.rating)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        socket.on('create_Or_Update_Rating', (data) => {
            if (data.success) {
                setIsChange(true)
            }
        })
        socket.on('add_recipe_comment', (data) => {
            if (data.success && data.comment == id) {
                setIsChange(true)
            }
        })
        return () => {
            socket.off('create_Or_Update_Rating')
            socket.off('add_recipe_comment')
        }
    }, [isChange]);
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
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                comment: commentData.comment,
                Recipe_id: recipeIdForComment,
                Account_id: Account_id,
            };
            const response = await axios.post(
                `${apiUrl}/comment/addRecipeComment`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setCommentData({
                comment: '',
                Account_id: Account_id,
                Recipe_id: null,
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    // ??DELETE
    const handleDeleteComment = async (_id) => {
        try {
            const response = await axios.delete(
                `${apiUrl}/comment/deleteRecipeComment`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json', // Thiết lập kiểu nội dung là JSON
                    },
                    data: {
                        _id: _id,
                    },
                }
            );
            setComments((prevComments) => prevComments.filter(comment => comment._id !== _id));
            console.log("Bình luận đã được xóa");
        } catch (error) {
            console.error("Lỗi xóa bình luận:", error);
        }
    };

    //EDIT
    const handleSaveComment = async (comment, editedComment, onSave) => {
        try {
            const response = await axios.patch(
                `${apiUrl}/comment/updateRecipeComment`,
                {
                    _id: comment._id,
                    Account_id: profileInformation._id,
                    comment: editedComment,
                    Recipe_id: recipeData.data[0]._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("Server response after saving comment:", response.data);
            onSave();
            // onCloseModal();
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
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
                            {/* <span className={cx('breadcrumb_separator')} onClick={handleBack}>/ &nbsp;  &nbsp; Back</span> */}
                            <span className={cx('breadcrumb_separator')}> /</span>
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
                                                Author: <Link to={`/profile/${encodeURIComponent(recipeData.data[0].user[0]._id)}`} className={cx('source_link')}>{recipeData.data[0].user[0].name}</Link>
                                                <span className={cx('count_rating')}>{recipeData.data[0].timeUpload.substring(0, 10)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('description')}>
                                        <div className={cx('review_content')}>
                                            <span className={cx('description_sp')}></span>"{recipeData.data[0].description}"
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
                                                            <span>{ingredient.quantitative} of {ingredient.quantitativeUnit}</span>
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
                                            <b>Step {step.no}:</b>
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
                                <span className={cx('count_review')}>({recipeData.data[0].ratings.length})</span>
                            </h3>
                            <div className={cx('rating_average')}>
                                {avg && (
                                    <div>
                                        {/* <span>{avg}</span> */}
                                        <span class={(avg >= 1) ?
                                            "bi bi-star-fill" : ((avg == 0) ? "bi bi-star" : "bi bi-star-half")}></span>
                                        <span class={(avg >= 2) ?
                                            "bi bi-star-fill" : ((avg == 1 || avg < 1) ? "bi bi-star" : "bi bi-star-half")}></span>
                                        <span class={(avg >= 3) ?
                                            "bi bi-star-fill" : ((avg == 2 || avg < 2) ? "bi bi-star" : "bi bi-star-half")}></span>
                                        <span class={(avg >= 4) ?
                                            "bi bi-star-fill" : ((avg == 3 || avg < 3) ? "bi bi-star" : "bi bi-star-half")}></span>
                                        <span class={(avg == 5) ?
                                            "bi bi-star-fill" : ((avg == 4 || avg < 4) ? "bi bi-star" : "bi bi-star-half")}></span>
                                    </div>
                                )}
                            </div>

                            {/* comment  */}
                            <div className={cx('write_reviews')}>
                                <form onSubmit={handleSubmitComment}>
                                    <img src={profileInformation.avatar} />
                                    <div className={cx('write_content')}>
                                        <input type="hidden" name="_id" value={recipeData.data[0]._id} />
                                        <input
                                            value={commentData.comment}
                                            onChange={handleChangeComment}
                                            name="comment"
                                            // rows="6"
                                            className={cx('review_text')}
                                            placeholder="Write your comment or review here..."
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* đánh giá  */}
                            <div className={cx('rating-card')}>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '36px',
                                    }}
                                >
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={1}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            handleRate(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<CustomStarIcon />}
                                    />
                                    {value !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )}
                                </Box>
                            </div>
                            {/* HIEN COMMENT  */}
                            {
                                recipeData.data[0].comments.length > 0 && recipeData.data[0].comments.map((comment) => (
                                    <div className={cx('read_review')}>
                                        <div className={cx('avt_read')}>
                                            <Link to={`/profile/${encodeURIComponent(comment.userComment._id)}`}>
                                                <img className={cx('circle_avt')} src={comment.userComment.avatar} />
                                            </Link>

                                            {/* <div className={cx('avatar_comment')}>
                                                    <img className={cx('circle_avt')} src={comment.usercomment.avatar} />
                                                </div> */}
                                        </div>
                                        <div className={cx('review_content_cmt')}>
                                            <div className={cx('review_name')}>
                                                <Link to={`/profile/${encodeURIComponent(comment.userComment._id)}`}>{comment.userComment.name}</Link>
                                                <span className={cx('time_review')}>{comment.timeComment.substring(0, 10)}</span>
                                            </div>
                                            <div className={cx('review_rating')}>
                                                {recipeData.data[0].ratings.length > 0 && recipeData.data[0].ratings.map((rating) => (
                                                    (rating.Account_id == comment.userComment._id) ?
                                                        <div>
                                                            <span class={(rating.rating >= 1) ?
                                                                "bi bi-star-fill" : "bi bi-star"}></span>
                                                            <span class={(rating.rating >= 2) ?
                                                                "bi bi-star-fill" : "bi bi-star"}></span>
                                                            <span class={(rating.rating >= 3) ?
                                                                "bi bi-star-fill" : "bi bi-star"}></span>
                                                            <span class={(rating.rating >= 4) ?
                                                                "bi bi-star-fill" : "bi bi-star"}></span>
                                                            <span class={(rating.rating == 5) ?
                                                                "bi bi-star-fill" : "bi bi-star"}></span>
                                                        </div> : <div></div>

                                                ))
                                                }
                                                <div className={cx('dropdown', 'review_action')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                    <span className={cx('like_icon')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                        </svg>
                                                    </span>
                                                    {isDropdownOpen && (
                                                        <div className={cx('dropdown-content')}>
                                                            {/* Nội dung của dropdown */}
                                                            <div className={cx('action-comment')}>
                                                                {comment.userComment._id === Account_id && (
                                                                    <div className={cx('edit')} onClick={() => handleEditComment(comment._id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                        </svg> &nbsp; Edit
                                                                    </div>

                                                                )}
                                                                {comment.userComment._id === Account_id && (
                                                                    <div className={cx('edit')} onClick={() => handleDeleteComment(comment._id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                        </svg> &nbsp; Delete
                                                                    </div>
                                                                )}

                                                                {comment.userComment._id !== Account_id && (
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
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                                        </svg> &nbsp; Edit
                                                                                    </div>
                                                                                    <div className={cx('edit')}>
                                                                                        {/* Nút Delete */}
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                                        </svg> &nbsp; Delete
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {editingCommentId === comment._id && (
                                                <EditComment
                                                    comment={comment}
                                                    onSave={handleSaveComment}
                                                    onCancel={handleCancelEdit}
                                                    recipeData={recipeData}
                                                />
                                            )}



                                            <div className={cx('show_review')}>
                                                {comment.comment}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                    <div className={cx('line-line')}>   End    </div>

                    {/* ĐỀ XUẤT MÓN ĂN CÓ NGUYÊN LIỆU TƯƠNG TỰ */}
                    {/* lấy 8 món ăn  */}

                    <div className={cx('hint')}>
                        <div className={cx('text-hint')}>
                            <span>DE XUAT  MON AN</span>
                        </div>
                        <div className={cx('item-hint')}>
                            <div className={cx('blog_card')}>
                                <div className={cx('blog_img')}>
                                    <img src={images.Background} />
                                </div>
                                <div className={cx('blog_tag')}>
                                    <div className={cx('blog_date')}>
                                        <p>
                                            <Link to="#" className={cx('recipe_rating')}>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-half"></span>
                                                <span className={cx('count_rating')}>(123)</span>
                                            </Link>
                                        </p>
                                    </div>
                                    <h3 className={cx('blog_heading')}>
                                        teen mons awn
                                    </h3>
                                    <hr />
                                    <div className={cx('view_and_like')}>
                                        <div className={cx('view')}>
                                            {/* <p>15.3K Views</p> */}
                                            <p className={cx('b_comm')}>786 comments</p>
                                        </div>
                                        <div className={cx('like')}>
                                            <p>3K</p>
                                            <i className="bi bi-bookmark-heart"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('blog_card')}>
                                <div className={cx('blog_img')}>
                                    <img src={images.Background} />
                                </div>
                                <div className={cx('blog_tag')}>
                                    <div className={cx('blog_date')}>
                                        <p>
                                            <Link to="#" className={cx('recipe_rating')}>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-half"></span>
                                                <span className={cx('count_rating')}>(123)</span>
                                            </Link>
                                        </p>
                                    </div>
                                    <h3 className={cx('blog_heading')}>
                                        teen mons awn
                                    </h3>
                                    <hr />
                                    <div className={cx('view_and_like')}>
                                        <div className={cx('view')}>
                                            {/* <p>15.3K Views</p> */}
                                            <p className={cx('b_comm')}>786 comments</p>
                                        </div>
                                        <div className={cx('like')}>
                                            <p>3K</p>
                                            <i className="bi bi-bookmark-heart"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('blog_card')}>
                                <div className={cx('blog_img')}>
                                    <img src={images.Background} />
                                </div>
                                <div className={cx('blog_tag')}>
                                    <div className={cx('blog_date')}>
                                        <p>
                                            <Link to="#" className={cx('recipe_rating')}>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-half"></span>
                                                <span className={cx('count_rating')}>(123)</span>
                                            </Link>
                                        </p>
                                    </div>
                                    <h3 className={cx('blog_heading')}>
                                        teen mons awn
                                    </h3>
                                    <hr />
                                    <div className={cx('view_and_like')}>
                                        <div className={cx('view')}>
                                            {/* <p>15.3K Views</p> */}
                                            <p className={cx('b_comm')}>786 comments</p>
                                        </div>
                                        <div className={cx('like')}>
                                            <p>3K</p>
                                            <i className="bi bi-bookmark-heart"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                {/* <FooterForm /> */}
            </div >

        </>
    )
}

export default DetailRecipe;