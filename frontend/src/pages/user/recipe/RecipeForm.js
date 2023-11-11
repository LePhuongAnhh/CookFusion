import styles from './RecipeForm.module.scss'
import classNames from 'classnames/bind'
import { ACCESS_TOKEN, ROLE, apiUrl, PROFILE_INFORMATION } from '~/constants/constants'
import images from '~/assets/images'

//import ngoi thu vien
import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'

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
                console.log(' all data recipe: ', response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [apiUrl, accessToken]);

    // Check if recipeAllData is an empty array
    if (recipeAllData.length === 0) {
        return <p className={cx('loading')}>No recipes available.</p>;
    }

    return (
        <>
            {recipeAllData.data.map((recipe, index) => (
                <li key={recipe._id}>
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
                                {recipe.name || 'Untitled Recipe'}
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
                </li>
            ))}

        </>
    )
}

export default RecipeForm