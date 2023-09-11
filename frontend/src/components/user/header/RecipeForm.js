import { Link } from 'react-router-dom'
import style from './RecipeForm.module.css'
import Recipe from "../../../image/recipe.webp"
import stars from "../../../image/star1.png"

const RecipeForm = () => {
    return (
        <>
            <ul className={style.img_carousel}>
                <li className={style.img_carousel_item}>
                    <div className={style.recipe_card_info}>
                        <div className={style.card_in}>
                            <Link className={style.card_} to="#">
                                <div className={style.card_box_in}>
                                    <div className={style.recipe_card_img}>
                                        <img src={Recipe} />
                                    </div>
                                </div>
                            </Link>
                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                        <span className={style.count_rate}> (134)</span>
                                    </Link>
                                </div>
            
                               
                            </div>
                            <div className={style.cook}>
                                    <button> Cook now

                                    </button>
                                </div>
                        </div>
                    </div>
                </li>
                <li className={style.img_carousel_item}>
                    <div className={style.recipe_card_info}>
                        <div className={style.card_in}>
                            <Link className={style.card_} to="#">
                                <div className={style.card_box_in}>
                                    <div className={style.recipe_card_img}>
                                        <img src={Recipe} />
                                    </div>
                                </div>
                            </Link>
                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                        <span className={style.count_rate}> (134)</span>
                                    </Link>
                                </div>
            
                               
                            </div>
                            <div className={style.cook}>
                                    <button> Cook now

                                    </button>
                                </div>
                        </div>
                    </div>
                </li>
                <li className={style.img_carousel_item}>
                    <div className={style.recipe_card_info}>
                        <div className={style.card_in}>
                            <Link className={style.card_} to="#">
                                <div className={style.card_box_in}>
                                    <div className={style.recipe_card_img}>
                                        <img src={Recipe} />
                                    </div>
                                </div>
                            </Link>
                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                        <span className={style.count_rate}> (134)</span>
                                    </Link>
                                </div>
            
                               
                            </div>
                            <div className={style.cook}>
                                    <button> Cook now

                                    </button>
                                </div>
                        </div>
                    </div>
                </li>
                <li className={style.img_carousel_item}>
                    <div className={style.recipe_card_info}>
                        <div className={style.card_in}>
                            <Link className={style.card_} to="#">
                                <div className={style.card_box_in}>
                                    <div className={style.recipe_card_img}>
                                        <img src={Recipe} />
                                    </div>
                                </div>
                            </Link>
                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                        <span className={style.count_rate}> (134)</span>
                                    </Link>
                                </div>
            
                               
                            </div>
                            <div className={style.cook}>
                                    <button> Cook now

                                    </button>
                                </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default RecipeForm