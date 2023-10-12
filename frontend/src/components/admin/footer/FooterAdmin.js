import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import style from "./FooterAdmin.module.css"

function FooterAdmin() {
    return (
        <footer className={style.layout_footer}>
            <div className={style.footer_content}>
                <div className={style.footer_gird}>
                    <p className={style.content}>
                        © 2023, Made with
                        <span className={style.span_text}>❤️ </span>
                        by
                        <Link className={style.link_to}> GourmetFood</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default FooterAdmin;