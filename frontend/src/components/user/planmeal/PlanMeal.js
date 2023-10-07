import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import style from "./PlanMeal.module.css"
import Navigation from '../header/Navigation'
import VideoPlayer from './VideoPlayer';
import suggestions from "../../../image/2.png"
import star from "../../../image/star1.png"
import background_top from "../../../image/Cream Yellow Organic Illustrative Meal Planner (1).jpg"
import manual from "../../../image/auto.png"
import auto from "../../../image/manual.png"

const PlanMeal = () => {
    return (
        <div className={style.plan_meal}>
            <Navigation />
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={style.plan_meal_contain}>
                <div className={style.plan_meal_contain}>
                    <div className={style.plan_header_wrapper}>
                        <img src={background_top} />
                        <div className={style.plan_header_text}>
                            <h1> MEAL Planner</h1>
                            <p>Gourmet Food creates personalized meal plans based on your food preferences and schedule. Reach your diet and nutritional goals with our calorie calculator, weekly meal plans, grocery lists and more. Create your meal plan right here in seconds.</p>
                        </div>
                    </div>
                </div>

                <div className={style.create_auto_plan}>
                    <div className={style.plan_left}>
                        <div className={style.plan_wrapper}>
                            <div className={style.automatic_plan}>
                                <div className={style.title_wrapper}>
                                    <div className={style.img_plan}>
                                        <img src={auto} />
                                    </div>
                                    <div className={style.text_wrapper}>
                                        <span className={style.title}>Automatically builds a plan  </span>
                                        <span className={style.suptitle}>Recommended</span>
                                    </div>
                                </div>
                                <div className={style.intr_plan}>
                                    <span className={style.intro_text}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={style.choose_btn}>Get Started</span>
                            </div>
                            <div className={style.manual_plan}>
                                <div className={style.title_wrapper}>
                                    <div className={style.img_plan}>
                                        <img src={manual} />
                                    </div>
                                    <div className={style.text_wrapper}>
                                        <span className={style.title}>Make your meals personal  </span>
                                        <span className={style.suptitle}>Recommended</span>
                                    </div>
                                </div>
                                <div className={style.intr_plan}>
                                    <span className={style.intro_text}>
                                        Submit your goal, current condition, and personal requirements. Our meal wizard will then calculate your custom nutritional targets and generate a meal plan!
                                    </span>
                                </div>
                                <span className={style.choose_btn1}>Get Started</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.plan_right} >
                        <div className={style.meal_suggestions}>
                            <img src={suggestions} />
                            <div className={style.suggestions_item}>
                                <p className={style.item}>
                                    <img src={star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                            <div className={style.suggestions_item}>
                                <p className={style.item}>
                                    <img src={star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                            <div className={style.suggestions_item}>
                                <p className={style.item}>
                                    <img src={star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                            <div className={style.suggestions_item}>
                                <p className={style.item}>
                                    <img src={star} />
                                    <Link to=""> Cach nau sup cho be</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanMeal