import style from './HomepageForm.module.css'
import { Link } from 'react-router-dom'
import Navigation from '../header/Navigation'
import Sidebar from '../header/Sidebar'
import RecipeForm from '../header/RecipeForm'
import FooterForm from '../footer/FooterForm'
import Button_save from '../header/Button_save'
import Background_slide from "../../../image/background_slide.webp"
import Background_slide1 from "../../../image/background_slide2.webp"

import Background from '../../../image/background1.webp'
import img_article from "../../../image/background.jpg"
import article from "../../../image/article.webp"
import article2 from "../../../image/article2.webp"
import article3 from "../../../image/article3.webp"
import Top from "../../../image/topraucu.webp"
import Top2 from "../../../image/top2.webp"
import Top3 from "../../../image/top3.webp"
import Top4 from "../../../image/top4.webp"
import anh from "../../../image/anho.webp"
import Anh2 from "../../../image/anh2.webp"
import Anh3 from "../../../image/anh3.webp"
import t1 from "../../../image/1.webp"
import t2 from "../../../image/2.webp"
import t3 from "../../../image/3.webp"
import t4 from "../../../image/4.webp"
import TopRecipe from "../../../image/toprecipe.webp"
import Meal from "../../../image/mal.webp"


const HomepageForm = () => {

    return (
        <body>
            <div>
                <Navigation />
                <div className={style.home_body}>
                    <Button_save />
                    <div className={style.home_container}>
                        <section className={style.home_gird}>
                            {/* Slide  */}
                            {/* <div className={style.home_slideshow}>
                                <div className={style.slide_container}>
                                    <div className={style.slide_content}> */}
                            <div className={style.home_slideshow}>
                                <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src={Background_slide} class="d-block w-100" />
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>First slide label</h5>
                                                <p>Some representative placeholder content for the first slide.</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="..." class="d-block w-100" alt="..." />
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>Second slide label</h5>
                                                <p>Some representative placeholder content for the second slide.</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="..." class="d-block w-100" alt="..." />
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>Third slide label</h5>
                                                <p>Some representative placeholder content for the third slide.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>


                            {/* TOP RECIPE  */}
                            <div className={style.recipe_contain}>
                                <div className={style.recipe_contain_box}>
                                    <div className={style.recipe_card}>
                                        <ul className={style.img_carousel}>
                                            <li className={style.img_carousel_item}>
                                                <div className={style.recipe_card_info}>
                                                    <div className={style.card_in}>
                                                        <Link className={style.card_} to="#">
                                                            <div className={style.card_box_in}>
                                                                <div className={style.recipe_card_img}>
                                                                    <img src={t1} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
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
                                                                    <img src={t2} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
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
                                                                    <img src={t3} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
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
                                                                    <img src={t4} />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className={style.card_info_wrapper}>
                                                            <div className={style.card_name}>
                                                                <Link className={style.card_title} to="#">Asian Recipe</Link>
                                                                <span className={style.card_source}>
                                                                    <Link className={style.card_source_link} to="#">VietNam</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
                                                    <img src={article} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={article2} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                            <Link to="#" className={style.small_feature_article}>
                                                <div className={style.img_wrapper}>
                                                    <img src={article3} />
                                                </div>
                                                <div className={style.small_article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h3 className={style.article_title}>15 Ways to Satisfy a Chocolate Craving in 15 Minutes</h3>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className={style.article_left}>
                                            <Link to="#" className={style.article_hidden_description}>
                                                <div className={style.img_wrapper}>
                                                    <img className={style.feature_article_image} src={Background} />
                                                </div>
                                                <div className={style.article_blurb}>
                                                    <p className={style.category_article}>Recipe roundup</p>
                                                    <h2 className={style.article_title}>Thready, Set, Go! A Saffron Guide</h2>
                                                    <p></p>
                                                </div>
                                            </Link>
                                        </div>



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
                                            <img src={Top} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={Top2} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>INTERNATIONAL EATS</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={Top3} />
                                        </Link>
                                        <Link to="#" className={style.cate_title}>Vegetable</Link>
                                    </div>
                                    <div className={style.cate_img_block}>
                                        <Link to="#" className={style.cate_img}>
                                            <img src={Top4} />
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
                            {/* <div className={style.top_like}>
                                <div className={style.top_like_contain}>
                                    <div>

                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div> */}
                            {/* <div className={style.news_container} >
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
                            </div> */}

                            <div className={style.advertisement}>
                                <div className={style.advertisement_container}>
                                    <div className={style.advertisement_gird}>
                                        <div className={style.advertisement_carousel}>
                                            {/* <img src={Background_slide} /> */}
                                        </div>
                                        <div className={style.advertisement_box}>
                                            <span>Introduction</span>
                                            <h3 className={style.name_h1}> Quang cao </h3>
                                            <div className={style.show_more}>
                                                <Link to="#" className={style.btn_show_more}> Show more</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </section>
                    </div>
                </div>
                {/* <FooterForm />   */}
            </div>
        </body>
    )
}

export default HomepageForm

