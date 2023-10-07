import style from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import recipe from '../../../image/recipe.png'
import plan from '../../../image/plan_meal.png'
import Recipe from '../../../image/recipe.png'
import blog from '../../../image/blog.png'
import sponsor from '../../../image/sponsor.png'
import Logo_nav from '../../../image/restauran1.png'



const Sidebar = () => {
    return (
        <div className={style.sidebar_wrap}>
            <div className={style.sidebar_wrapper}>
                <ul>
                    <li>
                        <Link to="/homepage" className={style.sidebar_logo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                            </svg>
                            <p className={style.sidebar_text}>Home</p>
                        </Link>
                    </li>

                    <li className={style.likes}>
                        <Link to="/recipe">
                            <img src={recipe} />
                            <p className={style.sidebar_text} >Recipe</p>
                        </Link>
                    </li>
                    <li className={style.likes}>
                        <Link to="#">
                            <img src={blog} />
                            <p className={style.sidebar_text} >Blog</p>
                        </Link>
                    </li>
                    <li className={style.likes}>
                        <Link to="#">
                            <img src={plan} />
                            <p className={style.sidebar_text} >Plan meal</p>
                        </Link>
                    </li>
                    <li className={style.likes}>
                        <Link to="#">
                            <img src={sponsor} />
                            <p className={style.sidebar_text} >Sponsor</p>
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Sidebar