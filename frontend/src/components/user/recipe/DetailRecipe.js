import style from "./DetailRecipe.module.css"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navigation from "../header/Navigation";

function DetailRecipe() {
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
                            <div className={style.detail_left}></div>
                            <div className={style.detail_right}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailRecipe;