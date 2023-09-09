import style from './Recipe.module.css'
import { Link } from 'react-router-dom'
import Navigation from '../header/Navigation'
import Sidebar from '../header/Sidebar'
import FooterForm from '../footer/FooterForm'
import Button_save from '../header/Button_save'
import RecipeForm from '../header/RecipeForm'
import img_article from "../../../image/background.jpg"
import meal from "../../../image/meal.jpg"
// import anh1 from "../../../image/anh1.jpg"
import vegetable from "../../../image/vegetable.jpg"
import avt from "../../../image/avt.jpg"

const Recipe = () => {
    return (
        <div>
            <Navigation />
            <div className={style.browse}>
                <div className={style.left}>
                    <Sidebar />
                </div>
                {/* <Sidebar /> */}
                <Button_save />
                <div className={style.right}>
                    <div className={style.content_wrapper}>
                        {/* nav  */}

                        <div className={style.browse_nav}>
                            <div className={style.header_text_scroll}>
                                <Link to="#" className={style.cate_recipe}>trang mieng</Link>
                                <Link to="#" className={style.cate_recipe}>khai vi</Link>
                                <Link to="#" className={style.cate_recipe}>An kieng</Link>
                                <Link to="#" className={style.cate_recipe}>giau dam</Link>
                                <Link to="#" className={style.cate_recipe}>mon an</Link>
                                <Link to="#" className={style.cate_recipe}>mon ngon</Link>
                            </div>
                        </div>

                        {/* introduction */}
                    </div>
                    <div className={style.intro}>
                        <h3>Introduction of the recipe</h3>
                    </div>

                    {/* ben duwoi  */}
                    <div className={style.gird}>
                        <div className={style.gallery_left}>
                            <div className={style.g_card}>
                                <Link to="#" className={style.figure}>
                                    <img src={img_article} />
                                    <div className={style.figcaption}>
                                        <h3>Hello</h3>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.g_card}>
                                <Link to="#" className={style.figure}>
                                    <img src={img_article} />
                                    <figcaption className={style.figcaption}>
                                        <h3>Hello</h3>
                                    </figcaption>
                                </Link>
                            </div>
                        </div>
                        <div className={style.gallery_right}>
                            <div className={style.g_card_right}>
                                <Link to="#" className={style.figure_right}>
                                    <img src={img_article} />
                                    <figcaption className={style.figcaption}>
                                        <h3>Hello</h3>
                                    </figcaption>
                                </Link>
                            </div>
                        </div>
                    </div>


                    {/* Introduction of Recipe */}
                    <div className={style.summary}>
                        <div className={style.summary_contain}>
                            <span>
                                <h2 className={style.summary_title}>Introduction of Recipe</h2>
                                <p>
                                    People cook for many reasons. At Yummly, we do it for the love of food, and we want to help you and other home cooks discover and demystify dishes that pique your culinary curiosities -- whatever the driving force behind cooking is for you. Whether your economic strategy is motivated by gastronomic delights or your dietary restrictions are guiding your kitchen creations,  there are thousands of recipes to explore.
                                </p>
                                <p className={style.summary_add}>We've broken down the elements of cooking to make it simple…
                                </p>
                            </span>
                            {/* <span className={style.summary_readless}>Read less</span> */}
                        </div>
                    </div>

                    {/* Popular Ingredients */}
                    <div className={style.cate_contain}>
                        <div className={style.cate_gird}>
                            <h2>Explore more</h2>
                            <div className={style.cate_img_block}>
                                <Link to="#" className={style.cate_img}>
                                    <img src={img_article} />
                                    <img src={meal} />
                                    {/* <img src={anh1} /> */}
                                    <img src={vegetable} />
                                </Link>
                                <Link to="#" className={style.cate_title}>Vegetable</Link>
                            </div>
                            <div className={style.cate_img_block}>
                                <Link to="#" className={style.cate_img}>
                                    <img src={img_article} />
                                    <img src={meal} />
                                    {/* <img src={anh1} /> */}
                                    <img src={vegetable} />
                                </Link>
                                <Link to="#" className={style.cate_title}>Vegetable</Link>
                            </div>
                            <div className={style.cate_img_block}>
                                <Link to="#" className={style.cate_img}>
                                    <img src={img_article} />
                                    <img src={meal} />
                                    {/* <img src={anh1} /> */}
                                    <img src={vegetable} />
                                </Link>
                                <Link to="#" className={style.cate_title}>Vegetable</Link>
                            </div>
                            <div className={style.cate_img_block}>
                                <Link to="#" className={style.cate_img}>
                                    <img src={img_article} />
                                    <img src={meal} />
                                    {/* <img src={anh1} /> */}
                                    <img src={vegetable} />
                                </Link>
                                <Link to="#" className={style.cate_title}>Vegetable</Link>
                            </div>
                            <div className={style.cate_img_block}>
                                <Link to="#" className={style.cate_img}>
                                    <img src={img_article} />
                                    <img src={meal} />
                                    {/* <img src={anh1} /> */}
                                    <img src={vegetable} />
                                </Link>
                                <Link to="#" className={style.cate_title}>Vegetable</Link>
                            </div>
                            <div className={style.cate_img_block}>
                                <Link to="#" className={style.cate_img}>
                                    <img src={img_article} />
                                    <img src={meal} />
                                    {/* <img src={anh1} /> */}
                                    <img src={vegetable} />
                                </Link>
                                <Link to="#" className={style.cate_title}>Vegetable</Link>
                            </div>
                        </div>
                    </div>


                    <div className={style.content_show}>
                        <div className={style.box}>
                            <div className={style.recipe_card}>
                                <h2>New recipe</h2>
                                <RecipeForm />
                            </div>
                        </div>
                    </div>


                    {/* TOP ACCOUNT  */}
                    <div className={style.top_account}>
                        <h2>top ACCOUNT</h2>
                        <div className={style.account_contain}>
                            <div className={style.account_card}>
                                <div className={style.account_card_inner}>
                                    <div className={style.account_card_front}>
                                        <img src={img_article} />
                                    </div>
                                    <div className={style.account_card_back}>
                                        <img src={avt} />
                                        <h3>Well come to my world</h3>
                                        <h1>Rate 5 stars</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={style.account_card}>
                                <div className={style.account_card_inner}>
                                    <div className={style.account_card_front}>
                                        <img src={img_article} />
                                    </div>
                                    <div className={style.account_card_back}>
                                        <img src={avt} />
                                        <h3>Well come to my world</h3>
                                        <h1>Rate 5 stars</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={style.account_card}>
                                <div className={style.account_card_inner}>
                                    <div className={style.account_card_front}>
                                        <img src={img_article} />
                                    </div>
                                    <div className={style.account_card_back}>
                                        <img src={avt} />
                                        <h3>Well come to my world</h3>
                                        <h1>Rate 5 stars</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe