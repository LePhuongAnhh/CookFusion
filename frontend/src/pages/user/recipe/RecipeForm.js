import styles from './RecipeForm.module.scss'
import classNames from 'classnames/bind'
import { ACCESS_TOKEN, ROLE, apiUrl, PROFILE_INFORMATION } from '~/constants/constants'
import images from '~/assets/images'

//import ngoi thu vien
import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
const RecipeForm = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const [recipeAllData, setAllRecipeData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recipe/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setAllRecipeData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [apiUrl, accessToken]);
    console.log('filteredRecipes ne:', recipeAllData);

    // Check if recipeAllData is an empty array
    if (recipeAllData.length === 0) {
        return <p className={cx('loading')}>No recipes available.</p>;
    }


    // SILER
    const NextArrow = (props) => (
        <div {...props} className={cx('custom-arrow next-arrow')}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );

    const PrevArrow = (props) => (
        <div {...props} className={cx('custom-arrow prev-arrow')}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );

    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     nextArrow: <NextArrow />,
    //     prevArrow: <PrevArrow />,
    //     appendDots: (dots) => (
    //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //             <PrevArrow />
    //             {dots}
    //             <NextArrow />
    //         </div>
    //     ),
    // };

    //NHÓM RECIPE THEO CATEGORY
    const recipesByCategory = {};
    recipeAllData.data.forEach((recipe) => {
        const category = recipe.Category;
        if (!recipesByCategory[category]) {
            recipesByCategory[category] = [];
        }
        recipesByCategory[category].push(recipe);
    });
    // Xử lý sự kiện khi vuốt chuột
    const handleScroll = (e) => {
        const container = e.target;
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.clientWidth / 4; // 4 là số item hiển thị trong mỗi lần cuộn

        const currentCategoryIndex = Math.floor(scrollLeft / itemWidth);
        container.scrollLeft = currentCategoryIndex * itemWidth;
    };

    //detail
    return (
        <>
            <div className={cx('horizontal-scroll-container')} onScroll={handleScroll}>
                {Object.entries(recipesByCategory).map(([category, recipes]) => (
                    <div key={category} className={cx('category-container')}>

                        <div className={cx('filter-cate')}>
                            <div>{category}</div>
                        </div>
                        <div className={cx('recipe-list-horizontal')}>
                            {/* <Slider {...settings}> */}
                            {recipes.map((recipe, index) => (
                                <Link
                                    // key={recipe._id}
                                    to={`/detail/${recipe._id}`}
                                    className={cx('recipe-item-horizontal')}
                                >
                                    <div key={recipe._id} className={cx('recipe-item-horizontal')}>
                                        <div className={cx('blog_card')}>
                                            <div className={cx('blog_img')}>
                                                <img src={recipe.image} alt={`Recipe ${index + 1}`} />
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
                                                    {recipe.name}
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

                                </Link>
                            ))}
                            {/* </Slider> */}
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default RecipeForm