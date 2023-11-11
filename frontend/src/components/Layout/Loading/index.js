import styles from './Loading.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
function Loading() {
    return (
        <div className={cx("container")}>
            <div className={cx("loader")}>
                <div className={cx("loader--dot")}></div>
                <div className={cx("loader--dot")}></div>
                <div className={cx("loader--dot")}></div>
                <div className={cx("loader--dot")}></div>
                <div className={cx("loader--dot")}></div>
                <div className={cx("loader--dot")}></div>
                <div className={cx("loader--text")}></div>
            </div>
        </div >

    );
}

export default Loading;