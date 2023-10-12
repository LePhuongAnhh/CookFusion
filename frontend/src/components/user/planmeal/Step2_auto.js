import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import sty from "./AutoPlan.module.css"
import Navigation from '../header/Navigation'
import auto_header from "../../../image/header.png"
import Anything from "../../../image/sandwich.png"
import Paleo from "../../../image/paleo-diet.png"
import Veget from "../../../image/veget.png"
import Vegan from "../../../image/venga.png"
import Keto from "../../../image/ketogenic-diet.png"
import Medi from "../../../image/mediterranean-diet.png"

const Step2_auto = () => {
    const [divStyles, setDivStyles] = useState({
        div1: { backgroundColor: 'initial', color: 'initial' },
        div2: { backgroundColor: 'initial', color: 'initial' },
        div3: { backgroundColor: 'initial', color: 'initial' },
        div4: { backgroundColor: 'initial', color: 'initial' },
        div5: { backgroundColor: 'initial', color: 'initial' },
        div6: { backgroundColor: 'initial', color: 'initial' },
    });
    const changeStyles = (clickedDiv) => {
        const newDivStyles = { ...divStyles };
        // Đặt màu nền và màu chữ của tất cả các div thành màu ban đầu
        for (let key in newDivStyles) {
            newDivStyles[key] = { backgroundColor: 'initial', color: '#007bff' };
        }
        // Đặt màu nền và màu chữ của div được nhấp vào
        newDivStyles[clickedDiv] = { backgroundColor: '#007bff', color: 'white' };
        // Cập nhật state với styles mới
        setDivStyles(newDivStyles);
    };
    return (
        <div className={sty.auto_plan}>
            <Navigation />
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={sty.auto_plan_contain}>
                <div className={sty.auto_header}>
                    <div className={sty.header_wrapper}>
                        <img src={auto_header} />
                        <div className={sty.deader_text}></div>
                    </div>
                </div>
                <div className={sty.auto_body}>
                    <div className={sty.auto_gird}>
                        <div className={sty.step1}>
                            <div className={sty.block_wrapper}>
                                <div className={sty.start_ingrs}>
                                    <p className={sty.subtitle}>Your die preferences</p>
                                    <div className={sty.die}>
                                        <div className={sty.nav_item}
                                            style={divStyles.div1}
                                            onClick={() => changeStyles('div1')}
                                        >
                                            <a className={sty.nav_link}>
                                                <img src={Anything} /> Anything
                                            </a>
                                        </div>
                                        <div className={sty.nav_item}
                                            style={divStyles.div2}
                                            onClick={() => changeStyles('div2')}>
                                            <a className={sty.nav_link}>
                                                <img src={Medi} /> Mediterranean
                                            </a>
                                        </div>
                                        <div className={sty.nav_item}
                                            style={divStyles.div3}
                                            onClick={() => changeStyles('div3')}>
                                            <a className={sty.nav_link}>
                                                <img src={Keto} /> Ketogenic
                                            </a>
                                        </div>
                                        <div className={sty.nav_item}
                                            style={divStyles.div4}
                                            onClick={() => changeStyles('div4')}>
                                            <a className={sty.nav_link}>
                                                <img src={Paleo} /> Paleo
                                            </a>
                                        </div>
                                        <div className={sty.nav_item}
                                            style={divStyles.div5}
                                            onClick={() => changeStyles('div5')}>
                                            <a className={sty.nav_link}>
                                                <img src={Veget} /> Vegetarian
                                            </a>
                                        </div>
                                        <div className={sty.nav_item}
                                            style={divStyles.div6}
                                            onClick={() => changeStyles('div6')}>
                                            <a className={sty.nav_link}>
                                                <img src={Vegan} /> Vegan
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* item  */}
                                <div className={sty.allergy_card}>
                                    <div className={sty.text_allergy}>Allergy</div>
                                    <input type='text' name='height' placeholder='0' className={sty.input_allergy} />
                                </div>
                                {/* item  */}
                            </div>
                        </div>
                        <div className={sty.buttons_wrapper}>
                            <Link to="/autoplan" >
                                <button className={sty.back_btn} >Back</button>
                            </Link>
                            <Link to="/result_auto" >
                                <button className={sty.next_btn}>Create</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step2_auto