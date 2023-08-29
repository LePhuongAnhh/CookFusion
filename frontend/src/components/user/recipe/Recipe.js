import style from './Recipe.module.css'
import { Link } from 'react-router-dom'
import Navigation from '../header/Navigation'
import Sidebar from '../header/Sidebar'
import FooterForm from '../footer/FooterForm'
import Button_save from '../header/Button_save'
import img_article from "../../../image/background.jpg"
import stars from "../../../image/star1.png"

const Recipe = () => {
    return (
        <div>
            <Navigation />
            <div className={style.browse}>
                <Sidebar />
                {/* <Button_save /> */}
                <div className={style.content_wrapper}>
                    {/* <div className={style.container}>
                        <div className={style.contain}>
                            <img />
                        </div>
                        <div className={style.content}>
                            <div className={style.introduction}>
                                <h2>About us</h2>
                                <p>hello everyone, well come to my web site</p>
                            </div>
                        </div>
                        <img/>
                    </div> */}

                    {/* nav  */}

                    <div className={style.browse_nav}>
                        <div className={style.header_text_scroll}>
                            <Link to="#" className={style.cate_recipe}>Home</Link>
                            <Link to="#" className={style.cate_recipe}>trang mieng</Link>
                            <Link to="#" className={style.cate_recipe}>khai vi</Link>
                            <Link to="#" className={style.cate_recipe}>An kieng</Link>
                            <Link to="#" className={style.cate_recipe}>giau dam</Link>
                            <Link to="#" className={style.cate_recipe}>mon an</Link>
                            <Link to="#" className={style.cate_recipe}>mon ngon</Link>
                        </div>
                    </div>

                    {/* introduction */}

                    {/* <div className={style.logo}>
                        <h3>Perfectman.</h3>
                    </div> */}
                </div>

                <div className={style.intro}>
                    <h3>Introduction of the recipe</h3>
                </div>

                {/* ben duwoi  */}
                <div className={style.gird}>
                    {/* <div className={style.collage}> */}
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
                {/* </div> */}

                <div></div>
            </div>
        </div>
    )
}

export default Recipe