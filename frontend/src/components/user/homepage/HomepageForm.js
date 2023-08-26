import style from './HomepageForm.module.css'
import { Link } from 'react-router-dom'
import Navigation from '../header/Navigation'
import Sidebar from '../header/Sidebar'
import FooterForm from '../footer/FooterForm'
import Button_save from '../header/Button_save'
import img_article from "../../../image/background.jpg"


const HomepageForm = () => {
    return (
        <body>
            <div>
                <Navigation />
                <div className={style.home_body}>
                    <Sidebar />
                    <Button_save />
                    <div className={style.home_container}>
                        <section className={style.home_gird}>
                            <div className={style.home_slideshow}>
                                <div className={style.slide_container}>
                                    <div className={style.slide_content}>
                                        <div className={style.slide_introduce}>
                                        </div>
                                        <div className={style.slide_thumbnail_list}>
                                            <div className={style.wrapper}></div>
                                        </div>
                                    </div>

                                    <div className={style.slide_navigation}>
                                        <button className={style.slide_next_button}></button>
                                        <span className={style.slide_line}></span>
                                        <span className={style.slide_ordinal_number}></span>
                                    </div>
                                </div>
                            </div>
                            <script src='./ind.js'></script>
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
                                    {/* <Link to="#" className={style.feature_article2}>
                                        <div className={style.img_wrapper}>
                                            <img className={style.feature_article_image2} width="1352" src={img_article} />
                                        </div>
                                        <div className={style.article_blurb}>
                                            <p className={style.category_article}>Recipe roundup</p>
                                            <h2 className={style.article_title}>Thready, Set, Go! A Saffron Guide</h2>
                                            <p className={style.article_description}>If your kids have some basic kitchen skills, why not let them make dinner?</p>
                                        </div>
                                    </Link> */}

                                    {/* <div className={style.gallery}>
                                        <ul className={style.cards}>
                                            <li><img src={img_article} /></li>
                                            <li><img src={img_article} /></li>
                                            <li><img src={img_article} /></li>
                                            <li><img src={img_article} /></li>
                                            <li><img src={img_article} /></li>
                                            <li><img src={img_article} /></li>
                                            <li><img src={img_article} /></li>
                                            <li><img src={img_article} /></li>
                                        </ul>
                                    </div> */}

                                    <div>
                                    </div>
                                </div>
                                <div className={style.recipe_gird}></div>
                            </div>

                            <div className={style.content_show}>
                                <div className={style.box}>
                                    <img src={img_article} />
                                    <div className={style.title_box}></div>
                                    <div className={style.name}>Name</div>
                                </div>
                                <div className={style.box}>
                                    <img src={img_article} />
                                    <div className={style.title_box}></div>
                                    <div className={style.name}>Name</div>
                                </div>
                                <div className={style.box}>
                                    <img src={img_article} />
                                    <div className={style.title_box}></div>
                                    <div className={style.name}>Name</div>
                                </div>
                                <div className={style.box}>
                                    <img src={img_article} />
                                    <div className={style.title_box}></div>
                                    <div className={style.name}>Name</div>
                                </div>
                            </div>

                            <div className={style.content_article}>
                                <div className={style.recipe_card}>

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

