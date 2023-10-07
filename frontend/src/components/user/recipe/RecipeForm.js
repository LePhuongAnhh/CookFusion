import { Link } from 'react-router-dom'
import style from './RecipeForm.module.css'
import Recipe from "../../../image/recipe.webp"
import vegetable from "../../../image/vegetable.jpg"
import stars from "../../../image/star1.png"

const RecipeForm = () => {
    return (
        <>
            <div className={style.blog_card}>
                <div className={style.blog_img}>
                    <img src={vegetable} />
                </div>
                <div className={style.blog_tag}>
                    <div className={style.blog_date}>
                        <p>
                            <Link to="#" className={style.recipe_rating}>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-half"></span>
                                <span className={style.count_rating}>(123)</span>
                            </Link>
                        </p>
                    </div>
                    <h3 className={style.blog_heading}>
                        Do Not Leave toko before Eating this remen
                    </h3>
                    <hr />
                    <div className={style.view_and_like}>
                        <div className={style.view}>
                            <p>15.3K Views</p>
                            <p className={style.b_comm}>786 comments</p>
                        </div>
                        <div className={style.like}>
                            <p>3K</p>
                            <i class="bi bi-bookmark-heart"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeForm