import React, { useState, useEffect } from "react"
import styles from "./Button.module.scss"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function SaveButton({ children }) {
    const [isBouncing, setIsBouncing] = useState(false);
    const handleBounceButtonClick = () => {
        setIsBouncing(true);
        setTimeout(() => {
            setIsBouncing(false);
        }, 2000);
    };
    return (
        <div className={cx('page-content', 'page-container')} id="page-content">
            <div
                className={cx('btn', 'color', 'animate__animated', {
                    'animate__bounce': isBouncing,
                })}
            >
                <div onClick={handleBounceButtonClick} className={cx("toast", "fade-show", "animate__animated", " animate__fadeIn")}>
                    {children}
                </div>
            </div>
        </div>

    );
}

export default SaveButton;