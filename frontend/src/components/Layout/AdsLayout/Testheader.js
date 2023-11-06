// import Navigation from "./Header/Navigation";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./AdsLayout.module.scss"
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles);
function Testheader() {
    return (
        <div className={cx("container")}>
            <nav className={cx("navbar", "navbar-expand-lg", "navbar-light ")}>
                <div className={cx("container-fluid", "pe-lg-2", "p-0")}>
                    <a className={cx("navbar-brand", "fw-bold", "fs-3")} href="#">OGANI</a>
                    <button className={cx("navbar-toggler")} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="bi bi-person-circle"></span>
                    </button>
                </div>
            </nav>
            <div className={cx("row")}>
                <div className={cx("col-lg-9")}>
                    <div className="d-lg-flex">
                        <div className="d-lg-flex align-items-center border">
                            <div className={cx("dropdown", "w-100", "my-lg-0", "my-2")}>
                                <button className={cx("btn", "btn-secondary", "d-flex", "justify-content-between", "align-items-center")}
                                    type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="true">
                                    <span className={cx(" w-100", "d-flex", "align-items-center")}>
                                        <span className={cx(" fw-lighter", "pe-2")}>ALL</span><span className={cx("fw-lighter", "pe-3")}>
                                            Categories</span>
                                        <span className="bi bi-chevron-down"></span>
                                    </span>
                                </button>
                                <ul className={cx("dropdown-menu")} aria-labelledby="dropdownMenu">
                                    <li><a className="dropdown-item" href="#">Fresh Meat</a></li>
                                    <li><a className="dropdown-item" href="#">Vegetable</a></li>
                                    <li><a className="dropdown-item" href="#">Fruit & Nut Gifts</a></li>
                                    <li><a className="dropdown-item" href="#">Fresh Berries</a></li>
                                </ul>
                            </div>
                            <div className="d-flex align-items-center w-100 h-100 ps-lg-0 ps-sm-3">
                                <input className=" ps-md-0 ps-3" type="text" placeholder="what do you need?" />
                                <div className="btn btn-primary d-flex align-items-center justify-content-center"> SEARCH</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testheader;