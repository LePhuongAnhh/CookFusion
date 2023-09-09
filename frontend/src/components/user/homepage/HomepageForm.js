import style from './HomepageForm.module.css'
import { Link } from 'react-router-dom'
import Navigation from '../header/Navigation'
import Sidebar from '../header/Sidebar'
import RecipeForm from '../header/RecipeForm'
import FooterForm from '../footer/FooterForm'
import Button_save from '../header/Button_save'
import img_article from "../../../image/background.jpg"
import stars from "../../../image/star1.png"
import anh from "../../../image/anho.webp"
import Anh2 from "../../../image/anh2.webp"
import Anh3 from "../../../image/anh3.webp"
import TopRecipe from "../../../image/toprecipe.webp"
import Meal from "../../../image/mal.webp"


const HomepageForm = () => {
    var data = [
        {
            img: "img_article",
            country: "Vietnam",
            place: "Ha Noi",
            describe: "Hello, my name is Phuong, I'm nineteen years old",
        },
        {
            img: "img_article",
            country: "Vietnam",
            place: "Ha Noi",
            describe: "Hello, my name is Phuong, I'm nineteen years old",
        },
        {
            img: "img_article",
            country: "Vietnam",
            place: "Ha Noi",
            describe: "Hello, my name is Phuong, I'm nineteen years old",
        },
        {
            img: "img_article",
            country: "Vietnam",
            place: "Ha Noi",
            describe: "Hello, my name is Phuong, I'm nineteen years old",
        },
        {
            img: "img_article",
            country: "Vietnam",
            place: "Ha Noi",
            describe: "Hello, my name is Phuong, I'm nineteen years old",
        },
    ];

    return (
        <body>
            <div>
                <Navigation />
                <div className={style.home_body}>
                    {/* <div className={style.home_left}>
                        <Sidebar />
                    </div> */}

                    <Button_save />
                    <div className={style.home_container}>
                        <section className={style.home_gird}>
                            {/* Slide  */}
                            <div className={style.home_slideshow}>
                                <div className={style.slide_container}>
                                    <div className={style.slide_content}>
                                        <div className={style.slide_introduce}></div>
                                        <div className={style.slide_thumbnail_list}>
                                            <div className={style.wrapper}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WHAT'S NEW */}

                            <div className={style.home_wrapper}>
                                <div className={style.home_article}>
                                    <div className={style.feature_article}>
                                        <div className={style.small_lists_article}>
                                            <h3 className={style.article_news}>What's news</h3>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={img_article} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={img_article} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={img_article} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                        </div>

                                        <Link to="#" className={style.article_hidden_description}>
                                            <div className={style.img_wrapper}>
                                                <img className={style.feature_article_image} width="1300" src={img_article} />
                                            </div>
                                            <div className={style.article_blurb}>
                                                <p className={style.category_article}>Recipe roundup</p>
                                                <h2 className={style.article_title}>Thready, Set, Go! A Saffron Guide</h2>
                                                <p></p>
                                            </div>
                                        </Link>

                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>

                            {/* WHAT WE'RE CRAVING */}
                            <div className={style.news_container} >
                                <div className={style.news_name}>
                                    <h2>WHAT WE'RE CRAVING</h2>

                                    <div className={style.news_gird}>
                                        <Link to="#" className={style.news_element}>
                                            <div>
                                                <div className={style.news_card_img}>
                                                    <figure className={style.news_img_background}>
                                                        <img src={anh} />
                                                    </figure>

                                                </div>
                                                <div className={style.news_card_bottom}>
                                                    <span className={style.news_cate}>Fresh everyday</span>
                                                    <h3 className={style.news_title}>Best Bread</h3>
                                                </div>
                                                <div className={style.news_view}>
                                                    <Link to="#" className={style.news_detail}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.news_gird}>
                                        <Link to="#" className={style.news_element1}>
                                            <div>
                                                <div className={style.news_card_img}>
                                                    <figure className={style.news_img_background}>
                                                        <img src={Anh2} />
                                                    </figure>

                                                </div>
                                                <div className={style.news_card_bottom}>
                                                    <span className={style.news_cate}>Fresh everyday</span>
                                                    <h3 className={style.news_title}>Best Bread</h3>
                                                </div>
                                                <div className={style.news_view}>
                                                    <Link to="#" className={style.news_detail}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.news_gird}>
                                        <Link to="#" className={style.news_element2}>
                                            <div>
                                                <div className={style.news_card_img}>
                                                    <figure className={style.news_img_background}>
                                                        <img src={Anh3} />
                                                    </figure>

                                                </div>
                                                <div className={style.news_card_bottom}>
                                                    <span className={style.news_cate}>Fresh everyday</span>
                                                    <h3 className={style.news_title}>Best Bread</h3>
                                                </div>
                                                <div className={style.news_view}>
                                                    <Link to="#" className={style.news_detail}>Detail</Link>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                </div>
                            </div>

                            {/* EXPLORE MORE */}
                            <div className={style.cate_contain}>
                                <div className={style.cate_gird}>
                                    <h2>Explore more</h2>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={img_article} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={img_article} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={img_article} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>Vegetable</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={img_article} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>Vegetable</Link>
                                    </div>
                                </div>
                            </div>
                            <div className={style.line}></div>
                            {/* TOP RECIPE  */}
                            <div className={style.contain_fullwidth}>
                                <div className={style.contain_fullwidth_card}>
                                    <div className={style.text_image}>
                                        <img src={TopRecipe} />
                                    </div>
                                    <div className={style.text_bottom}>
                                        <h2> Top recipe</h2>
                                        <Link to="#" className={style.btn_view}>
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>



                            {/* NGUYEN LIEU  */}
                            <div className={style.ingredients}>
                                <div className={style.ingredients_gird}>
                                    <h2>ingredients</h2>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal vwgfjshv$ veghrtable</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={style.ingredients_card}>
                                        <Link to="#" className={style.ingredients_img}>
                                            <img src={Meal} />
                                            <div className={style.ingredients_img_card}>
                                                <Link to="#" className={style.ingredients_link}>Fresh Meal</Link>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>




                            {/* TRENDING NOW */}
                            <div className={style.content_show}>
                                <div className={style.box}>
                                    <div className={style.recipe_card}>
                                        <h2>trending now</h2>
                                        <RecipeForm />
                                    </div>
                                </div>
                            </div>
                            {/* DON'T MISS  */}
                            <div className={style.news_container} >
                                <div className={style.news_name}>
                                    <h2>Don't miss</h2>
                                    <div className={style.news_content}>
                                        <Link to="#" className={style.news_gird}>
                                            <img src={img_article} />
                                            <div className={style.news_overlay}>
                                                <div className={style.news_cate}>Collection</div>
                                                <div className={style.news_title}>50 lunch ideas for kids</div>
                                            </div>
                                        </Link>
                                        <Link className={style.news_gird}>
                                            <img src={img_article} />
                                            <div className={style.news_overlay}>
                                                <div className={style.news_cate}>Collection</div>
                                                <div className={style.news_title}>50 lunch ideas for kids</div>
                                            </div>
                                        </Link>
                                        <Link className={style.news_gird}>
                                            <img src={img_article} />
                                            <div className={style.news_overlay}>
                                                <div className={style.news_cate}>Collection</div>
                                                <div className={style.news_title}>50 lunch ideas for kids</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* MORE IDEAS */}
                            <div className={style.content_show}>
                                <div className={style.box}>
                                    <div className={style.recipe_card}>
                                        <h2>MORE IDEAS</h2>
                                        <RecipeForm />
                                        <RecipeForm />
                                        <RecipeForm />
                                        <RecipeForm />
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                </div>
                {/* <FooterForm /> */}
            </div>
        </body>
    )
}

export default HomepageForm

