import styles from "./ShowRecipePlan.module.scss"
import classNames from 'classnames/bind'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { ACCESS_TOKEN } from "~/constants/constants";
const cx = classNames.bind(styles)
const ShowRecipePlan = ({ setShowDetailRecipeModal }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return (
        <div className={cx('modalDeleteIdea')}>
            <div className={cx('modalContentDeleteIdea')}>
                <div>
                    <div className={cx('createIdeaHeader')}>
                        <h1 className={cx('modal_title')}>Cracking Black Pepper, Smoked Salmon and Avocado on Toast</h1>
                        <div className={cx('exit_cmt_modal')} onClick={() => setShowDetailRecipeModal(false)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>
                    <div className={cx('body_modal')}>
                        <div className={cx('recipe_container')}>
                            <div className={cx('top_section')}>
                                <img className={cx('recipe_image')} src={images.minh} />
                                <div className={cx('recipe_info_wrapper')}>
                                    <div className={cx('recipe_time')}>
                                        <div className={cx('time_to_cook')}>
                                            <img src={images.oclock} />
                                            <div className={cx('pre_content')}>
                                                <span className={cx('value_time')}>30 mins</span>
                                            </div>
                                        </div>
                                        <div className={cx('meal_nutri_wrapper')}>
                                            <div className={cx('row_nutri')}>
                                                <div className={cx('nutri_cell')}>
                                                    <span className={cx('title')}>Calories</span>
                                                    <span className={cx('nutri_gram')}>236</span>
                                                </div>
                                                <div className={cx('nutri_cell')}>
                                                    <span className={cx('title')}>Protein</span>
                                                    <span className={cx('nutri_gram_green')}>236</span>
                                                </div>
                                                <div className={cx('nutri_cell')}>
                                                    <span className={cx('title')}>Carbs</span>
                                                    <span className={cx('nutri_gram_orange')}>236</span>
                                                </div>
                                                <div className={cx('nutri_cell')}>
                                                    <span className={cx('title')}>Fat</span>
                                                    <span className={cx('nutri_gram_purple')}>236</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('function_wrapper')}>
                                        <div className={cx('buttons')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                            <div hidden>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                            </div>
                                            <span className={cx('button_text')}>Favorite</span>
                                        </div>
                                        <div className={cx('buttons')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>
                                            <span className={cx('button_text')}>edit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('bottom_section')}>
                                <div className={cx('bottom_card')}>
                                    <h3 className={cx('column_title')}>Ingredients</h3>
                                    <div className={cx('left_column')}>
                                        <div className={cx('scale_tool')}>
                                            <div className={cx('minus')}>-</div>
                                            <div className={cx('quantity')}>Serving</div>
                                            <div className={cx('plus')}>+</div>
                                        </div>
                                        <div className={cx('ingrs')}>
                                            <div className={cx('ingredient_contain')}>
                                                <span className={cx('title')}>Ginger</span>
                                                <div className={cx('measure')}>1/2 Cup</div>
                                            </div>
                                        </div>
                                        <div className={cx('ingrs')}>
                                            <div className={cx('ingredient_contain')}>
                                                <span className={cx('title')}>Ginger</span>
                                                <div className={cx('measure')}>1/2 Cup</div>
                                            </div>
                                        </div>
                                        <div className={cx('ingrs')}>
                                            <div className={cx('ingredient_contain')}>
                                                <span className={cx('title')}>Ginger</span>
                                                <div className={cx('measure')}>1/2 Cup</div>
                                            </div>
                                        </div>
                                        <div className={cx('ingrs')}>
                                            <div className={cx('ingredient_contain')}>
                                                <span className={cx('title')}>Ginger</span>
                                                <div className={cx('measure')}>1/2 Cup</div>
                                            </div>
                                        </div>
                                        <div className={cx('ingrs')}>
                                            <div className={cx('ingredient_contain')}>
                                                <span className={cx('title')}>Ginger</span>
                                                <div className={cx('measure')}>1/2 Cup</div>
                                            </div>
                                        </div>
                                        <div className={cx('ingrs')}>
                                            <div className={cx('ingredient_contain')}>
                                                <span className={cx('title')}>Ginger</span>
                                                <div className={cx('measure')}>1/2 Cup</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={cx('bottom_card')}>
                                    <h3 className={cx('column_title')}>Instructions</h3>
                                    <div className={cx('right_column')}>
                                        <div>
                                            <b>Preparations <br /> </b>
                                            <span>
                                                1. Drain the tofu and press out the moisture using paper towels. Cut into bite-size chunks.
                                            </span>
                                            <br />
                                            <span><br /></span>
                                            <div>
                                                <span>2. Peel/finely chop the garlic and ginger.</span>
                                                <br />
                                                <span><br /></span>
                                            </div>
                                            <div>
                                                <span>3. Core and slice the pepper into 1/2cm strips.</span>
                                                <br />
                                                <span><br /></span>
                                            </div>
                                            <div>
                                                <b>Cooking instructions <br /></b>
                                                <span>
                                                    1. Bring 175ml of lightly salted water to boil.  Add the rice, lower heat, cover with lid and cook for 10 minutes.  Remove from heat and set aside for 10 minutes.  (No peeking, leave the lid on through cooking and resting time).
                                                </span>
                                                <br />
                                                <span><br /></span>
                                            </div>
                                            <div>
                                                <span>2. Place the cashew nuts in a drying frying pan over medium-high heat.  Stir frequently every 15 seconds and cook for about 3 minutes until golden brown. Transfer to a bowl and set aside.</span>
                                                <br />
                                                <span><br /></span>
                                            </div>
                                        </div>
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
export default ShowRecipePlan