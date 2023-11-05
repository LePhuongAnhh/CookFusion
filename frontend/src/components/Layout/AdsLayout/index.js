// import Navigation from "./Header/Navigation";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./AdsLayout.module.scss"
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
function AdsLayout({ children }) {

    // Set initial dark mode from localStorage or default to false
    const localStorageKey = 'darkMode';
    const initialMode = JSON.parse(localStorage.getItem(localStorageKey)) || false;
    const [isDarkMode, setIsDarkMode] = useState(initialMode);

    const saveToLocalStorage = (value) => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    };

    const handleModeChange = () => {
        setIsDarkMode(!isDarkMode);
        saveToLocalStorage(!isDarkMode);
    };
    useEffect(() => {
        const savedMode = JSON.parse(localStorage.getItem(localStorageKey));
        if (savedMode !== null) {
            setIsDarkMode(savedMode);
        }
    }, []);
    return (
        <body className={cx("body-wrapper", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
            <div
                id="wrapper"
                className={cx("wrapper", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                {/* Header  */}
                <div className={cx("header-ads")}>
                    <div className={cx("superNav", "border-bottom", "py-2", "bg-light", { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                        <div className="container">
                            <div className="row">
                                <div className={cx("col-lg-6", "col-md-6", "col-sm-12", "col-xs-12", "centerOnMobile")}>
                                    <select className="me-3 border-0 bg-light">
                                        <option value="en-us">EN-US</option>
                                    </select>
                                    <span className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-3"><strong>info@somedomain.com</strong></span>
                                    <span className="me-3"><i className="fa-solid fa-phone me-1 text-warning"></i> <strong>1-800-123-1234</strong></span>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block d-md-block-d-sm-block d-xs-none text-end">
                                    <span className="me-3"><i className="fa-solid fa-truck text-muted me-1"></i><a className="text-muted" href="#">Shipping</a></span>
                                    <span className="me-3"><i className="fa-solid fa-file  text-muted me-2"></i><a className="text-muted" href="#">Policy</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm,  { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
                        <div className="container">
                            <a className="navbar-brand" href="#"><i className="fa-solid fa-shop me-2"></i> <strong>GournFood</strong></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
                                <div className="input-group">
                                    <span className="border-warning input-group-text bg-warning text-white"><i className="fa-solid fa-magnifying-glass"></i></span>
                                    <input type="text" className={cx("form-control", "border-warning")} style={{ color: "#7a7a7a" }} />
                                    <button className="btn btn-warning text-white">Search</button>
                                </div>
                            </div>
                            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                                <div className="ms-auto d-none d-lg-block">
                                    <div className="input-group">
                                        <span className="border-warning input-group-text bg-warning text-white"><i className="fa-solid fa-magnifying-glass"></i></span>
                                        <input type="text" className={cx("form-control", "border-warning")} style={{ color: "#7a7a7a" }} />
                                        <button className="btn btn-warning text-white">Search</button>
                                    </div>
                                </div>
                                <ul className="navbar-nav ms-auto ">
                                    <li className="nav-item">
                                        <a className="nav-link mx-2 text-uppercase active" aria-current="page" href="/homepageAds">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mx-2 text-uppercase" href="/articleAds">Article</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mx-2 text-uppercase" href="/dashboardAds">Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mx-2 text-uppercase" href="/packageAds">Packages</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-auto ">
                                    <li className="nav-item">
                                        <Link to="#" className={cx('nav_link')} onClick={handleModeChange}>
                                            {isDarkMode ? (
                                                <i className="bi bi-moon-fill"></i>
                                            ) : (
                                                <i className="bi bi-brightness-high-fill"></i>
                                            )}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mx-2 text-uppercase" href="#"><i className="bi bi-bell"></i></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mx-2 text-uppercase" href="#"><i className="bi bi-person-circle"></i> Account</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className={cx('body-home', { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode })}>
                    {children}
                </div>
            </div>
        </body>
    );
}

export default AdsLayout;