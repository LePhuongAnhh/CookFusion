import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./PlanMeal.module.scss"
import classNames from 'classnames/bind'
import images from '~/assets/images'
import SaveButton from '~/components/button/SaveBotton';
import { ACCESS_TOKEN, apiUrl } from '~/constants/constants';
import axios from 'axios';

const cx = classNames.bind(styles)
const PlanMeal = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [planPublicData, setPlanPublicData] = useState([]);

    //gọi tất cả plan public 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/mealplan/getall`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setPlanPublicData(response.data.data)
            } catch (error) {
                console.error("Error fetching Meal Plans:", error);
            }
        };
        fetchData();
    }, [accessToken]);
    return (
        <div className={cx('plan_meal')}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('plan_meal_contain')}>
                {/* //header  */}
                <div className={cx('plan_meal_contain')}>
                    <div className={cx('plan_header_wrapper')}>
                        helo
                    </div>
                </div>


                {/* CHOOSE CATE  */}
                <div className={cx('create_auto_plan')}>
                    <div className={cx('plan_left')}>
                        <div className={cx('plan_wrapper')}>
                            <Link to="/autoplan" className={cx('automatic_plan')}>
                                <div className={cx('title_wrapper')}>
                                    <div className={cx('img_plan')}>
                                        <img src={images.auto} />
                                    </div>
                                    <div className={cx('text_wrapper')}>
                                        <span className={cx('title')}>Automatically builds a plan  </span>
                                        <span className={cx('suptitle')}>Recommended</span>
                                    </div>
                                </div>
                                <div className={cx('intr_plan')}>
                                    <span className={cx('intro_text')}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={cx('choose_btn')}>Get Started</span>
                            </Link >
                            {/* <Link to='/manualPlan' className={cx('automatic_plan')}>
                                <div className={cx('title_wrapper')}>
                                    <div className={cx('img_plan')}>
                                        <img src={images.manual} />
                                    </div>
                                    <div className={cx('text_wrapper')}>
                                        <span className={cx('title')}>Make your meals personal  </span>
                                        <span className={cx('suptitle')}>Recommended</span>
                                    </div>
                                </div>
                                <div className={cx('intr_plan')}>
                                    <span className={cx('intro_text')}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={cx('choose_btn1')}>Get Started</span>

                            </Link> */}
                        </div>
                    </div>

                    {/* chuyen den trang ket qua  */}
                    <div className={cx('form-save')}>
                        <div className={cx("form-group")}>
                            <Link className={cx('next-page')} to="/result"> <SaveButton className={cx('btn-next-page')} children="All Meal Plan" /></Link>
                        </div>
                    </div>
                </div>

                {/* INTRO  */}
                <div>
                    <div className={cx('show-result-container')}>
                        <h2 className={cx('title-footer')}>Here’s how it works</h2>
                        <div className={cx('result-content')}>
                            <div className={cx('step-content')}>
                                {/* //strep 1  */}
                                <div className={cx('category-content')}>
                                    <div className={cx('icon-step')}>
                                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity=".3" fill="#f46708"><path d="M4 7a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"></path><path d="M10.051 35.355a1 1 0 0 1 .136-.661l2.767-4.54a1 1 0 0 1 1.6-.145l3.775 4.238a1 1 0 0 1-.088 1.417l-5.853 5.122a1 1 0 0 1-1.648-.611l-.689-4.82z"></path></g><path d="M31.204 24.444V18.72h9.972V45h-6.408V24.444h-3.564z" fill="#f46708"></path></svg>
                                    </div>
                                    <div className={cx('text-step')}>
                                        <h3>Choose a category to create a meal plan</h3>
                                        <p>Do you want to automatically create or create your own meal plan?</p>
                                    </div>
                                </div>
                                {/* step 2  */}
                                <div className={cx('category-content')}>
                                    <div className={cx('icon-step')}>
                                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity=".3" fill-rule="evenodd" clip-rule="evenodd" d="M8.868 41.737S8 38.263 8 35.657c0-2.604 2.605-10.42 15.632-10.42 13.026 0 15.631 7.816 15.631 10.42 0 2.606-.868 6.08-.868 6.08H8.868zm14.764-19.105a7.816 7.816 0 1 0 0-15.632 7.816 7.816 0 0 0 0 15.632z" fill="#3f91fd"></path>
                                            <path d="M28.62 40.068c.817-.648 1.189-.948 1.117-.9 2.352-1.944 4.2-3.54 5.544-4.788 1.368-1.248 2.52-2.556 3.456-3.924.936-1.368 1.404-2.7 1.404-3.996 0-.984-.228-1.752-.684-2.304-.456-.552-1.14-.828-2.052-.828-.912 0-1.632.348-2.16 1.044-.504.672-.756 1.632-.756 2.88h-5.94c.048-2.04.48-3.744 1.296-5.112.84-1.368 1.932-2.376 3.276-3.024 1.368-.648 2.88-.972 4.536-.972 2.856 0 5.004.732 6.444 2.196 1.464 1.464 2.196 3.372 2.196 5.724 0 2.568-.876 4.956-2.628 7.164-1.752 2.184-3.984 4.32-6.696 6.408h9.72v5.004H28.62v-4.572z" fill="#3f91fd">
                                            </path>
                                        </svg>
                                    </div>
                                    <div className={cx('text-step')}>
                                        <h3>Personalize your preferences</h3>
                                        <p>We’ll ask what allergies you have, your favorite foods or foods you avoid to best suit your taste palette</p>
                                    </div>
                                </div>
                                {/* step 3 */}
                                <div className={cx('category-content')}>
                                    <div className={cx('icon-step')}>
                                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity=".3" fill="#f46708">
                                            <path d="M23.69 9.56c.569 1.333-.259 5.81-.259 5.81s-3.879-2.345-4.448-3.678c-.569-1.332 0-2.879 1.293-3.465A2.567 2.567 0 0 1 23.69 9.56z"></path>
                                            <path d="M24.673 15.637h-1.345c0-2.292 1.242-6.184 6.207-6.184v1.386c-4.5 0-4.862 4.372-4.862 4.798z"></path>
                                            <path d="M24 15.37c-3.776-3.944-15-4.104-15 7.198C9 29.71 17.172 40 20.741 40c1.604 0 2.173-1.066 3.156-1.066.93 0 1.24 1.013 3.31 1.013C30.776 40 39 29.764 39 22.567c0-11.301-11.224-11.141-15-7.196z"></path>
                                        </g>
                                            <path d="M27.938 26.136c.096-2.568.936-4.548 2.52-5.94 1.584-1.392 3.732-2.088 6.444-2.088 1.8 0 3.336.312 4.608.936 1.296.624 2.268 1.476 2.916 2.556.672 1.08 1.008 2.292 1.008 3.636 0 1.584-.396 2.88-1.188 3.888-.792.984-1.716 1.656-2.772 2.016v.144c1.368.456 2.448 1.212 3.24 2.268.792 1.056 1.188 2.412 1.188 4.068 0 1.488-.348 2.808-1.044 3.96-.672 1.128-1.668 2.016-2.988 2.664-1.296.648-2.844.972-4.644.972-2.88 0-5.184-.708-6.912-2.124-1.704-1.416-2.604-3.552-2.7-6.408h5.976c.024 1.056.324 1.896.9 2.52.576.6 1.416.9 2.52.9.936 0 1.656-.264 2.16-.792.528-.552.792-1.272.792-2.16 0-1.152-.372-1.98-1.116-2.484-.72-.528-1.884-.792-3.492-.792h-1.152v-5.004h1.152c1.224 0 2.208-.204 2.952-.612.768-.432 1.152-1.188 1.152-2.268 0-.864-.24-1.536-.72-2.016s-1.14-.72-1.98-.72c-.912 0-1.596.276-2.052.828-.432.552-.684 1.236-.756 2.052h-6.012z" fill="#f46708">
                                            </path>
                                        </svg>
                                    </div>
                                    <div className={cx('text-step')}>
                                        <h3>Meal plans generated in seconds</h3>
                                        <p>We’ll whip up a meal plan perfect for you. It’s that simple!</p>
                                    </div>
                                </div>
                                {/* step 4 */}
                                <div className={cx('category-content')}>
                                    <div className={cx('icon-step')}>
                                        <svg width="49" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.082 40.32v-4.968L38.458 19.08h6.876v15.912h2.952v5.328h-2.952V45h-6.156v-4.68H27.082zM39.61 25.848l-6.048 9.144h6.048v-9.144z" fill="#3f91fd"></path>
                                            <g opacity=".3" fill="#3f91fd">
                                                <path d="M23.69 9.56c.569 1.333-.259 5.81-.259 5.81s-3.879-2.345-4.448-3.678c-.569-1.332 0-2.879 1.293-3.465A2.567 2.567 0 0 1 23.69 9.56z"></path>
                                                <path d="M24.673 15.637h-1.345c0-2.292 1.242-6.184 6.207-6.184v1.386c-4.5 0-4.862 4.372-4.862 4.798z"></path>
                                                <path d="M24 15.37c-3.776-3.944-15-4.104-15 7.198C9 29.71 17.172 40 20.741 40c1.604 0 2.173-1.066 3.156-1.066.93 0 1.24 1.013 3.31 1.013C30.776 40 39 29.764 39 22.567c0-11.301-11.224-11.141-15-7.196z"></path>

                                            </g>
                                        </svg>
                                    </div>
                                    <div className={cx('text-step')}>
                                        <h3>The results are relevant to the user</h3>
                                        <p>Users can choose public or private mode for the meal they create!</p>
                                    </div>
                                </div>

                            </div>
                            <div className={cx('img-show')}>
                                <div className={cx('inner-show')}>
                                    <img src={images.backgroundResultPlan} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('future-container')}>
                    <div className={cx('future-intr')}>
                        <h2 className={cx('sub-header')}>Smart and Easy Meal Planner</h2>
                        <p className={cx('sub-title')}>
                            Welcome to a space where the complexity of calorie and macro tracking is a thing of the past! Our core mission is to streamline your health and wellness journey by automating these processes. This empowers you to redirect your time and energy towards what truly matters – relishing your meals and embracing a harmonious and balanced lifestyle.
                        </p>
                    </div>
                    <div className={cx('future-intr')}>
                        <h2 className={cx('sub-header')}>We automatically track calories and macros so you don’t have to!</h2>
                        <p className={cx('sub-title')}>
                            At Ground Food, we understand that everyone is different, and so are their nutritional needs. Our platform is designed to be highly personalized, ensuring that each meal aligns perfectly with your individual requirements. Whether you're following a specific diet, have dietary restrictions due to allergies, or simply have distinct likes and dislikes when it comes to food, we've got you covered.Welcome to our platform, where we've taken the hassle out of tracking calories and macros! Our mission is to simplify your health and wellness journey by automating the process, leaving you with more time to focus on what truly matters – enjoying your food and living a balanced lifestyle.
                        </p>
                    </div>
                </div>

                {/* show public plan meal  */}
                <div className={cx('show-result-plan')}>
                    <p className={cx('sub-header')}>Plan Meal </p>
                    <div className={cx('card-gird')}>
                        <div className={cx('news_container')}>
                            {planPublicData.map((planPublic, index) => (
                                index % 4 === 0 ? (
                                    <ul key={index} className={cx('news_name')}>
                                        {planPublicData.slice(index, index + 4).map((plan, innerIndex) => (
                                            <li key={innerIndex} className={cx('news_gird')}>
                                                <Link to={`/detailPlan/${plan._id}`} className={cx(`news_element`)}>
                                                    <div className={cx('news_card')}>
                                                        <div className={cx('news_card_img')}>
                                                            <div className={cx('news_img_background')}>
                                                                {/* {plan.detailDay && plan.detailDay.map((detailDay) => (
                                                                    detailDay.meals && detailDay.meals.map((meal) => (
                                                                        meal.recipes && meal.recipes.map((recipe) => (
                                                                            <div key={recipe._id}> */}
                                                                <img src={images.article2} />
                                                                {/* </div>
                                                                        ))
                                                                    ))
                                                                ))} */}
                                                            </div>
                                                            <div className={cx('plan-cate')}>
                                                                <span style={{ display: 'block' }}>
                                                                    {plan.category && plan.category.map((category, catIndex) => (
                                                                        <span key={catIndex}>{category}</span>
                                                                    ))}
                                                                </span>
                                                                <span style={{ display: 'block' }}>
                                                                    {plan.nPerson} serving - {Math.ceil(plan.caloriesEachDay)} calories
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={cx('news_card_content')}>
                                                            <div className={cx('news_card_bottom')}>
                                                                <span className={cx('news_cate')}>{plan.user[0].name}</span>
                                                                <h3 className={cx('news_title')}>{plan.name.toUpperCase()}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default PlanMeal