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
                                    <span className="me-3"><i className="fa-solid fa-truck text-muted me-1"></i><Link className="text-muted" to="#">Shipping</Link></span>
                                    <span className="me-3"><i className="fa-solid fa-file  text-muted me-2"></i><Link className="text-muted" to="#">Policy</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm,  { 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
                        <div className="container">
                            <Link className="navbar-brand" to="#"><i className="fa-solid fa-shop me-2"></i> <strong>GournFood</strong></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                                <div className="ms-auto d-none d-lg-block">
                                    <div className="input-group rounded">
                                        <input type="search" className={cx("form-control", "rounded")} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                        <span className={cx("input-group-text", "border-0")} id="search-addon">
                                            <i className="bi bi-search"></i>
                                        </span>
                                    </div>
                                </div>
                                <ul className="navbar-nav ms-auto ">
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 text-uppercase active" aria-current="page" to="/homepageAds">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 text-uppercase" to="/articleAds">Article</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 text-uppercase" to="/dashboardAds">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 text-uppercase" to="/packageAds">Packages</Link>
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
                                        <Link className="nav-link mx-2 text-uppercase" to="#"><i className="bi bi-bell"></i></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-2 text-uppercase" to="/profileSponsor"><i className="bi bi-person-circle"></i> Account</Link>
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