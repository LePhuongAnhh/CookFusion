import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./BAckButton.module.scss"
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
function BackButton() {
    const navigate = useNavigate();
    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };
    return (
        <button className={cx('back_btn')} onClick={handleBack}>
            Back
        </button>
    );
}

export default BackButton;