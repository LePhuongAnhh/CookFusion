import { Link } from 'react-router-dom'
import styles from './RecipeForm.module.scss'
import classNames from 'classnames/bind'
import { ACCESS_TOKEN } from '~/constants/constants'
import images from '~/assets/images'

const cx = classNames.bind(styles)
const RecipeForm = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return (
        <>
            <div className={cx('blog_card')}>
                <div className={cx('blog_img')}>
                    <img src={images.vegetable} />
                </div>
                <div className={cx('blog_tag')}>
                    <div className={cx('blog_date')}>
                        <p>
                            <Link to="#" className={cx('recipe_rating')}>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-half"></span>
                                <span className={cx('count_rating')}>(123)</span>
                            </Link>
                        </p>
                    </div>
                    <h3 className={cx('blog_heading')}>
                        Do Not Leave toko before Eating this remen
                    </h3>
                    <hr />
                    <div className={cx('view_and_like')}>
                        <div className={cx('view')}>
                            <p>15.3K Views</p>
                            <p className={cx('b_comm')}>786 comments</p>
                        </div>
                        <div className={cx('like')}>
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