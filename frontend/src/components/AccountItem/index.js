// import { children } from "react";
import styles from "./AccountItem.module.scss"
import classNames from "classnames/bind"
import images from "~/assets/images";

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <>
            <div className={cx('wrapper')}>
                <img className={cx('avatar')} src={images.minh} />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        <span>Nguyen Minh Anh</span>
                    </h4>
                    <span className={cx('username')}>minhanh</span>
                </div>
            </div>
        </>
    );
}

export default AccountItem;