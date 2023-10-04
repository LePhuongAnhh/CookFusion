import style from "./DetailRecipe.module.css"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navigation from "../header/Navigation";

import img_article from "../../../image/background.jpg"
import Avt from "../../../image/avt.jpg"

function DetailRecipe() {

    const scrollingImage = document.querySelector('.detail_left_gird');

    if (scrollingImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const targetPosition = 500;

            if (scrollPosition >= targetPosition) {
                scrollingImage.style.position = 'absolute';
                scrollingImage.style.top = targetPosition + 'px';
            } else {
                scrollingImage.style.position = 'fixed';
                scrollingImage.style.top = '50%';
            }
        });
    }







    return (
        <>
            <div className={style.detail_recipe}>
                <div className={style.header}>
                    <Navigation />
                </div>
                <div className={style.home}>
                    <div className={style.top}>
                        <div className={style.breadcrumb_container}>
                            <nav className={style.breadcrumb}>
                                <span className={style.breadcrumb_link}>
                                    <Link to="/homepage">Home</Link>
                                </span>
                                <span className={style.breadcrumb_separator}>/</span>
                                <span className={style.breadcrumb_link}>
                                    <Link to="#" title>Recipe</Link>
                                </span>
                                <span className={style.breadcrumb_separator}>/</span>
                                <span className={style.breadcrumb_current}>Ten cong thuc</span>
                            </nav>
                        </div>
                    </div>
                    {/* BODY  */}
                    <div className={style.detail_content}>
                        <div className={style.detail_container}>
                            <div className={style.detail_right}>
                                <div className={style.header_right}>
                                    <div className={style.header_right_text}>
                                        <div className={style.gird_text}>
                                            <h1 className={style.title_recipe}>Cheesy Broccoli Stuffed Chicken (low-carb, Keto)</h1>
                                            <span className={style.atribution}>
                                                <Link to="" className={style.source_link}>ABCD</Link>
                                            </span>
                                            <Link to="#" className={style.recipe_rating}>
                                                <span class="bi bi-star-fill"></span>
                                                <span class="bi bi-star-fill"></span>
                                                <span class="bi bi-star-fill"></span>
                                                <span class="bi bi-star-fill"></span>
                                                <span class="bi bi-star-half"></span>
                                                <span className={style.count_rating}>(123)</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={style.description}>
                                        <div className={style.review_content}>
                                            <span className={style.description_sp}>Description</span>: "It tasted great and was easy to make"
                                        </div>
                                    </div>
                                    <div className={style.count_material}>
                                        <div className={style.ingredient}>
                                            <span className={style.value}>13</span>
                                            <span className={style.name_value}>Ingredients</span>
                                        </div>
                                        <div className={style.minutes}>
                                            <span className={style.value}>45</span>
                                            <span className={style.name_value}>Minutes</span>
                                        </div>
                                        <div className={style.calories}>
                                            <span className={style.value}>100</span>
                                            <span className={style.name_value}>Calories</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.line_right}><hr /></div>
                            </div>
                            <div className={style.detail_left}>
                                <div className={style.detail_left_gird}>
                                    <img src={img_article} />
                                </div>
                            </div>
                        </div>
                        <div className={style.bottom_recipe}>
                            <div className={style.recipe_ingredient_wrapper}>
                                <div className={style.ingredient_header}>
                                    <h3 className={style.ingrs_header_title}>Ingredients</h3>
                                    <div className={style.flex_expand}></div>
                                    <div className={style.unit_serving}>
                                        <div className={style.serving}>
                                            <span className={style.count_serving}>4 SERVING</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.shopping_list_ingrs}>
                                    <ul className={style.list_ingrs}>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>4 </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>Chicken breasts</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>Italian seasoning</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 tsp.  </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>paprika</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1/2 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>garlic powder</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>salt</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1/2 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>black pepper</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 Tbsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>olive oil</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span> 2 cups </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>broccoli florets</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1/4 cup  </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>bell pepper</span>
                                            </li>
                                        </li>
                                    </ul>
                                    <ul className={style.list_ingrs}>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>4 </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>Chicken breasts</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>Italian seasoning</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 tsp.  </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>paprika</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1/2 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>garlic powder</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>salt</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1/2 tsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>black pepper</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1 Tbsp. </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>olive oil</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span> 2 cups </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>broccoli florets</span>
                                            </li>
                                        </li>
                                        <li className={style.show_ingrs}>
                                            <div className={style.type_add}>
                                                <i class="bi bi-plus-circle"></i>
                                            </div>
                                            <li className={style.ingredient_line}>
                                                <span className={style.amount_ingrs}>
                                                    <span>1/4 cup  </span> &nbsp;
                                                </span>
                                                <span className={style.name_ingrs}>bell pepper</span>
                                            </li>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className={style.save_collection}>
                            <div className={style.save_btn}>
                                <span className={style.icon_save}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                    </svg>
                                </span>
                                <span className={style.save}>Save this recipe</span>
                            </div>
                            <div className={style.add_planmeal}>
                                <span className={style.icon_save}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flower2" viewBox="0 0 16 16">
                                        <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4zm3-12c0 .073-.01.155-.03.247-.544.241-1.091.638-1.598 1.084A2.987 2.987 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1.117 1.117 0 0 1 5 4a3 3 0 0 1 6 0zm-.812 6.052A2.99 2.99 0 0 0 11 8a2.99 2.99 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a6.833 6.833 0 0 1-.647-.487zm-3.56.617a3.001 3.001 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084.02.091.03.174.03.247a3 3 0 1 1-6 0c0-.073.01-.155.03-.247.544-.242 1.091-.638 1.598-1.084zm-.816-4.721A2.99 2.99 0 0 0 5 8c0 .794.308 1.516.812 2.052a6.83 6.83 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                    </svg>
                                </span>
                                <span className={style.save}>Add to Meal Plan</span>
                            </div>
                        </div>
                        <div className={style.nutrition_wrapper}>
                            <h3 className={style.nutrition_title}>Nutrition</h3>
                            <p className={style.nutrition_info}>Full nutritional details of the dish</p>
                            <div>
                                <div className={style.recipe_nutrition}>
                                    <div className={style.nutrition_total}>
                                        <span className={style.value_nutrition}>500</span>
                                        <span className={style.name_nutrition}>Calories</span>
                                    </div>
                                    <div className={style.nutrition_value}>
                                        <span className={style.value_nutrition}>2.0</span>
                                        <span className={style.name_nutrition}>sodium</span>
                                    </div>
                                    <div className={style.nutrition_value1}>
                                        <span className={style.value_nutrition}>4.6</span>
                                        <span className={style.name_nutrition}>fat</span>
                                    </div>
                                    <div className={style.nutrition_value2}>
                                        <span className={style.value_nutrition}>3.5</span>
                                        <span className={style.name_nutrition}>carbs</span>
                                    </div>
                                    <div className={style.nutrition_value3}>
                                        <span className={style.value_nutrition}>0.66</span>
                                        <span className={style.name_nutrition}>fiber</span>
                                    </div>
                                    <div className={style.nutrition_value4}>
                                        <span className={style.value_nutrition}>34</span>
                                        <span className={style.name_nutrition}>protein</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={style.review_wrapper}>
                            <h3 className={style.review_h3}>Reviews
                                <span className={style.count_review}>(85)</span>
                            </h3>
                            <div className={style.rating_average}>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-fill"></span>
                                <span class="bi bi-star-half"></span>
                            </div>
                            <div className={style.write_reviews}>
                                <img src={Avt} />
                                <div className={style.write_content}>
                                    <div className={style.name_account}>DiamondDogFaith</div>
                                    {/* rating  */}
                                    <div className={style.rating}>
                                        <input type="radio" name="rate" id="rate-5" />
                                        <label className="bi bi-star-fill" for="rate-5"></label>
                                        <input type="radio" name="rate" id="rate-4" />
                                        <label className="bi bi-star-fill" for="rate-4"></label>
                                        <input type="radio" name="rate" id="rate-3" />
                                        <label className="bi bi-star-fill" for="rate-3"></label>
                                        <input type="radio" name="rate" id="rate-2" />
                                        <label className="bi bi-star-fill" for="rate-2"></label>
                                        <input type="radio" name="rate" id="rate-1" />
                                        <label className="bi bi-star-fill" for="rate-1"></label>
                                        <form action="#">
                                            <header></header>
                                            <div className={style.text_area}>
                                                <textarea cols="30" placeholder="Write your comment or review here..."></textarea>
                                            </div>
                                            <div className={style.bnt_post}>
                                                <button className={style.post}>Submit</button>
                                                <button className={style.cancle}>Cancle</button>
                                            </div>

                                        </form>
                                    </div>
                                    <textarea row="6" className={style.review_text} placeholder="Write your comment or review here..." aria-label="Write your comment or review here"></textarea>
                                </div>
                            </div>

                            <div className={style.read_review}>
                                <div className={style.avt_read}>
                                    <Link to="#" className={style.avt_read_review}>
                                        <img src={Avt} />
                                    </Link>
                                </div>
                                <div className={style.review_content_cmt}>
                                    <div className={style.review_name}>
                                        <Link to="#">Abigail Gilchrist </Link>
                                        <span className={style.time_review}>2 hours</span>
                                    </div>
                                    <div className={style.review_rating}>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <div className={style.review_action}>
                                            <span className={style.like_icon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={style.show_review}>
                                        I tweaked this meal a little I added Knorr Rice Sides Cheddar Broccoli Rice 2 bags, 1 bag of x-small shrimp, bag of chopped onions, than for seasoning I only used three things Peppercorn, Onion Powered, Soy Sauce, and than Fiesta Cheese and my brother loved it
                                    </div>
                                    <div className={style.emotion_review}>
                                        <span className={style.like_icon} title="Like this review">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                            </svg>
                                        </span>
                                        <span className={style.count_like_cmt}>1</span>
                                        <span className={style.line_action}></span>
                                        <span className={style.spam_review} title="Report">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={style.read_review}>
                                <div className={style.avt_read}>
                                    <Link to="#" className={style.avt_read_review}>
                                        <img src={Avt} />
                                    </Link>
                                </div>
                                <div className={style.review_content_cmt}>
                                    <div className={style.review_name}>
                                        <Link to="#">Abigail Gilchrist </Link>
                                        <span className={style.time_review}>2 days ago</span>
                                    </div>
                                    <div className={style.review_rating}>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <span class="bi bi-star-fill"></span>
                                        <div className={style.review_action}>
                                            <span className={style.like_icon} title="Like this review">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={style.show_review}>
                                        Great! Sesame seeds aren’t necessary
                                    </div>
                                    <div className={style.emotion_review}>
                                        <span className={style.like_icon} title="Like this review">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                            </svg>
                                        </span>
                                        <span className={style.count_like_cmt}></span>
                                        <span className={style.line_action}></span>
                                        <span className={style.spam_review} title="Report">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailRecipe;