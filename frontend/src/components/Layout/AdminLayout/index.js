import HeaderAdmin from "./Header/HeaderAdmin";
import FooterAdmin from "./Footer/FooterAdmin";
import classNames from 'classnames/bind'
import styles from "./AdminLayout.module.scss"

const cx = classNames.bind(styles)
function AdminLayout({ children }) {
    return (
        <div id="wrapper" className={cx("wrapper")}>
            <HeaderAdmin />
            <div className={cx("content_page")}>
                <div className={cx("content")}>
                    <div className={cx("content_fluid")}>
                        {children}
                    </div>
                </div>
                <FooterAdmin />
            </div>
        </div>
    );
}

export default AdminLayout