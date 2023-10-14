import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from 'react';
import styles from "./AutoPlan.module.scss"
import classNames from 'classnames/bind'
import Navigation from '../../../components/Layout/DefaultLayout/Header/Navigation'
// import auto_header from "../../../image/header.png"
// import Anything from "../../../image/sandwich.png"
// import Paleo from "../../../image/paleo-diet.png"
// import Veget from "../../../image/veget.png"
// import Vegan from "../../../image/venga.png"
// import Keto from "../../../image/ketogenic-diet.png"
// import Medi from "../../../image/mediterranean-diet.png"
import images from '~/assets/images'

const cx = classNames.bind(styles)
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
        <div className={cx('auto_plan')}>
            <Navigation />
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className={cx('auto_plan_contain')}>
                <div className={cx('auto_header')}>
                    <div className={cx('header_wrapper')}>
                        <img src={images.auto_header} />
                        <div className={cx('deader_text')}></div>
                    </div>
                </div>
                <div className={cx('auto_body')}>
                    <div className={cx('auto_gird')}>
                        <div className={cx('step1')}>
                            <div className={cx('block_wrapper')}>
                                <div className={cx('start_ingrs')}>
                                    <p className={cx('subtitle')}>Your die preferences</p>
                                    <div className={cx('die')}>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div1}
                                            onClick={() => changeStyles('div1')}
                                        >
                                            <a className={cx('nav_link')}>
                                                <img src={images.Anything} /> Anything
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div2}
                                            onClick={() => changeStyles('div2')}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Medi} /> Mediterranean
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div3}
                                            onClick={() => changeStyles('div3')}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Keto} /> Ketogenic
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div4}
                                            onClick={() => changeStyles('div4')}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Paleo} /> Paleo
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div5}
                                            onClick={() => changeStyles('div5')}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Veget} /> Vegetarian
                                            </a>
                                        </div>
                                        <div className={cx('nav_item')}
                                            style={divStyles.div6}
                                            onClick={() => changeStyles('div6')}>
                                            <a className={cx('nav_link')}>
                                                <img src={images.Vegan} /> Vegan
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* item  */}
                                <div className={cx('allergy_card')}>
                                    <div className={cx('text_allergy')}>Allergy</div>
                                    <input type='text' name='height' placeholder='0' className={cx('input_allergy')} />
                                </div>
                                {/* item  */}
                            </div>
                        </div>
                        <div className={cx('buttons_wrapper')}>
                            <Link to="/autoplan" >
                                <button className={cx('back_btn')} >Back</button>
                            </Link>
                            <Link to="/result_auto" >
                                <button className={cx('next_btn')}>Create</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step2_auto