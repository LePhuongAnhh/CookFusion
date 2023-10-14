import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from "./FooterAdmin.module.scss"

const cx = classNames.bind(styles)

function FooterAdmin() {
    return (
        <footer className={cx('layout_footer')}>
            <div className={cx('footer_content')}>
                <div className={cx('footer_gird')}>
                    <p className={cx('content')}>
                        © 2023, Made with
                        <span className={cx('span_text')}>❤️ </span>
                        by
                        <Link className={cx('link_to')}> GourmetFood</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default FooterAdmin;