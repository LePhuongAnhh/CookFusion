import { Link } from 'react-router-dom'
import style from './RecipeForm.module.css'
import img_article from "../../../image/background.jpg"
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
                                        <img src={img_article} />
                                        <div className={style.title_box}></div>
                                        <Link to="#">
                                            <div className={style.card_ingredients}>Dday laf cho dder nguyen lieu cho thuwcs anw nghovn, vsjbvj</div>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe cog hoa xa hoi chur ngh</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                    </Link>
                                </div>
                                <div className={style.card_save}>
                                    <div className={style.card_box}>
                                        <div className={style.save_recipe}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                            </svg>
                                        </div>
                                        <div className={style.count_recipe}>
                                            2k
                                        </div>
                                    </div>
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
                                        <img src={img_article} />
                                        <div className={style.title_box}></div>
                                        <Link to="#">
                                            <div className={style.card_ingredients}>Dday laf cho dder nguyen lieu cho thuwcs anw nghovn, vsjbvj</div>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe cog hoa xa hoi chur ngh</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                    </Link>
                                </div>
                                <div className={style.card_save}>
                                    <div className={style.card_box}>
                                        <div className={style.save_recipe}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                            </svg>
                                        </div>
                                        <div className={style.count_recipe}>
                                            2k
                                        </div>


                                    </div>

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
                                        <img src={img_article} />
                                        <div className={style.title_box}></div>
                                        <Link to="#">
                                            <div className={style.card_ingredients}>Dday laf cho dder nguyen lieu cho thuwcs anw nghovn, vsjbvj</div>
                                        </Link>
                                    </div>
                                </div>
                            </Link>

                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe cog hoa xa hoi chur ngh</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                    </Link>
                                </div>
                                <div className={style.card_save}>
                                    <div className={style.card_box}>
                                        <div className={style.save_recipe}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                            </svg>
                                        </div>
                                        <div className={style.count_recipe}>
                                            2k
                                        </div>


                                    </div>

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
                                        <img src={img_article} />
                                        <div className={style.title_box}></div>
                                        <Link to="#">
                                            <div className={style.card_ingredients}>Dday laf cho dder nguyen lieu cho thuwcs anw nghovn, vsjbvj</div>
                                        </Link>
                                    </div>
                                </div>
                            </Link>

                            <div className={style.card_info_wrapper}>
                                <div className={style.card_name}>
                                    <Link className={style.card_title} to="#">Asian Recipe cog hoa xa hoi chur ngh</Link>
                                    <span className={style.card_source}>
                                        <Link className={style.card_source_link} to="#">VietNam</Link>
                                    </span>
                                    <Link to="#" className={style.review_stars}>
                                        <span className={style.icon_stars}>
                                            <img src={stars} />
                                            <img src={stars} />
                                            <img src={stars} />
                                        </span>
                                    </Link>
                                </div>
                                <div className={style.card_save}>
                                    <div className={style.card_box}>
                                        <div className={style.save_recipe}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                            </svg>
                                        </div>
                                        <div className={style.count_recipe}>
                                            2k
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default RecipeForm