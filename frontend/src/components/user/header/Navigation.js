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
import Logo from "../../../image/1.png"

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
        <>
            <header className={style.site_navbar}>
                <div className={style.header_container}>
                    <div class={style.row_header}>
                        <div class={style.header_item_left}>
                            <div className={style.gird_left}>
                                <Link to="/homepage" className={style.text_black}>
                                    <img className={style.text_primary} src={Logo} />
                                    {/* <span>Gourmet Food </span> */}
                                </Link>
                            </div>
                        </div>
                        <div className={style.header_item_center}>
                            <nav className={style.site_navigation}>
                                <ul className={style.site_menu} >
                                    <li>
                                        <div className={style.text_item1}>
                                            <Link to="/article" className={style.nav_link}>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                        </svg> */}
                                                <span className={style.text_item}>Article</span>
                                            </Link>
                                        </div>
                                    </li>

                                    <li>
                                        <div className={style.text_item1}>
                                            <Link to="/recipe" className={style.nav_link}>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                            </svg> */}
                                                <span className={style.text_item}>Recipe</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={style.text_item1}>
                                            <Link to="#" className={style.nav_link}>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                            </svg> */}
                                                <span className={style.text_item}>Plan Meal</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={style.text_item1}>
                                            <Link to="#" className={style.nav_link}>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                            </svg> */}
                                                <span className={style.text_item}>Sponsor</span>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class={style.header_item_right}>
                            <div className={style.gird_right}>
                                <div className={style.nav_link_right}>
                                    <Link to="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                        </svg>
                                    </Link>
                                </div>
                                <div className={style.nav_link_right}>
                                    <Link to="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navigation


