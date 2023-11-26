
import images from '~/assets/images'
import React, { useState, useEffect } from "react"
import styles from './DetailCollection.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function DetailCollection() {
    return (
        <>
            <div className={cx('detail')}>
                <div className={cx('result-header')}>
                    ...
                </div>

                <div className={cx('header-card', "header_wrapper")}>
                    <img className={cx('img-avatar')} src={images.header_planmeal} />
                </div>
                <div className={cx('action-delete')}>
                    <span>Delete</span>
                </div>
                <div className={cx('collection-body')}>

                </div>
            </div>
        </>
    );
}

export default DetailCollection;