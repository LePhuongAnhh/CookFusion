import style from './Navigation.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless';
// import Tippy from 'react-tippy';
import 'tippy.js/dist/tippy.css';
// import 'tippy.js/dist/tippy.css'; // optional

import { Wrapper as PopperWrapper } from '~/components/popper';
import logo from "../../../image/logofooter1.png"
import account from "../../../image/icons8-user-32.png"
import fb from "../../../image/facebook.png"
import Logo from "../../../image/f2.png"

function Navigation() {

    const [searchResult, setSearchResult] = useState([]);

    // useEffect(() => {
    //     const body = document.body;
    //     const switch_mode = document.querySelector("#switch-mode i");
    //     switch_mode.addEventListener('click', () => {
    //         body.classList.toggle('dark');
    //         switch_mode.classList.toggle('bi-moon-stars-fill');
    //         switch_mode.classList.toggle('bi-brightness-high-fill');
    //     })
    // });

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 3000)

    }, [])
    return (
        <body className={style.dark}>
            <header>
                {/* <div id="wrapper" className={style.header_wrap}>
                    <div id="header" className={style.header_contain}>
                        <div id="container">

                        </div>
                    </div>
                </div>
                <div className={style.space}></div> */}

                {/* CENTER  */}
                <div className={style.nav_wrap}>
                    <div className={style.nav_left}>
                        <Link to="/homepage" className={style.nav_nameweb}>
                            <img src={Logo} />
                        </Link>
                    </div>
                    <div className={style.nav_action}>
                        <div>
                            <Tippy
                                interactive
                                render={attrs => (
                                    <div className={style.search_result} tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <h4 className={style.search_title}>

                                            </h4>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div className={style.search_wrapper}>

                                    <button className={style.search_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                    <input className={style.search_input} placeholder='Search for...' />
                                    <button className={style.search_cancel}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>
                                </div>
                            </Tippy>
                        </div>
                    </div>
                    <div className={style.nav_right}>

                        <div className={style.right_login}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg> &nbsp;
                        </div>
                        <div className={style.pulse}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* BOTTOM  */}
                <div className={style.nav_bottom}>
                    <div className={style.header_contain}>
                        <div className={style.header_link}>

                            <div className={style.site_nav}>
                                <div className={style.nav_left}>
                                    <Link to="/homepage" className={style.nav_nameweb}>
                                        <img src={Logo} />
                                    </Link>
                                </div>
                                <div className={style.site_nav_container}>
                                    <nav>
                                        <ul className={style.link_list}>
                                            <li className={style.menu_item}>
                                                <Link to="/aboutus" className={style.menu_link}>
                                                    <span>
                                                        <span className={style.text_cate}>About us</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className={style.menu_item}>
                                                <Link to="/recipe" className={style.menu_link}>
                                                    <span>
                                                        <span className={style.text_cate}>Recipe</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className={style.menu_item}>
                                                <Link to="/article" className={style.menu_link}>
                                                    <span>
                                                        <span className={style.text_cate}>Article</span>
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className={style.menu_item}>
                                                <Link to="#" className={style.menu_link}>
                                                    <span>
                                                        <span className={style.text_cate}>Meal plan</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className={style.header_right}>
                            <div className={style.header_block}>
                                <div className={style.header_block_img}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
                                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                                    </svg>
                                </div>
                                <div className={style.header_block_text}>
                                    <span className={style.header_block_caption}>Picking up?</span>
                                    <span className={style.header_block_title}>Select advertising</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </body>
    )
}

export default Navigation


