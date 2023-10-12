import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import style from "./AutoPlan.module.css"
import Navigation from '../header/Navigation'
import auto_header from "../../../image/header.png"
import Male from "../../../image/man.png"
import Male_change from "../../../image/man_change.png"
import Female from "../../../image/business-woman.png"
import Female_change from "../../../image/female_change.png"


const AutoPlan = () => {
    const [selectedOptionCalorie, setSelectedOptionCalorie] = useState('option1');
    const handleSelectChangeCalorie = (event) => {
        setSelectedOptionCalorie(event.target.value);
    };

    const [selectedOptionMeal, setSelectedOptionMeal] = useState('option1');
    const handleSelectChangeMeal = (event) => {
        setSelectedOptionMeal(event.target.value);
    };

    return (
        <div className={style.auto_plan}>
            <Navigation />
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={style.auto_plan_contain}>
                <div className={style.auto_header}>
                    <div className={style.header_wrapper}>
                        <img src={auto_header} />
                        <div className={style.deader_text}></div>
                    </div>
                </div>
                <div className={style.auto_body}>
                    <div className={style.auto_gird}>
                        <div className={style.step1}>
                            <div className={style.block_wrapper}>
                                <span className={style.block_title}>I'm</span>
                                <div className={style.gender_icon_wrapper}>
                                    <input type='radio' className={style.input_hide} />
                                    <label className={style.gender_wrapper}>
                                        <img src={Male} className={style.gender_icon} />
                                        <img src={Male_change} className={style.gender_icon} hidden />
                                        <span className={style.gender_choose}>Male</span>
                                    </label>
                                    <input type='radio' className={style.input_hide} />
                                    <label className={style.gender_wrapper}>
                                        <img src={Female} className={style.gender_icon} />
                                        <img src={Female_change} className={style.gender_icon} hidden />
                                        <span className={style.gender_choose}>Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className={style.while_block}>
                                <div className={style.block_title}>I'm</div>
                                <div className={style.while_block_wrapper}>
                                    <input min="0" type='number' name='weight' placeholder='0' className={style.input_text} /> &nbsp; kg
                                </div>
                            </div>
                            <div className={style.while_block}>
                                <div className={style.block_title}>In</div>
                                <div className={style.while_block_wrapper}>
                                    <select value={selectedOptionMeal} onChange={handleSelectChangeMeal} className={style.select_calorie} placeholder="calories">
                                        <option value="option1"> 1 meal </option>
                                        <option value="option2"> 2 meals</option>
                                        <option value="option3"> 3 meals</option>
                                        <option value="option2"> 4 meals</option>
                                        <option value="option3"> 5 meals</option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                            </div>
                            <div className={style.while_block}>
                                <div className={style.block_title}>I want to eat</div>
                                <div className={style.while_block_wrapper}>
                                    <select value={selectedOptionCalorie} onChange={handleSelectChangeCalorie} className={style.select_calorie} placeholder="calories">
                                        <option value="option1"> {'<'} 100 Calories </option>
                                        <option value="option2"> 100 - 500 Calories</option>
                                        <option value="option3"> 500 - 1000 Calories</option>
                                        <option value="option2"> 1000 - 1500 Calories</option>
                                        <option value="option3"> 1500 - 2000 Calories</option>
                                        <option value="option1"> {'>'} 2000 Calories </option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                                <div className={style.block_title}>In</div>
                                <div className={style.while_block_wrapper}>
                                    <select value={selectedOptionMeal} onChange={handleSelectChangeMeal} className={style.select_calorie} placeholder="calories">
                                        <option value="option1"> 1 meal </option>
                                        <option value="option2"> 2 meals</option>
                                        <option value="option3"> 3 meals</option>
                                        <option value="option2"> 4 meals</option>
                                        <option value="option3"> 5 meals</option>
                                    </select>
                                    {/* <p>Selected option: {selectedOption}</p> */}
                                </div>
                            </div>
                        </div>
                        <div className={style.buttons_wrapper}>
                            <Link to="/planmeal" >
                                <button className={style.back_btn} >Back</button>
                            </Link>
                            <Link to="/step2" >
                                <button className={style.next_btn}>Next</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AutoPlan